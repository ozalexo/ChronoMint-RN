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
import { convertToWei } from '@chronobank/ethereum/utils/amount'
import { getCurrentEthWallet } from '@chronobank/ethereum/redux/selectors'
import {
  requestBitcoinUtxoByAddress,
  requestBitcoinEstimateFeeRate,
} from '@chronobank/bitcoin/service/api'
import { prepareBitcoinTransaction } from '@chronobank/bitcoin/utils'
import { getCurrentNetwork } from '@chronobank/network/redux/selectors'
import { selectMarketPrices } from '@chronobank/market/redux/selectors'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import ConfirmSendModal from './Modals/ConfirmSendModal'
import PasswordEnterModal from './Modals/PasswordEnterModal'
import SendEth from './SendEth'

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    prices: selectMarketPrices(state),
    currentEthWallet: getCurrentEthWallet(masterWalletAddress)(state),
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

class SendEthContainer extends React.Component {
  constructor (props) {
    super(props)
    const first = Object.keys(props.currentEthWallet.tokens)[0]
    const firtsAvailableToken = props.currentEthWallet.tokens[first]
    const selectedToken = {
      symbol: firtsAvailableToken.symbol,
      amount: firtsAvailableToken.amount,
    }
    this.state = {
      amount: null,
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
        value: this.state.amount,
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
                // eslint-disable-next-line no-console
                console.warn(error)
              })
          }
        })
        .catch((error) => {
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
          updateBitcoinTxDraftRecipient({
            address,
            masterWalletAddress,
            recipient: this.state.recipient,
          })
          if (this.state.isAmountInputValid) {
            this.requestGasEstimations(this.state.recipient, this.state.amount)
          }
        }
      )
    }
  }

  handleChangeAmount = (name, value) => {
    if (typeof value === 'string') {
      const { prices, updateBitcoinTxDraftAmount } = this.props
      const { selectedCurrency, address, masterWalletAddress } = this.props.navigation.state.params
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
              masterWalletAddress,
              amount: localeValue,
            })
            if (this.state.isRecipientInputValid) {
              this.requestGasEstimations(this.state.recipient, this.state.amount)
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
            masterWalletAddress,
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
      selectedCurrency,
      address,
      masterWalletAddress,
    } = this.props.navigation.state.params
    if (this.state.fee !== null) {
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
        fee={fee}
        feeInCurrency={feeInCurrency}
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
