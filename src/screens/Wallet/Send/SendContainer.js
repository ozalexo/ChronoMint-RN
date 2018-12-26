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
import {
  requestBitcoinUtxoByAddress,
  requestBitcoinEstimateFeeRate,
} from '@chronobank/bitcoin/service/api'
import { prepareBitcoinTransaction } from '@chronobank/bitcoin/utils'
import { getBitcoinCurrentWallet } from '@chronobank/bitcoin/redux/selectors'
import { getCurrentNetwork } from '@chronobank/network/redux/selectors'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { convertBTCToSatoshi, convertSatoshiToBTC } from '@chronobank/bitcoin/utils/amount'
import { selectMarketPrices } from '@chronobank/market/redux/selectors'
import TextButton from '../../../components/TextButton'
import styles from './SendStyles'
import Send from './Send'

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    masterWalletAddress,
    prices: selectMarketPrices(state),
    currentBTCWallet: getBitcoinCurrentWallet(masterWalletAddress)(state),
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
    const first = Object.keys(props.currentBTCWallet.tokens)[0]
    const firtsAvailableToken = props.currentBTCWallet.tokens[first]
    const selectedToken = {
      symbol: firtsAvailableToken.symbol,
      amount: firtsAvailableToken.amount,
    }
    this.state = {
      amount: null,
      amountInCurrency: 0,
      confirmSendModal: false,
      enterPasswordModal: false,
      showQRscanner: false,
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
        <TextButton
          style={styles.headerButton}
          onPress={params.handleGoToPasswordModal}
          label='Done'
        />
      ),
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

  handleGoToPasswordModal = () => {
    const {
      address,
      blockchain,
      masterWalletAddress,
    } = this.props.navigation.state.params
    const {
      requestBitcoinUtxoByAddress,
      network,
      updateBitcoinTxDraftToken,
      updateBitcoinTxDraftUnsignedTx,
    } = this.props

    if (this.state.isRecipientInputValid && this.state.isAmountInputValid) {
      updateBitcoinTxDraftToken({
        address,
        masterWalletAddress,
        token: this.state.selectedToken.symbol,
      })

      const tx = {
        to: this.state.recipient,
        from: address,
        value: convertBTCToSatoshi(this.state.amount),
      }

      requestBitcoinUtxoByAddress(address)
        .then((results) => {
          if (results && results.payload.data) {
            prepareBitcoinTransaction({
              tx,
              blockchain,
              feeRate: this.state.feeEstimation,
              feeMultiplier: this.state.feeMultiplier,
              network: network.networkType,
              utxos: results.payload.data,
            })
              .then((transaction) => {
                updateBitcoinTxDraftUnsignedTx({
                  address,
                  masterWalletAddress,
                  unsignedTx: transaction.prepared.buildIncomplete().toHex(),
                })

                const modalProps = {
                  masterWalletAddress,
                  network,
                }

                this.setState({ modalProps }, () => this.handleTogglePasswordModal())
              })
              .catch((error) => {
                Alert.alert("Error, while preparing bitcoin transaction.")
                // eslint-disable-next-line no-console
                console.warn(error)
              })
          }
        })
        .catch((error) => {
          Alert.alert("Error, while making an UTXO request to middleware.")
          // eslint-disable-next-line no-console
          console.warn(error)
        })


    } else {
      Alert.alert('Input error', 'Please fill address and amount', [
        { text: 'Ok', onPress: () => { }, style: 'cancel' },
      ])
    }
  }

  handleChangeRecipient = (name, value) => {
    if (typeof value === 'string') {
      const { address, masterWalletAddress } = this.props.navigation.state.params
      const { updateBitcoinTxDraftRecipient } = this.props
      // Check for Ethereum
      let dummyValidationOfRecipientInput = value && value.length === 34

      this.setState(
        {
          recipient: value,
          isRecipientInputValid: dummyValidationOfRecipientInput,
        },
        () => {
          updateBitcoinTxDraftRecipient({
            address,
            masterWalletAddress,
            recipient: this.state.recipient,
          })
          if (this.state.isAmountInputValid) {
            this.requestBcFeeEstimations()
          }
        }
      )
    }
  }

  handleChangeAmount = (name, value) => {
    if (typeof value === 'string') {
      const { prices, updateBitcoinTxDraftAmount } = this.props
      const { selectedCurrency, address, masterWalletAddress } = this.props.navigation.state.params
      if (!(value.endsWith(',') || value.endsWith('.') || value.endsWith('0'))) {
        const inputValue = value.replace(',', '.').replace(' ', '')
        const localeValue = new BigNumber(inputValue).toNumber()
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
            amount: inputValue,
            amountInCurrency: tokenPrice * localeValue,
            isAmountInputValid: dummyValidationOfAmountInput,
          },
          () => {
            updateBitcoinTxDraftAmount({
              address,
              masterWalletAddress,
              amount: localeValue,
            })
            if (this.state.isRecipientInputValid) {
              this.requestBcFeeEstimations()
            }
          }
        )
      } else {
        this.setState({
          amount: value ? value.replace(',', '.').replace(' ', '') : null,
          amountInCurrency: 0,
          isAmountInputValid: false,
        }, () => {
          updateBitcoinTxDraftAmount({
            address,
            masterWalletAddress,
            amount: new BigNumber(this.state.amount).toNumber(),
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
      selectedCurrency,
      address,
      masterWalletAddress,
    } = this.props.navigation.state.params
    if (this.state.fee !== null) {
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
          masterWalletAddress,
          feeMultiplier: this.state.feeMultiplier,
        })
        updateBitcoinTxDraftFee({
          address,
          masterWalletAddress,
          fee: this.state.feeEstimation * this.state.feeMultiplier,
        })
      })
    } else {
      this.setState({
        feeMultiplier: value,
      }, () => {

        const fee = this.state.feeEstimation * this.state.feeMultiplier

        updateBitcoinTxDraftFeeMultiplier({
          address,
          masterWalletAddress,
          feeMultiplier: this.state.feeMultiplier,
        })
        updateBitcoinTxDraftFee({
          address,
          masterWalletAddress,
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
      prices,
      requestBitcoinEstimateFeeRate,
      updateBitcoinTxDraftFee,
      navigation,
    } = this.props

    const {
      selectedCurrency,
      address,
      masterWalletAddress,
    } = navigation.state.params

    if (this.state.selectedToken) {
      requestBitcoinEstimateFeeRate()
        .then((results) => {
          const feeEstimation = parseFloat(convertSatoshiToBTC(results.payload.data.avgFee))
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
            updateBitcoinTxDraftFee({
              address,
              masterWalletAddress,
              fee: feeEstimation,
            })
          })
        })
        .catch((error) => {
          Alert.alert("Error, while making a fee estimate request to middleware.")
          // eslint-disable-next-line no-console
          console.warn(error)
        })
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
    const { createBitcoinTxDraft, navigation } = this.props
    const { address, masterWalletAddress } = navigation.state.params
    createBitcoinTxDraft({ address, masterWalletAddress })
  }

  handleTxDraftRemove = () => {
    const { deleteBitcoinTxDraft, navigation } = this.props
    const { address, masterWalletAddress } = navigation.state.params
    deleteBitcoinTxDraft({ address, masterWalletAddress })
  }

  handleQRpageOpen = () => {
    this.setState({ showQRscanner: !this.state.showQRscanner })
  }

  handleQRscan = (scannedAddress) => {
    this.handleChangeRecipient('recipient', scannedAddress.data)
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
      recipient,
      selectedToken,
      modalProps,
      showQRscanner,
    } = this.state
    const {
      blockchain,
      selectedCurrency,
    } = this.props.navigation.state.params
    const { currentBTCWallet, prices } = this.props
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
        selectedWallet={currentBTCWallet}
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

export default connect(mapStateToProps, mapDispatchToProps)(SendContainer)
