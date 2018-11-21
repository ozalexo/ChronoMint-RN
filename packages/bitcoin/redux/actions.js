/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as BitcoinActionsConstants from './constants'

export const bitcoinTxUpdate = (entry) => ({
  type: BitcoinActionsConstants.BITCOIN_TX_UPDATE,
  key: entry.key,
  address: entry.tx.from,
  entry,
})

export const bitcoinTxAccept = (entry) => ({
  type: BitcoinActionsConstants.BITCOIN_TX_ACCEPT,
  entry,
  isAccepted: true,
  isPending: true,
})

export const bitcoinHttpGetBlocksHeight = () => ({
  type: BitcoinActionsConstants.BITCOIN_HTTP_GET_BLOCKS_HEIGHT,
})

export const bitcoinHttpGetBlocksHeightSuccess = (data) => ({
  type: BitcoinActionsConstants.BITCOIN_HTTP_GET_BLOCKS_HEIGHT_SUCCESS,
  data,
})

export const bitcoinHttpGetBlocksHeightFailure = (error) => ({
  type: BitcoinActionsConstants.BITCOIN_HTTP_GET_BLOCKS_HEIGHT_FAILURE,
  error,
})

export const bitcoinHttpGetTransactionInfo = () => ({
  type: BitcoinActionsConstants.BITCOIN_HTTP_GET_TX_INFO,
})

export const bitcoinHttpGetTransactionInfoSuccess = (data) => ({
  type: BitcoinActionsConstants.BITCOIN_HTTP_GET_TX_INFO_SUCCESS,
  data,
})

export const bitcoinHttpGetTransactionInfoFailure = (error) => ({
  type: BitcoinActionsConstants.BITCOIN_HTTP_GET_TX_INFO_FAILURE,
  error,
})

export const bitcoinHttpGetTransactionList = () => ({
  type: BitcoinActionsConstants.BITCOIN_HTTP_GET_TX_LIST,
})

export const bitcoinHttpGetTransactionListSuccess = (data) => ({
  type: BitcoinActionsConstants.BITCOIN_HTTP_GET_TX_LIST_SUCCESS,
  data,
})

export const bitcoinHttpGetTransactionListFailure = (error) => ({
  type: BitcoinActionsConstants.BITCOIN_HTTP_GET_TX_LIST_FAILURE,
  error,
})

export const bitcoinHttpGetAddressInfo = () => ({
  type: BitcoinActionsConstants.BITCOIN_HTTP_GET_ADDRESS_INFO,
})

export const bitcoinHttpGetAddressInfoSuccess = (data, host) => ({
  type: BitcoinActionsConstants.BITCOIN_HTTP_GET_ADDRESS_INFO_SUCCESS,
  data,
  host,
})

export const bitcoinHttpGetAddressInfoFailure = (error) => ({
  type: BitcoinActionsConstants.BITCOIN_HTTP_GET_ADDRESS_INFO_FAILURE,
  error,
})

export const bitcoinHttpPostSendTx = () => ({
  type: BitcoinActionsConstants.BITCOIN_HTTP_POST_SEND_TX,
})

export const bitcoinHttpPostSendTxSuccess = (data) => ({
  type: BitcoinActionsConstants.BITCOIN_HTTP_POST_SEND_TX_SUCCESS,
  data,
})

export const bitcoinHttpPostSendTxFailure = (error) => ({
  type: BitcoinActionsConstants.BITCOIN_HTTP_POST_SEND_TX_FAILURE,
  error,
})

export const bitcoinSignTx = () => ({
  type: BitcoinActionsConstants.BITCOIN_SIGN_TX,
})

export const bitcoinSignTxSuccess = (data) => ({
  type: BitcoinActionsConstants.BITCOIN_SIGN_TX_SUCCESS,
  data,
})

export const bitcoinSignTxFailure = (error) => ({
  type: BitcoinActionsConstants.BITCOIN_SIGN_TX_FAILURE,
  error,
})

export const bitcoinShowSignTxConfirmationModalDialog = () => ({
  type: BitcoinActionsConstants.BITCOIN_SHOW_SIGN_TX_CONFIRMATION_MODAL_DIALOG,
})

export const bitcoinCloseSignTxConfirmationModalDialog = () => ({
  type: BitcoinActionsConstants.BITCOIN_CLOSE_SIGN_TX_CONFIRMATION_MODAL_DIALOG,
})
