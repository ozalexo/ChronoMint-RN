/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  Alert,
  Button,
  InteractionManager,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import formikEnhancer from './SendEthFormikEnhancer'
import * as EthereumThunks from '@chronobank/ethereum/redux/thunks'
import {
  getNonce,
  estimateGas,
  getGasPrice,
  getChainId,
} from '@chronobank/ethereum/middleware/thunks'
import { getCurrentEthWallet } from '@chronobank/ethereum/redux/selectors'
import { getCurrentNetwork } from '@chronobank/network/redux/selectors'
import { selectMarketPrices } from '@chronobank/market/redux/selectors'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import SendEth from './SendEth'

const ActionCreators = {
  ...EthereumThunks,
  getNonce,
  estimateGas,
  getGasPrice,
  getChainId,
}

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    masterWalletAddress,
    prices: selectMarketPrices(state),
    currentEthWallet: getCurrentEthWallet(masterWalletAddress)(state),
    network: getCurrentNetwork(state),
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ActionCreators, dispatch)

class SendEthContainer extends React.Component {
  constructor (props) {
    super(props)
    const first = Object.keys(props.currentEthWallet.tokens)[0]
    const firtsAvailableToken = props.currentEthWallet.tokens[first]
    const selectedToken = {
      symbol: firtsAvailableToken.symbol,
      amount: firtsAvailableToken.balance,
    }
    this.state = {
      value: null,
      amountInCurrency: 0,
      confirmSendModal: false,
      enterPasswordModal: false,
      error: null,
      fee: null,
      feeEstimation: 1,
      feeInCurrency: null,
      feeMultiplier: 1,
      gasFee: null,
      gasFeeAmount: null,
      gasFeeAmountInCurrency: null,
      isAmountInputValid: false,
      isRecipientInputValid: false,
      to: '',
      firtsAvailableToken,
      selectedToken,
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return {
      headerRight: params && params.headerRight,
    }
  }

  static propTypes = {
    setFieldValue: PropTypes.func,
    handleSubmit: PropTypes.func,
    ethereumUpdateTxDraftTo: PropTypes.func,
    ethereumCreateTxDraft: PropTypes.func,
    ethereumDeleteTxDraft: PropTypes.func,
    ethereumUpdateTxDraftValue: PropTypes.func,
    estimateGas: PropTypes.func,
    currentEthWallet: PropTypes.shape({
      tokens: PropTypes.arrayOf(PropTypes.string),
      txDraft: PropTypes.shape({}),
    }),
    network: PropTypes.shape({}),
    prices: PropTypes.shape({}),
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
      state: PropTypes.shape({
        params: PropTypes.shape({
          address: PropTypes.string,
          blockchain: PropTypes.string,
          selectedCurrency: PropTypes.string,
          masterWalletAddress: PropTypes.string,
        }),
      }),
    }),
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.setParams({
        headerRight: (
          <Button
            onPress={this.props.handleSubmit}
            title='Done'
            color='#fff'
          />
        ),
      })
    })
  }

  getDataForGasEstimation = async () => {
    const {
      ethereumUpdateTxDraftChainId,
      ethereumUpdateTxDraftGasPrice,
      ethereumUpdateTxDraftNonce,
      getChainId,
      getGasPrice,
      getNonce,
      masterWalletAddress,
    } = this.props

    Promise
      .all([
        getGasPrice(),
        getChainId(),
        getNonce(masterWalletAddress),
      ])
      .then(([gasPrice, chainId, nonce]) => {
        // TODO: we need only one update thunk here
        ethereumUpdateTxDraftGasPrice({
          masterWalletAddress,
          gasPrice,
        })
        ethereumUpdateTxDraftChainId({
          masterWalletAddress,
          chainId,
        })
        ethereumUpdateTxDraftNonce({
          masterWalletAddress,
          nonce,
        })
      })
      .catch((error) => {
        // TODO: need to notify user and/or disable "Done" button
        // eslint-disable-next-line no-console
        console.log(error)
      })
  }

  handleGoToPasswordModal = () => {
    const {
      address,
      masterWalletAddress,
    } = this.props.navigation.state.params
    const {
      network,
    } = this.props

    if (this.state.isRecipientInputValid && this.state.isAmountInputValid) {
      const tx = {
        to: this.state.to,
        from: address,
        value: this.state.value,
      }
      const modalProps = {
        masterWalletAddress,
        network,
      }
    } else {
      Alert.alert('Input error', 'Please fill address and amount', [
        { text: 'Ok', onPress: () => { }, style: 'cancel' },
      ])
    }
  }

  handleChangeRecipient (name) {
    return (value) => {
      if (typeof value === 'string') {
        this.props.setFieldValue(name, value)
      }
    }
  }

  handleChangeAmount (name) {
    return (value) => {
      if (typeof value === 'string') {
        this.props.setFieldValue(name, value.replace(',', '.').replace(' ', ''))
      }
    }
  }

  handleFeeSliderChange (name) {
    return (value) => {
      this.props.setFieldValue(name, value)
    }
  }

  handleTogglePasswordModal = () => {
    this.setState({
      enterPasswordModal: !this.state.enterPasswordModal,
    })
  }

  handleCloseConfirmModal = () => {
    this.setState({
      confirmSendModal: false,
    })
  }

  handlePasswordConfirm = () => {
    this.setState({
      confirmSendModal: true,
      enterPasswordModal: false,
    })
  }

  handleSendConfirm = () => {
    this.handleCloseConfirmModal()
    this.props.navigation.navigate('Wallet')
  }

  handleTxDraftCreate = () => {
    const { ethereumCreateTxDraft, navigation } = this.props
    const { masterWalletAddress } = navigation.state.params
    ethereumCreateTxDraft({ masterWalletAddress })
    this.getDataForGasEstimation()
  }

  handleTxDraftRemove = () => {
    const { ethereumDeleteTxDraft, navigation } = this.props
    const { masterWalletAddress } = navigation.state.params
    ethereumDeleteTxDraft({ masterWalletAddress })
  }

  render () {
    const {
      value,
      amountInCurrency,
      confirmSendModal,
      enterPasswordModal,
      error,
      fee,
      feeInCurrency,
      feeMultiplier,
      modalProps,
      selectedToken,
      to,
    } = this.state
    const {
      blockchain,
      selectedCurrency,
    } = this.props.navigation.state.params
    const { currentEthWallet, prices } = this.props
    const blockchainPrice = prices &&
      prices[selectedToken.symbol] &&
      prices[selectedToken.symbol][selectedCurrency]

    return (
      <SendEth
        value={value}
        amountInCurrency={amountInCurrency}
        blockchain={blockchain}
        error={error}
        fee={fee}
        feeInCurrency={feeInCurrency}
        feeMultiplier={feeMultiplier}
        onCloseConfirmModal={this.handleCloseConfirmModal}
        onPasswordConfirm={this.handlePasswordConfirm}
        onSelectToken={this.handleSelectToken}
        onSendConfirm={this.handleSendConfirm}
        onTogglePasswordModal={this.handleGoToPasswordModal}
        onTxDraftCreate={this.handleTxDraftCreate}
        onTxDraftRemove={this.handleTxDraftRemove}
        passProps={modalProps}
        price={blockchainPrice}
        selectedCurrency={selectedCurrency}
        selectedToken={selectedToken}
        selectedWallet={currentEthWallet}
        showConfirmModal={confirmSendModal}
        showPasswordModal={enterPasswordModal}
        to={to}

        onChangeAmount={this.handleChangeAmount('value')}
        onChangeRecipient={this.handleChangeRecipient('to')}
        onFeeSliderChange={this.handleFeeSliderChange('feeMultiplier')}
      />
    )
  }
}

const enhancedSendEthContainer = formikEnhancer(SendEthContainer)
export default connect(mapStateToProps, mapDispatchToProps)(enhancedSendEthContainer)
