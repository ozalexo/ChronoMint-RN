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
import { selectCurrentCurrency } from '@chronobank/market/redux/selectors'
import { selectMarketPrices } from '@chronobank/market/redux/selectors'
import { getCurrentEthWallet } from '@chronobank/ethereum/redux/selectors'
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
    const { selectedCurrency, currentEthWallet, prices } = this.props

    if (!currentEthWallet || !currentEthWallet.txDraft) {
      return
    }

    const { txDraft, tokens } = currentEthWallet
    const token = 'ETH' //for testing
    const currency = prices &&
      prices[token] &&
      prices[token][selectedCurrency]
    const amountToSend = {
      token: txDraft.value,
      currency: currency * txDraft.value,
    }
    const totalFee = txDraft.gasLimit
    const fee = {
      token: totalFee,
      currency: currency * totalFee,
    }
    const balance = {
      token: tokens[token].balance.toNumber(),
      currency: currency * tokens[token].balance,
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
    const { signedTx } = currentEthWallet.txDraft
    sendSignedTransaction({signedTx})
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
        currentToken='ETH'
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
