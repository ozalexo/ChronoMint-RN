/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  Alert,
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
import { selectMarketPrices, selectCurrentCurrency } from '@chronobank/market/redux/selectors'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import TextButton from '../../../components/TextButton'
import styles from './SendEthStyles'
import SendEth from './SendEth'

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    masterWalletAddress,
    selectedCurrency: selectCurrentCurrency(state),
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
    const firtsAvailableToken = props.navigation.state.params.token
    const selectedToken = {
      symbol: firtsAvailableToken.symbol,
      amount: firtsAvailableToken.amount,
      balance: firtsAvailableToken.balance,
      decimals: firtsAvailableToken.decimals,
    }
    this.state = {
      amount: null,
      amountInCurrency: 0,
      confirmSendModal: false,
      enterPasswordModal: false,
      showQRscanner: false,
      error: null,
      gasLimit: null,
      gasDefault: null,
      gasLimitInCurrency: null,
      feeMultiplier: 1,
      isAmountInputValid: false,
      isRecipientInputValid: false,
      recipient: '',
      firtsAvailableToken,
      selectedToken,
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.navigation.state.params) {
      if (prevProps.navigation.state.params.token.symbol !== this.props.navigation.state.params.token.symbol) {
        const selectedToken = {
          symbol: this.props.navigation.state.params.token.symbol,
          balance: this.props.navigation.state.params.token.balance,
          amount: this.props.navigation.state.params.token.amount,
          decimals: this.props.navigation.state.params.token.decimals,
        }
        this.setState({ selectedToken })
      }
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return {
      ...params,
      headerRight: (
        <TextButton
          style={styles.headerButton}
          onPress={params.handleGoToPasswordModal}
          label='Done'
        />
      ),
    }
  }

  static propTypes = {
    updateEthereumTxDraftTo: PropTypes.func,
    createEthereumTxDraft: PropTypes.func,
    deleteEthereumTxDraft: PropTypes.func,
    estimateGas: PropTypes.func,
    updateEthereumTxDraftValue: PropTypes.func,
    updateEthereumTxDraftGasLimit: PropTypes.func,
    getNonce: PropTypes.func,
    getGasPrice: PropTypes.func,
    getChainId: PropTypes.func,
    updateEthereumTxDraftGasPriceChainIdNonce: PropTypes.func,
    masterWalletAddress: PropTypes.string,
    selectedCurrency: PropTypes.string,
    currentEthWallet: PropTypes.shape({}),
    prices: PropTypes.shape({}),
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
      state: PropTypes.shape({
        params: PropTypes.shape({
          blockchain: PropTypes.string,
          token: PropTypes.shape({
            symbol: PropTypes.string,
            amount: PropTypes.string,
            decimals: PropTypes.number,
          }),
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
      .catch((error) => {
        Alert.alert('Error, while making a gasprice, chainid, nonce requests to middleware.')
        // eslint-disable-next-line no-console
        console.log(error)
      })
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
    if (value && typeof value === 'string') {
      const {
        updateEthereumTxDraftTo,
        masterWalletAddress,
      } = this.props
      // Check for Ethereum
      const isRecipientInputValid =
        (value.length >= 40 || value.length <= 44) &&
        value.startsWith('0x')

      this.setState(
        {
          recipient: value,
          isRecipientInputValid,
        },
        () => {
          updateEthereumTxDraftTo({
            masterWalletAddress,
            to: value,
          })
          if (isRecipientInputValid && this.state.isAmountInputValid) {
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
        selectedCurrency,
      } = this.props
      if (!(value.endsWith(',') || value.endsWith('.') || value.endsWith('0'))) {
        const inputValue = value.replace(',', '.').replace(' ', '')
        const localeValue = new BigNumber(inputValue).toNumber()
        const tokenPrice =
          (prices &&
            this.state.selectedToken &&
            prices[this.state.selectedToken.symbol] &&
            prices[this.state.selectedToken.symbol][selectedCurrency]) ||
          0 // TODO: handle wrong values correctly
        const isAmountInputValid =
          localeValue !== null && localeValue !== undefined && localeValue !== '' && localeValue > 0 
          // && localeValue <= +this.state.selectedToken.balance
        this.setState(
          {
            amount: inputValue,
            amountInCurrency: tokenPrice * localeValue,
            isAmountInputValid,
          },
          () => {
            updateEthereumTxDraftValue({
              masterWalletAddress,
              value: localeValue,
            })
            if (isAmountInputValid && this.state.isRecipientInputValid) {
              this.requestGasEstimations()
            }
          }
        )
      } else {
        this.setState({
          amount: value ? value.replace(',', '.').replace(' ', '') : null,
          amountInCurrency: 0,
          isAmountInputValid: false,
        }, () => {
          updateEthereumTxDraftValue({
            masterWalletAddress,
            value: new BigNumber(this.state.amount).toNumber(),
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
      selectedCurrency,
    } = this.props
    if (this.state.gasLimit !== null) {

      const tokenPrice =
        (prices &&
          this.state.selectedToken &&
          prices[this.state.selectedToken.symbol][selectedCurrency]) ||
        0 // TODO: handle wrong values correctly

      let newGasLimit = this.state.gasLimit ? this.state.gasDefault * value : null
      let newGasPrice = newGasLimit ? newGasLimit * tokenPrice : null
      newGasLimit = parseInt(newGasLimit)
      newGasPrice = parseInt(newGasPrice)
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
    console.log('Estimating for:', estimationGasArguments)
    estimateGas(estimationGasArguments)
      .then((results) => {
        this.setState({
          gasLimit: results,
          gasDefault: results,
        }, () => {
          updateEthereumTxDraftGasLimit({
            masterWalletAddress,
            gasLimit: results,
          })
        })
      })
      .catch((error) => {
        Alert.alert('Error, while making a gas estimate request to middleware.')
        // eslint-disable-next-line no-console
        console.warn(error)
      })
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

  handleQRpageOpen = () => {
    this.setState({ showQRscanner: !this.state.showQRscanner })
  }

  handleQRscan = (scannedAddress) => {
    this.handleChangeRecipient('recipient', scannedAddress.data)
  }

  handleSelectToken = () => {
    this.props.navigation.navigate('TokenSelector')
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
      showQRscanner,
    } = this.state
    const {
      blockchain,
    } = this.props.navigation.state.params
    const { currentEthWallet, prices, selectedCurrency } = this.props
    const blockchainPrice = prices &&
      prices[selectedToken.symbol] &&
      prices[selectedToken.symbol][selectedCurrency] || 0
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
        //state
        showPasswordModal={enterPasswordModal}
        showConfirmModal={confirmSendModal}
        showQRscanner={showQRscanner}
        error={error}
        //txDraft
        onTxDraftCreate={this.handleTxDraftCreate}
        onTxDraftRemove={this.handleTxDraftRemove}
        onQRpageOpen={this.handleQRpageOpen}
        onQRscan={this.handleQRscan}
      />
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SendEthContainer)
