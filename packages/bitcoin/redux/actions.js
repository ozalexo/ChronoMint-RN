/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionsTypes from './constants'

export const bitcoinTxUpdate = (entry) => ({
  type: ActionsTypes.BITCOIN_TX_UPDATE,
  key: entry.key,
  address: entry.tx.from,
  entry,
})

export const bitcoinTxDraftUpdateRecipient = ({ address, masterWalletAddress, recipient }) => ({
  type: ActionsTypes.BITCOIN_TX_UPDATE_RECIPIENT,
  recipient,
  address,
  masterWalletAddress,
})

export const bitcoinTxDraftUpdateAmount = ({ address, masterWalletAddress, amount }) => ({
  type: ActionsTypes.BITCOIN_TX_UPDATE_AMOUNT,
  amount,
  address,
  masterWalletAddress,
})

export const bitcoinTxDraftUpdateToken = ({ address, masterWalletAddress, token }) => ({
  type: ActionsTypes.BITCOIN_TX_UPDATE_TOKEN,
  token,
  address,
  masterWalletAddress,
})

export const bitcoinTxDraftUpdateFee = ({ address, masterWalletAddress, fee }) => ({
  type: ActionsTypes.BITCOIN_TX_UPDATE_FEE,
  fee,
  address,
  masterWalletAddress,
})

export const bitcoinTxUpdateHistory = ({ address, masterWalletAddress, latestTxDate, txList }) => ({
  type: ActionsTypes.BITCOIN_TX_UPDATE_HISTORY,
  latestTxDate,
  txList,
  address,
  masterWalletAddress,
})

export const bitcoinTxDraftUpdateFeeMultiplier = ({ address, masterWalletAddress, feeMultiplier }) => ({
  type: ActionsTypes.BITCOIN_TX_UPDATE_FEE_MULTIPLIER,
  feeMultiplier,
  address,
  masterWalletAddress,
})

export const bitcoinTxDraftUpdateUnsignedTx = ({ address, masterWalletAddress, unsignedTx }) => ({
  type: ActionsTypes.BITCOIN_TX_UPDATE_UNSIGNED_TX,
  unsignedTx,
  address,
  masterWalletAddress,
})

export const bitcoinTxDraftUpdateSignedTx = ({ address, masterWalletAddress, signedTx }) => ({
  type: ActionsTypes.BITCOIN_TX_UPDATE_SIGNED_TX,
  signedTx,
  address,
  masterWalletAddress,
})

export const bitcoinCreateTxDraft = ({ address, masterWalletAddress }) => ({
  type: ActionsTypes.BITCOIN_CREATE_TX_DRAFT,
  address,
  masterWalletAddress,
})

export const bitcoinDeleteTxDraft = ({ address, masterWalletAddress }) => ({
  type: ActionsTypes.BITCOIN_DELETE_TX_DRAFT,
  address,
  masterWalletAddress,
})

export const bitcoinDropSelectedWallet = () => ({
  type: ActionsTypes.BITCOIN_DROP_SELECTED_WALLET,
})

export const bitcoinSelectWallet = (address) => ({
  type: ActionsTypes.BITCOIN_SELECT_WALLET,
  address,
})

export const bitcoinTxAccept = (entry) => ({
  type: ActionsTypes.BITCOIN_TX_ACCEPT,
  entry,
  isAccepted: true,
  isPending: true,
})

export const bitcoinCreateWallet = (masterWalletAddress, address) => ({
  type: ActionsTypes.BITCOIN_CREATE_WALLET,
  masterWalletAddress,
  address,
})

export const bitcoinUpdateBalance = ({ address, masterWalletAddress, balance, amount }) => ({
  type: ActionsTypes.BITCOIN_UPDATE_BALANCE,
  address,
  masterWalletAddress,
  balance,
  amount,
})

export const bitcoinHttpGetBlocksHeight = () => ({
  type: ActionsTypes.BITCOIN_HTTP_GET_BLOCKS_HEIGHT,
})

export const bitcoinHttpGetBlocksHeightSuccess = (data) => ({
  type: ActionsTypes.BITCOIN_HTTP_GET_BLOCKS_HEIGHT_SUCCESS,
  data,
})

export const bitcoinHttpGetBlocksHeightFailure = (error) => ({
  type: ActionsTypes.BITCOIN_HTTP_GET_BLOCKS_HEIGHT_FAILURE,
  error,
})

export const bitcoinHttpGetTransactionInfo = () => ({
  type: ActionsTypes.BITCOIN_HTTP_GET_TX_INFO,
})

export const bitcoinHttpGetTransactionInfoSuccess = (data) => ({
  type: ActionsTypes.BITCOIN_HTTP_GET_TX_INFO_SUCCESS,
  data,
})

export const bitcoinHttpGetTransactionInfoFailure = (error) => ({
  type: ActionsTypes.BITCOIN_HTTP_GET_TX_INFO_FAILURE,
  error,
})

export const bitcoinHttpGetTransactionList = () => ({
  type: ActionsTypes.BITCOIN_HTTP_GET_TX_LIST,
})

export const bitcoinHttpGetTransactionListSuccess = (data) => ({
  type: ActionsTypes.BITCOIN_HTTP_GET_TX_LIST_SUCCESS,
  data,
})

export const bitcoinHttpGetTransactionListFailure = (error) => ({
  type: ActionsTypes.BITCOIN_HTTP_GET_TX_LIST_FAILURE,
  error,
})

export const bitcoinHttpGetAddressInfo = () => ({
  type: ActionsTypes.BITCOIN_HTTP_GET_ADDRESS_INFO,
})

export const bitcoinHttpGetAddressInfoSuccess = (data, host) => ({
  type: ActionsTypes.BITCOIN_HTTP_GET_ADDRESS_INFO_SUCCESS,
  data,
  host,
})

export const bitcoinHttpGetAddressInfoFailure = (error) => ({
  type: ActionsTypes.BITCOIN_HTTP_GET_ADDRESS_INFO_FAILURE,
  error,
})

export const bitcoinHttpPostSendTx = () => ({
  type: ActionsTypes.BITCOIN_HTTP_POST_SEND_TX,
})

export const bitcoinHttpPostSendTxSuccess = (data) => ({
  type: ActionsTypes.BITCOIN_HTTP_POST_SEND_TX_SUCCESS,
  data,
})

export const bitcoinHttpPostSendTxFailure = (error) => ({
  type: ActionsTypes.BITCOIN_HTTP_POST_SEND_TX_FAILURE,
  error,
})

export const bitcoinSignTx = () => ({
  type: ActionsTypes.BITCOIN_SIGN_TX,
})

export const bitcoinSignTxSuccess = (data) => ({
  type: ActionsTypes.BITCOIN_SIGN_TX_SUCCESS,
  data,
})

export const bitcoinSignTxFailure = (error) => ({
  type: ActionsTypes.BITCOIN_SIGN_TX_FAILURE,
  error,
})

export const bitcoinShowSignTxConfirmationModalDialog = () => ({
  type: ActionsTypes.BITCOIN_SHOW_SIGN_TX_CONFIRMATION_MODAL_DIALOG,
})

export const bitcoinCloseSignTxConfirmationModalDialog = () => ({
  type: ActionsTypes.BITCOIN_CLOSE_SIGN_TX_CONFIRMATION_MODAL_DIALOG,
})
