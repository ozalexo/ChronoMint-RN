/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBitcoinCurrentWallet } from '@chronobank/bitcoin/redux/selectors'
import { requestBitcoinSendRawTransaction } from '@chronobank/bitcoin/service/api'
import ConfirmSendModal from './ConfirmSendModal'

const mapStateToProps = (state) => {
  return {
    currentBTCWallet: getBitcoinCurrentWallet(state),
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  requestBitcoinSendRawTransaction,
}, dispatch)

class ConfirmSendModalContainer extends React.Component {

  handleConfirmSendClick = () => {
    console.log('HERE!!!')
    const {
      currentBTCWallet,
      requestBitcoinSendRawTransaction,
      sendConfirm,
      onTxDraftRemove,
    } = this.props
    const { signedTx } = currentBTCWallet.txDraft
    console.log('signedTx: ', signedTx)
    requestBitcoinSendRawTransaction(signedTx)
      .then((sendTxRespone) => {
        console.log('sendTxRespone: ', sendTxRespone)
        onTxDraftRemove()
        sendConfirm()
      })
  }


  render () {
    const {
      visible,
      modalToggle,
    } = this.props
    return (
      <ConfirmSendModal
        onConfirmSend={this.handleConfirmSendClick}
        visible={visible}
        modalToggle={modalToggle}
      />
    )
  }
}

ConfirmSendModalContainer.propTypes = {
  visible: PropTypes.bool,
  modalToggle: PropTypes.func,
  sendConfirm: PropTypes.func,
  onTxDraftRemove: PropTypes.func,
  currentBTCWallet: PropTypes.shape({}),
  requestBitcoinSendRawTransaction: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSendModalContainer)
