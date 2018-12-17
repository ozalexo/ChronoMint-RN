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
import {
  createBitcoinTxDraft,
  deleteBitcoinTxDraft,
  updateBitcoinTxDraftRecipient,
  updateBitcoinTxDraftAmount,
  updateBitcoinTxDraftToken,
  updateBitcoinTxDraftFee,
  updateBitcoinTxDraftFeeMultiplier,
  updateBitcoinTxDraftUnsignedTx,
} from '@chronobank/bitcoin/redux/thunks'
import { BLOCKCHAIN_ETHEREUMUM } from '@chronobank/ethereum/constants'
import {
  requestBitcoinUtxoByAddress,
  requestBitcoinEstimateFeeRate,
} from '@chronobank/bitcoin/service/api'
import { prepareBitcoinTransaction } from '@chronobank/bitcoin/utils'
import { getBitcoinWallets } from '@chronobank/bitcoin/redux/selectors'
import { getCurrentNetwork } from '@chronobank/network/redux/selectors'
import { convertToWei, convertBTCToSatoshi, convertSatoshiToBTC } from '@chronobank/bitcoin/utils/amount'
import { selectMarketPrices } from '@chronobank/market/redux/selectors'
import ConfirmSendModal from './Modals/ConfirmSendModal'
import PasswordEnterModal from './Modals/PasswordEnterModal'
import Send from './Send'

const mapStateToProps = (state) => {
  return {
    prices: {
      BTC: {
        USD: 1499,
      },
    },
    // prices: selectMarketPrices(state),
    BTCwallets: getBitcoinWallets(state),
    network: getCurrentNetwork(state),
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
  createBitcoinTxDraft,
  deleteBitcoinTxDraft,
  requestBitcoinUtxoByAddress,
  requestBitcoinEstimateFeeRate,
  updateBitcoinTxDraftRecipient,
  updateBitcoinTxDraftAmount,
  updateBitcoinTxDraftToken,
  updateBitcoinTxDraftFee,
  updateBitcoinTxDraftFeeMultiplier,
  updateBitcoinTxDraftUnsignedTx,
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
      fee: null,
      feeInCurrency: null,
      feeMultiplier: 1,
      feeEstimation: 1,
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
    createBitcoinTxDraft: PropTypes.func,
    updateBitcoinTxDraftRecipient: PropTypes.func,
    updateBitcoinTxDraftAmount: PropTypes.func,
    updateBitcoinTxDraftToken: PropTypes.func,
    updateBitcoinTxDraftFee: PropTypes.func,
    updateBitcoinTxDraftFeeMultiplier: PropTypes.func,
    updateBitcoinTxDraftUnsignedTx: PropTypes.func,
    deleteBitcoinTxDraft: PropTypes.func,
    requestBitcoinUtxoByAddress: PropTypes.func,
    requestBitcoinEstimateFeeRate: PropTypes.func,
    network: PropTypes.shape({}),
    prices: PropTypes.shape({}),
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
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
    const {
      address,
      blockchain,
      parentAddress,
    } = this.props.navigation.state.params
    const {
      requestBitcoinUtxoByAddress,
      network,
      updateBitcoinTxDraftToken,
      updateBitcoinTxDraftUnsignedTx,
    } = this.props
    const {
      isRecipientInputValid,
      isAmountInputValid,
      recipient,
      feeMultiplier,
      feeEstimation,
      selectedToken,
      amount,
    } = this.state

    if (isRecipientInputValid && isAmountInputValid) {
      updateBitcoinTxDraftToken({
        address,
        parentAddress,
        token: selectedToken.symbol,
      })

      const tx = {
        to: recipient,
        from: address,
        value: convertBTCToSatoshi(amount),
      }

      requestBitcoinUtxoByAddress(address)
        .then((results) => {
          if (results && results.payload.data) {
            const fee = feeEstimation * feeMultiplier
            prepareBitcoinTransaction({
              tx,
              blockchain,
              feeRate: fee,
              network: network.networkType,
              utxos: results.payload.data,
            })
              .then((transaction) => {
                updateBitcoinTxDraftUnsignedTx({
                  address,
                  parentAddress,
                  unsignedTx: transaction.prepared.buildIncomplete().toHex(),
                })

                const modalProps = {
                  parentAddress,
                  network,
                }

                this.setState({ modalProps }, () => this.handleTogglePasswordModal())
              })
              .catch((error) => console.warn(error))
          }
        })
        .catch((error) => console.warn(error))


    } else {
      Alert.alert('Input error', 'Please fill address and amount', [
        { text: 'Ok', onPress: () => { }, style: 'cancel' },
      ])
    }
  }

  handleChangeRecipient = (name, value) => {
    if (typeof value === 'string') {
      const { blockchain, address, parentAddress } = this.props.navigation.state.params
      const { updateBitcoinTxDraftRecipient } = this.props
      // Check for Ethereum
      let dummyValidationOfRecipientInput =
        value !== null &&
        value !== '' &&
        (value.length >= 40 || value.length <= 44) &&
        value.startsWith('0x')

      // Check for BitCoin-based
      if (blockchain !== BLOCKCHAIN_ETHEREUMUM) {
        dummyValidationOfRecipientInput = value !== null && value !== '' && value.length === 34
      }
      this.setState(
        {
          recipient: value,
          isRecipientInputValid: dummyValidationOfRecipientInput,
        },
        () => {
          updateBitcoinTxDraftRecipient({
            address,
            parentAddress,
            recipient: this.state.recipient,
          })
          if (this.state.isAmountInputValid) {
            if (blockchain === BLOCKCHAIN_ETHEREUMUM) {
              this.requestGasEstimations(this.state.recipient, this.state.amount)
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
      const { prices, updateBitcoinTxDraftAmount } = this.props
      const { selectedCurrency, blockchain, address, parentAddress } = this.props.navigation.state.params
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
            updateBitcoinTxDraftAmount({
              address,
              parentAddress,
              amount: localeValue,
            })
            if (this.state.isRecipientInputValid) {
              if (blockchain === BLOCKCHAIN_ETHEREUMUM) {
                this.requestGasEstimations(this.state.recipient, this.state.amount)
              } else {
                this.requestBcFeeEstimations()
              }
            }
          }
        )
      } else {
        this.setState({
          amount: value ? new BigNumber(parseFloat(value.replace(',', '.').replace(' ', ''))).toNumber() : null,
          amountInCurrency: 0,
          isAmountInputValid: false,
        }, () => {
          updateBitcoinTxDraftAmount({
            address,
            parentAddress,
            amount: this.state.amount,
          })
        })
      }
    }
  }

  handleFeeSliderChange = (value) => {
    const {
      prices,
      updateBitcoinTxDraftFeeMultiplier,
      updateBitcoinTxDraftFee,
    } = this.props
    const {
      blockchain,
      selectedCurrency,
      address,
      parentAddress,
    } = this.props.navigation.state.params
    if (this.state.fee !== null) {
      if (blockchain === BLOCKCHAIN_ETHEREUMUM) {
        const newGasFee =
          this.state.gasFee &&
          // this.state.selectedDAO &&
          0.0002

        const tokenPrice =
          (prices &&
            this.state.selectedToken &&
            prices[this.state.selectedToken.symbol][selectedCurrency]) ||
          0 // TODO: handle wrong values correctly

        const newGasFeePrice = newGasFee ? newGasFee * tokenPrice : null

        this.setState({
          feeMultiplier: value,
          gasFeeAmount: newGasFee,
          gasFeeAmountInCurrency: newGasFeePrice,
        })
      } else {
        const fee =
          this.state.feeEstimation && this.state.feeEstimation * this.state.feeMultiplier
        const tokenPrice =
          (prices &&
            this.state.selectedToken &&
            prices[this.state.selectedToken.symbol][selectedCurrency]) ||
          0 // TODO: handle wrong values correctly
        const newFeePrice = fee ? fee * tokenPrice : null
        this.setState({
          feeMultiplier: value,
          fee,
          feeInCurrency: newFeePrice,
        }, () => {
          updateBitcoinTxDraftFeeMultiplier({
            address,
            parentAddress,
            feeMultiplier: this.state.feeMultiplier,
          })
          updateBitcoinTxDraftFee({
            address,
            parentAddress,
            fee: this.state.feeEstimation * this.state.feeMultiplier,
          })
        })
      }
    } else {
      this.setState({
        feeMultiplier: value,
      }, () => {

        const fee = this.state.feeEstimation * this.state.feeMultiplier

        updateBitcoinTxDraftFeeMultiplier({
          address,
          parentAddress,
          feeMultiplier: this.state.feeMultiplier,
        })
        updateBitcoinTxDraftFee({
          address,
          parentAddress,
          fee,
        })
        this.setState({
          fee,
        })
      })
    }
  }

  requestBcFeeEstimations = () => {
    const {
      selectedCurrency,
      address,
      parentAddress,
    } = this.props.navigation.state.params
    const {
      prices,
      requestBitcoinEstimateFeeRate,
    } = this.props
    if (this.state.selectedToken) {
      requestBitcoinEstimateFeeRate()
        .then((results) => {
          const feeEstimation = convertSatoshiToBTC(results.payload.data.avgFee).toNumber()
          const tokenPrice =
            (prices &&
              this.state.selectedToken &&
              this.state.selectedToken.symbol &&
              prices[this.state.selectedToken.symbol][selectedCurrency]) ||
            0 // TODO: handle wrong values correctly
          const newFeePrice = feeEstimation ? feeEstimation * tokenPrice : null
          this.setState({
            feeEstimation,
            fee: feeEstimation,
            feeInCurrency: newFeePrice,
          }, () => {
            this.props.updateBitcoinTxDraftFee({
              address,
              parentAddress,
              fee: feeEstimation,
            })
          })
        })
    }
  }

  requestGasEstimations = (to, value) => {
    const {
      selectedCurrency,
    } = this.props.navigation.state.params
    const {
      prices,
    } = this.props
    const weiValue = convertToWei(value)
    if (this.state.selectedToken) {
      const tokenPrice =
        (prices &&
          this.state.selectedToken &&
          this.state.selectedToken.symbol &&
          prices[this.state.selectedToken.symbol][selectedCurrency]) ||
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
    this.props.navigation.navigate('Wallet')
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
      feeInCurrency,
      fee,
      gasFeeAmount,
      gasFeeAmountInCurrency,
      recipient,
      selectedToken,
      modalProps,
    } = this.state
    const {
      blockchain,
      selectedCurrency,
      address,
    } = this.props.navigation.state.params
    const { BTCwallets, prices } = this.props
    const blockchainPrice = prices &&
      prices[selectedToken.symbol] &&
      prices[selectedToken.symbol][selectedCurrency]
    return (
      <Send
        amount={amount}
        amountInCurrency={amountInCurrency}
        blockchain={blockchain}
        feeMultiplier={feeMultiplier}
        fee={fee}
        feeInCurrency={feeInCurrency}
        onChangeAmount={this.handleChangeAmount}
        onChangeRecipient={this.handleChangeRecipient}
        onFeeSliderChange={this.handleFeeSliderChange}
        onSelectToken={this.handleSelectToken}
        recipient={recipient}
        selectedCurrency={selectedCurrency}
        selectedToken={selectedToken}
        selectedWallet={BTCwallets[address]}
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

export default connect(mapStateToProps, mapDispatchToProps)(SendContainer)
