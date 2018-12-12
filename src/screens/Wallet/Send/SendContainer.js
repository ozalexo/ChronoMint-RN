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
import { networks } from 'bitcoinjs-lib'
import * as Keychain from 'react-native-keychain'
import BigNumber from 'bignumber.js'
import {
  createBitcoinTxDraft,
  deleteBitcoinTxDraft,
} from '@chronobank/bitcoin/redux/thunks'
import { decryptWallet } from '@chronobank/ethereum/utils'
import { DUCK_ETHEREUM } from '@chronobank/ethereum/redux/constants'
import { getCurrentEthWallet } from '@chronobank/ethereum/redux/selectors'
import { requestBitcoinUtxoByAddress } from '@chronobank/bitcoin/service/api'
import { prepareBitcoinTransaction, signTransaction } from '@chronobank/bitcoin/utils'
import { getBitcoinWallets } from '@chronobank/bitcoin/redux/selectors'
import { getCurrentNetwork } from '@chronobank/network/redux/selectors'
import { convertToWei, convertBTCToSatoshi } from '@chronobank/bitcoin/utils/amount'
import { selectMarketPrices } from '@chronobank/market/redux/selectors'
import ConfirmSendModal from './Modals/ConfirmSendModal'
import PasswordEnterModal from './Modals/PasswordEnterModal'
import Send from './Send'

// requestBitcoinUtxoByAddress(address)
// .then((results) => console.log("UTXO RESULTS: ", results))

const mapStateToProps = (state) => {
  return {
    prices: {
      BTC: {
        USD: 0.00001,
      },
    },
    // prices: selectMarketPrices(state),
    currentWallet: getCurrentEthWallet(state),
    BTCwallets: getBitcoinWallets(state),
    network: getCurrentNetwork(state),
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
  createBitcoinTxDraft,
  deleteBitcoinTxDraft,
  requestBitcoinUtxoByAddress,
}, dispatch)

class SendContainer extends React.Component {
  constructor (props) {
    super(props)
    const first = Object.keys(props.BTCwallets[props.navigation.state.params.address].tokens)[0]
    const firtsAvailableToken = props.BTCwallets[props.navigation.state.params.address].tokens[first]
    const selectedToken = {
      symbol: firtsAvailableToken.symbol,
      amount: firtsAvailableToken.amount,
    }
    this.state = {
      firtsAvailableToken,
      enterPasswordModal: false,
      confirmSendModal: false,
      error: null,
      amount: null,
      amountInCurrency: 0,
      feeMultiplier: 1,
      gasFee: null,
      gasFeeAmount: null,
      gasFeeAmountInCurrency: null,
      isAmountInputValid: false,
      isRecipientInputValid: false,
      recipient: '',
      selectedToken,
    }
  }

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      createBitcoinTxDraft: PropTypes.func,
      deleteBitcoinTxDraft: PropTypes.func,
      state: PropTypes.shape({
        params: PropTypes.shape({
          address: PropTypes.string,
          blockchain: PropTypes.string,
          selectedCurrency: PropTypes.string,
          parentAddress: PropTypes.string,
        }),
      }),
    }),
  }

  handleGoToPasswordModal = () => {
    const { address, selectedCurrency, blockchain, parentAddress } = this.props.navigation.state.params
    const { requestBitcoinUtxoByAddress, currentWallet } = this.props
    const {
      isRecipientInputValid,
      isAmountInputValid,
      recipient,
      amountInCurrency,
      gasFeeAmount,
      gasFeeAmountInCurrency,
      feeMultiplier,
      selectedToken,
      amount,
      firtsAvailableToken,
    } = this.state

    if (isRecipientInputValid && isAmountInputValid) {

      const passProps = {
        recipientAddress: recipient,
        selectedCurrency,
        currentToken: selectedToken.symbol,
        amountToSend: {
          token: amount,
          currency: amountInCurrency,
        },
        fee: {
          token: gasFeeAmount,
          currency: gasFeeAmountInCurrency,
        },
        balance: {
          token: amount,
          currency: firtsAvailableToken.balance,
        },
        feeMultiplier,
      }

      const tx = {
        to: passProps.recipientAddress,
        from: address,
        value: convertBTCToSatoshi(passProps.amountToSend.token),
      }

      requestBitcoinUtxoByAddress(address)
        .then((results) => {
          console.log("RESULTS: ", results)
          console.log("networks: ", networks)
          if (results && results.payload.data) {
            const feeRate = passProps.fee.token
            // const prepared = await dispatch(BitcoinUtils.prepareBitcoinTransaction(tx, token, network, utxos))
            prepareBitcoinTransaction({
              tx,
              blockchain,
              feeRate,
              network: networks.testnet,
              utxos: results.payload.data,
            })
              .then((transaction) => {
                console.log('HERE IS TRANSACTION: ', transaction)
                console.log('HERE IS TRANSACTION.buildIncomplete().toHex(): ', transaction.prepared.buildIncomplete().toHex())
                const unsignedTxHex = transaction.prepared.buildIncomplete().toHex()
                Keychain.getInternetCredentials(parentAddress)
                  .then((keychain) => {
                    console.log("PASsWORD: ", keychain.password)
                    decryptWallet(currentWallet.encrypted, keychain.password)
                      .then((decrypted) => {
                        console.log("decrypted: ", decrypted)
                        const signedTX = signTransaction({ unsignedTxHex, network: networks.testnet, privateKey: decrypted.privateKey })
                        console.log("SIGNED: ", signedTX)
                      })
                  })
              })
          }
        })

      this.setState({ passProps }, () => this.handleTogglePasswordModal())

    } else {
      Alert.alert('Input error', 'Please fill address and amount', [
        { text: 'Ok', onPress: () => { }, style: 'cancel' },
      ])
    }
  }

  handleChangeRecipient = (name, value) => {
    if (typeof value === 'string') {
      const { blockchain } = this.props.navigation.state.params
      const {
        isAmountInputValid,
        recipient,
        amount,
      } = this.state
      // Check for Ethereum
      let dummyValidationOfRecipientInput =
        value !== null &&
        value !== '' &&
        (value.length >= 40 || value.length <= 44) &&
        value.startsWith('0x')

      // Check for BitCoin-based
      if (blockchain !== DUCK_ETHEREUM) {
        dummyValidationOfRecipientInput = value !== null && value !== '' && value.length === 34
      }
      this.setState(
        {
          recipient: value,
          isRecipientInputValid: dummyValidationOfRecipientInput,
        },
        () => {
          if (isAmountInputValid) {
            if (blockchain === DUCK_ETHEREUM) {
              this.requestGasEstimations(recipient, amount)
            } else {
              this.requestBcFeeEstimations()
            }
          }
        }
      )
    }
  }

  handleChangeAmount = (name, value) => {
    if (typeof value === 'string') {
      const { prices } = this.props
      const { selectedCurrency, blockchain } = this.props.navigation.state.params
      const {
        selectedToken,
        recipient,
        amount,
      } = this.state
      if (!(value.endsWith(',') || value.endsWith('.'))) {
        const localeValue = parseFloat(value.replace(',', '.').replace(' ', ''))
        const tokenPrice =
          (prices &&
            selectedToken &&
            prices[selectedToken.symbol] &&
            prices[selectedToken.symbol][selectedCurrency]) ||
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
            if (this.state.isRecipientInputValid) {
              if (blockchain === DUCK_ETHEREUM) {
                this.requestGasEstimations(recipient, amount)
              } else {
                this.requestBcFeeEstimations()
              }
            }
          }
        )
      } else {
        this.setState({
          amount: value ? parseFloat(value.replace(',', '.').replace(' ', '')) : null,
          amountInCurrency: 0,
          isAmountInputValid: false,
        })
      }
    }
  }

  handleFeeSliderChange = (value) => {
    const {
      selectedToken,
      gasFee,
      feeMultiplier,
      gasFeeAmount,
    } = this.state
    const {
      prices,
    } = this.props
    const {
      blockchain,
      selectedCurrency,
    } = this.props.navigation.state.params
    if (gasFee !== null) {
      if (blockchain === DUCK_ETHEREUM) {
        const newGasFee =
          gasFee &&
          // this.state.selectedDAO &&
          0.0002

        const tokenPrice =
          (prices &&
            selectedToken &&
            prices[selectedToken.symbol][selectedCurrency]) ||
          0 // TODO: handle wrong values correctly

        const newGasFeePrice = newGasFee ? newGasFee * tokenPrice : null

        this.setState({
          feeMultiplier: value,
          gasFeeAmount: newGasFee,
          gasFeeAmountInCurrency: newGasFeePrice,
        })
      } else {
        const newGasFee =
          gasFeeAmount && gasFeeAmount * feeMultiplier
        const tokenPrice =
          (prices &&
            selectedToken &&
            prices[selectedToken.symbol][selectedCurrency]) ||
          0 // TODO: handle wrong values correctly
        const newGasFeePrice = newGasFee ? newGasFee * tokenPrice : null
        this.setState({
          feeMultiplier: value,
          gasFeeAmount: newGasFee,
          gasFeeAmountInCurrency: newGasFeePrice,
        })
      }
    } else {
      this.setState({
        feeMultiplier: value,
      })
    }
  }

  requestBcFeeEstimations = () => {
    const {
      address,
      blockchain,
      selectedCurrency,
    } = this.props.navigation.state.params
    const {
      prices,
    } = this.props
    const {
      recipient,
      amount,
      feeMultiplier,
      selectedToken,
    } = this.state
    const params = {
      address,
      recipient,
      amount: new BigNumber(amount),
      formFee: feeMultiplier,
      blockchain,
    }

    // const feeBtc = this.props.tokensDuck
    // .getBySymbol(getPrimaryToken(this.props.selectedWallet.blockchain))
    // .removeDecimals(fee)
    const feeBtc = 0.00001
    const tokenPrice =
      (prices &&
        selectedToken &&
        prices[selectedToken.symbol] &&
        prices[selectedToken.symbol][selectedCurrency]) ||
      0 // TODO: handle wrong values correctly
    const newBcFeePrice = feeBtc ? feeBtc * tokenPrice : null

    this.setState({
      gasFee: feeBtc,
      gasFeeAmount: feeBtc,
      gasFeeAmountInCurrency: newBcFeePrice,
    })
  }

  requestGasEstimations = (to, value) => {
    const {
      selectedToken,
    } = this.state
    const {
      selectedCurrency,
    } = this.props.navigation.state.params
    const {
      prices,
    } = this.props
    const weiValue = convertToWei(value)
    if (selectedToken) {
      const tokenPrice =
        (prices &&
          selectedToken &&
          selectedToken.symbol &&
          prices[selectedToken.symbol][selectedCurrency]) ||
        0 // TODO: handle wrong values correctly
      const newGasFeePrice = newGasFee ? newGasFee * tokenPrice : null

      this.setState({
        // gasFee,
        // gasFeeAmount: newGasFee,
        gasFeeAmountInCurrency: newGasFeePrice,
      })
    }
  }

  handleTogglePasswordModal = () => {
    this.setState({ enterPasswordModal: !this.state.enterPasswordModal })
  }

  handleCloseConfirmModal = () => {
    this.setState({ enterPasswordModal: false }, () => {
      this.setState({ confirmSendModal: false })
    })
  }

  handlePasswordConfirm = () => {
    this.setState({ confirmSendModal: !this.state.confirmSendModal })
  }

  handleSendConfirm = () => {
    Alert.alert('SEND CONFIRMED')
    this.handleCloseConfirmModal()
  }

  handlePasswordChange = (name, value) => {
    this.setState({ [name]: value })
  }

  handleTxDraftCreate = () => {
    const { createBitcoinTxDraft, navigation } = this.props
    const { address, parentAddress } = navigation.state.params
    createBitcoinTxDraft({ address, parentAddress })
  }

  handleTxDraftRemove = () => {
    const { deleteBitcoinTxDraft, navigation } = this.props
    const { address, parentAddress } = navigation.state.params
    deleteBitcoinTxDraft({ address, parentAddress })
  }


  render () {
    const {
      enterPasswordModal,
      confirmSendModal,
      error,
      amount,
      amountInCurrency,
      feeMultiplier,
      gasFeeAmount,
      gasFeeAmountInCurrency,
      recipient,
      selectedToken,
      passProps,
    } = this.state
    const {
      blockchain,
      selectedCurrency,
      address,
    } = this.props.navigation.state.params
    const { BTCwallets } = this.props
    return (
      <Send
        amount={amount}
        amountInCurrency={amountInCurrency}
        blockchain={blockchain}
        feeMultiplier={feeMultiplier}
        gasFeeAmount={gasFeeAmount}
        gasFeeAmountInCurrency={gasFeeAmountInCurrency}
        onChangeAmount={this.handleChangeAmount}
        onChangeRecipient={this.handleChangeRecipient}
        onFeeSliderChange={this.handleFeeSliderChange}
        onSelectToken={this.handleSelectToken}
        recipient={recipient}
        selectedCurrency={selectedCurrency}
        selectedToken={selectedToken}
        selectedWallet={BTCwallets[address]}
        passProps={passProps}
        //

        onTogglePasswordModal={this.handleGoToPasswordModal}
        onCloseConfirmModal={this.handleCloseConfirmModal}
        onPasswordChange={this.handlePasswordChange}
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

export default connect(mapStateToProps, mapDispatchToProps)(SendContainer)
