/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectMarketPrices } from '@chronobank/market/redux/selectors'
import { selectCurrentCurrency } from '@chronobank/market/redux/selectors'
import { getBitcoinCurrentWallet } from '@chronobank/bitcoin/redux/selectors'
import { requestBitcoinSendRawTransaction } from '@chronobank/bitcoin/service/api'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import ConfirmSendModal from './ConfirmSendModal'

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    prices: selectMarketPrices(state),
    currentBTCWallet: getBitcoinCurrentWallet(masterWalletAddress)(state),
    selectedCurrency: selectCurrentCurrency(state),
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  requestBitcoinSendRawTransaction,
}, dispatch)

class ConfirmSendModalContainer extends React.Component {

  state = {
    amountToSend: {},
    fee: {},
    balance: {},
  }

  componentDidMount () {
    const { selectedCurrency, currentBTCWallet, prices } = this.props

    if (!currentBTCWallet || !currentBTCWallet.txDraft) {
      return
    }

    const { txDraft, tokens } = currentBTCWallet
    const currency = prices &&
      prices[txDraft.token] &&
      prices[txDraft.token][selectedCurrency]
    const amountToSend = {
      token: txDraft.amount,
      currency: currency * txDraft.amount,
    }
    const totalFee = txDraft.fee * txDraft.feeMultiplier
    const fee = {
      token: totalFee,
      currency: currency * totalFee,
    }
    const balance = {
      token: tokens[txDraft.token].amount,
      currency: currency * tokens[txDraft.token].amount,
    }

    this.setState({
      amountToSend,
      fee,
      balance,
    })
  }

  handleConfirmSendClick = () => {
    const {
      currentBTCWallet,
      requestBitcoinSendRawTransaction,
      sendConfirm,
    } = this.props
    const { signedTx } = currentBTCWallet.txDraft
    requestBitcoinSendRawTransaction(signedTx)
      .then((/*sendTxRespone*/) => {
        sendConfirm()
        this.props.modalToggle()
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
      currentBTCWallet,
      selectedCurrency,
    } = this.props

    if (!currentBTCWallet || !currentBTCWallet.txDraft) {
      return null
    }
    const { recipient, token } = currentBTCWallet.txDraft

    return (
      <ConfirmSendModal
        onConfirmSend={this.handleConfirmSendClick}
        visible={visible}
        modalToggle={modalToggle}
        recipientAddress={recipient}
        currentToken={token}
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
  currentBTCWallet: PropTypes.shape({}),
  requestBitcoinSendRawTransaction: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSendModalContainer)
