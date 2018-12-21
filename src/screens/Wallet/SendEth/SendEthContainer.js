/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  Alert,
  Button,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'
import * as EthereumThunks from '@chronobank/ethereum/redux/thunks'
import {
  getNonce,
  estimateGas,
  getGasPrice,
  getChainId,
} from '@chronobank/ethereum/middleware/thunks'
import { getCurrentEthWallet } from '@chronobank/ethereum/redux/selectors'
import { balanceToAmount } from '@chronobank/ethereum/utils/amount'
import { getCurrentNetwork } from '@chronobank/network/redux/selectors'
import { selectMarketPrices } from '@chronobank/market/redux/selectors'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import ConfirmSendModal from './Modals/ConfirmSendModal'
import PasswordEnterModal from './Modals/PasswordEnterModal'
import SendEth from './SendEth'

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    masterWalletAddress,
    prices: selectMarketPrices(state),
    currentEthWallet: getCurrentEthWallet(masterWalletAddress)(state),
    network: getCurrentNetwork(state),
  }
}

const ActionCreators = { ...EthereumThunks, getNonce, estimateGas, getGasPrice, getChainId }
const mapDispatchToProps = (dispatch) => bindActionCreators(ActionCreators, dispatch)

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
      amount: null,
      amountInCurrency: 0,
      confirmSendModal: false,
      enterPasswordModal: false,
      error: null,
      gasLimit: null,
      gasLimitInCurrency: null,
      feeMultiplier: 1,
      isAmountInputValid: false,
      isRecipientInputValid: false,
      recipient: '',
      firtsAvailableToken,
      selectedToken,
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return {
      ...params,
      headerRight: (
        <Button
          onPress={() => params.handleGoToPasswordModal()}
          title='Done'
          color='#fff'
        />
      ),
    }
  }

  static propTypes = {
    updateEthereumTxDraftGasPriceChainIdNonce: PropTypes.func,
    masterWalletAddress: PropTypes.string,
    currentEthWallet: PropTypes.shape({}),
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
    this.props.navigation.setParams({ handleGoToPasswordModal: this.handleGoToPasswordModal })

  }

  getDataForGasEstimation = () => {
    const {
      getNonce,
      getGasPrice,
      getChainId,
      updateEthereumTxDraftGasPriceChainIdNonce,
      masterWalletAddress,
    } = this.props

    Promise.all([
      getGasPrice(),
      getChainId(),
      getNonce(masterWalletAddress),
    ])
      .then((results) => {
        updateEthereumTxDraftGasPriceChainIdNonce({
          masterWalletAddress,
          gasPrice: results[0],
          chainId: results[1],
          nonce: results[2],
        })
      })
      .catch((error) => console.log(error))
  }

  handleGoToPasswordModal = () => {

    if (this.state.isRecipientInputValid && this.state.isAmountInputValid) {

      this.handleTogglePasswordModal()

    } else {
      Alert.alert('Input error', 'Please fill address and amount', [
        { text: 'Ok', onPress: () => { }, style: 'cancel' },
      ])
    }
  }

  handleChangeRecipient = (name, value) => {
    if (typeof value === 'string') {
      const {
        updateEthereumTxDraftTo,
        masterWalletAddress,
      } = this.props
      // Check for Ethereum
      const dummyValidationOfRecipientInput =
        value &&
        (value.length >= 40 || value.length <= 44) &&
        value.startsWith('0x')

      this.setState(
        {
          recipient: value,
          isRecipientInputValid: dummyValidationOfRecipientInput,
        },
        () => {
          updateEthereumTxDraftTo({
            masterWalletAddress,
            to: this.state.recipient,
          })
          if (this.state.isAmountInputValid) {
            this.requestGasEstimations()
          }
        }
      )
    }
  }

  handleChangeAmount = (name, value) => {
    if (typeof value === 'string') {
      const {
        prices,
        updateEthereumTxDraftValue,
        masterWalletAddress,
      } = this.props
      const { selectedCurrency } = this.props.navigation.state.params
      if (!(value.endsWith(',') || value.endsWith('.'))) {
        const localeValue = new BigNumber(parseFloat(value.replace(',', '.').replace(' ', ''))).toNumber()
        const tokenPrice =
          (prices &&
            this.state.selectedToken &&
            prices[this.state.selectedToken.symbol] &&
            prices[this.state.selectedToken.symbol][selectedCurrency]) ||
          0 // TODO: handle wrong values correctly
        const dummyValidationOfAmountInput =
          localeValue !== null && localeValue !== undefined && localeValue !== '' && localeValue > 0
        this.setState(
          {
            amount: localeValue,
            amountInCurrency: tokenPrice * localeValue,
            isAmountInputValid: dummyValidationOfAmountInput,
          },
          () => {
            updateEthereumTxDraftValue({
              masterWalletAddress,
              value: localeValue,
            })
            if (this.state.isRecipientInputValid) {
              this.requestGasEstimations()
            }
          }
        )
      } else {
        this.setState({
          amount: value ? new BigNumber(parseFloat(value.replace(',', '.').replace(' ', ''))).toNumber() : null,
          amountInCurrency: 0,
          isAmountInputValid: false,
        }, () => {
          updateEthereumTxDraftValue({
            masterWalletAddress,
            value: this.state.amount,
          })
        })
      }
    }
  }

  handleFeeSliderChange = (value) => {
    const {
      prices,
      updateEthereumTxDraftGasLimit,
      masterWalletAddress,
    } = this.props
    const {
      selectedCurrency,
    } = this.props.navigation.state.params
    if (this.state.gasLimit !== null) {

      const tokenPrice =
        (prices &&
          this.state.selectedToken &&
          prices[this.state.selectedToken.symbol][selectedCurrency]) ||
        0 // TODO: handle wrong values correctly

      const newGasLimit = this.state.gasLimit ? this.state.gasLimit * this.state.feeMultiplier : null
      const newGasPrice = newGasLimit ? newGasLimit * tokenPrice : null

      this.setState({
        feeMultiplier: value,
        gasLimit: newGasLimit,
        gasLimitInCurrency: newGasPrice,
      }, () => {
        updateEthereumTxDraftGasLimit({
          masterWalletAddress,
          gasLimit: newGasLimit,
        })
      })
    } else {
      this.setState({ feeMultiplier: value })
    }
  }

  requestGasEstimations = () => {
    const {
      estimateGas,
      currentEthWallet,
      updateEthereumTxDraftGasLimit,
      masterWalletAddress,
    } = this.props
    const {
      from,
      to,
      gasPrice,
      nonce,
    } = currentEthWallet.txDraft
    const estimationGasArguments = {
      from,
      to,
      value: balanceToAmount(this.state.amount),
      gasPrice,
      nonce,
    }
    estimateGas(estimationGasArguments)
      .then((results) => {
        this.setState({
          gasLimit: results,
        }, () => {
          updateEthereumTxDraftGasLimit({
            masterWalletAddress,
            gasLimit: results,
          })
        })
      })
      .catch((error) => console.log(error))
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
    const { createEthereumTxDraft, masterWalletAddress } = this.props
    createEthereumTxDraft({ masterWalletAddress })
    this.getDataForGasEstimation()
  }

  handleTxDraftRemove = () => {
    const { deleteEthereumTxDraft, masterWalletAddress } = this.props
    deleteEthereumTxDraft({ masterWalletAddress })
  }


  render () {
    const {
      enterPasswordModal,
      confirmSendModal,
      error,
      amount,
      amountInCurrency,
      feeMultiplier,
      gasLimitInCurrency,
      gasLimit,
      recipient,
      selectedToken,
      modalProps,
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
        amount={amount}
        amountInCurrency={amountInCurrency}
        blockchain={blockchain}
        feeMultiplier={feeMultiplier}
        gasLimit={gasLimit}
        gasLimitInCurrency={gasLimitInCurrency}
        onChangeAmount={this.handleChangeAmount}
        onChangeRecipient={this.handleChangeRecipient}
        onFeeSliderChange={this.handleFeeSliderChange}
        onSelectToken={this.handleSelectToken}
        recipient={recipient}
        selectedCurrency={selectedCurrency}
        selectedToken={selectedToken}
        selectedWallet={currentEthWallet}
        passProps={modalProps}
        //
        price={blockchainPrice}

        onTogglePasswordModal={this.handleGoToPasswordModal}
        onCloseConfirmModal={this.handleCloseConfirmModal}
        onPasswordConfirm={this.handlePasswordConfirm}
        onSendConfirm={this.handleSendConfirm}
        PasswordEnterModal={PasswordEnterModal}
        ConfirmSendModal={ConfirmSendModal}
        //state
        showPasswordModal={enterPasswordModal}
        showConfirmModal={confirmSendModal}
        error={error}
        //txDraft
        onTxDraftCreate={this.handleTxDraftCreate}
        onTxDraftRemove={this.handleTxDraftRemove}
      />
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SendEthContainer)
