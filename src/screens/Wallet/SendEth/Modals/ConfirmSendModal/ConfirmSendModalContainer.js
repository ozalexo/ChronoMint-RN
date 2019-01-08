/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  sendSignedTransaction,
} from '@chronobank/ethereum/middleware/thunks'
import { selectCurrentCurrency, selectMarketPrices } from '@chronobank/market/redux/selectors'
import { getCurrentEthWallet } from '@chronobank/ethereum/redux/selectors'
import { convertFromWei } from '@chronobank/ethereum/utils/amount'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import ConfirmSendModal from './ConfirmSendModal'

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    prices: selectMarketPrices(state),
    currentEthWallet: getCurrentEthWallet(masterWalletAddress)(state),
    selectedCurrency: selectCurrentCurrency(state),
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sendSignedTransaction,
}, dispatch)

class ConfirmSendModalContainer extends React.Component {

  state = {
    amountToSend: {},
    fee: {},
    balance: {},
  }

  componentDidMount () {
    const { selectedCurrency, currentEthWallet, prices, token } = this.props

    if (!currentEthWallet || !currentEthWallet.txDraft) {
      return
    }

    const { txDraft } = currentEthWallet
    const selectedToken = token.symbol
    const currency = prices &&
      prices[selectedToken] &&
      prices[selectedToken][selectedCurrency]
    const amountToSend = {
      token: txDraft.value,
      currency: currency * txDraft.value,
    }
    const totalFee = parseFloat(convertFromWei(txDraft.gasLimit))
    const fee = {
      token: totalFee,
      currency: currency * totalFee,
    }
    const balance = {
      token: token.balance.toNumber(),
      currency: currency * token.balance,
    }

    this.setState({
      amountToSend,
      fee,
      balance,
    })
  }

  handleConfirmSendClick = () => {
    const {
      currentEthWallet,
      sendSignedTransaction,
      sendConfirm,
      modalToggle,
    } = this.props
    const {
      signedTx,
    } = currentEthWallet.txDraft
    sendSignedTransaction({ signedTx })
      .then((/*sendTxRespone*/) => {
        sendConfirm()
        modalToggle()
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.warn(error)
      })
  }


  render () {
    const {
      visible,
      modalToggle,
      currentEthWallet,
      selectedCurrency,
      token,
    } = this.props

    if (!currentEthWallet || !currentEthWallet.txDraft) {
      return null
    }
    const { to } = currentEthWallet.txDraft

    return (
      <ConfirmSendModal
        onConfirmSend={this.handleConfirmSendClick}
        visible={visible}
        modalToggle={modalToggle}
        recipientAddress={to}
        currentToken={token.symbol}
        selectedCurrency={selectedCurrency}
        amountToSend={this.state.amountToSend}
        fee={this.state.fee}
        balance={this.state.balance}
      />
    )
  }
}

ConfirmSendModalContainer.propTypes = {
  visible: PropTypes.bool,
  modalToggle: PropTypes.func,
  sendConfirm: PropTypes.func,
  currentEthWallet: PropTypes.shape({}),
  requestBitcoinSendRawTransaction: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSendModalContainer)
