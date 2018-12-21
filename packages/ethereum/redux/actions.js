/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'

export const ethereumCreateWallet = (address, encrypted, path) => ({
  type: ActionTypes.ETHEREUM_CREATE_WALLET,
  address,
  encrypted,
  path,
})

export const ethereumCreateDerivedWallet = (masterWalletAddress, address) => ({
  type: ActionTypes.ETHEREUM_CREATE_DERIVED_WALLET,
  masterWalletAddress,
  address,
})

export const ethereumUpdateBalance = ({ tokenSymbol, address, balance, amount }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_BALANCE,
  address,
  amount,
  balance,
  tokenSymbol,
})

export const ethereumSelectWallet = ({ address }) => ({
  type: ActionTypes.ETHEREUM_SELECT_WALLET,
  address,
})

export const ethereumCreateTxDraft = ({ address, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_CREATE_TX_DRAFT,
  address,
  masterWalletAddress,
})

export const ethereumDeleteTxDraft = ({ masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_DELETE_TX_DRAFT,
  masterWalletAddress,
})

export const ethereumUpdateTxDraftNonce = ({ nonce, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_DRAFT_NONCE,
  nonce,
  masterWalletAddress,
})

export const ethereumUpdateTxDraftGasLimit = ({ gasLimit, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_DRAFT_GAS_LIMIT,
  gasLimit,
  masterWalletAddress,
})

export const ethereumUpdateTxDraftGasPrice = ({ gasPrice, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_DRAFT_GAS_PRICE,
  gasPrice,
  masterWalletAddress,
})

export const ethereumUpdateTxDraftChainId = ({ chainId, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_DRAFT_CHAIN_ID,
  chainId,
  masterWalletAddress,
})

export const ethereumUpdateTxDraftTo = ({ to, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_DRAFT_TO,
  to,
  masterWalletAddress,
})

export const ethereumUpdateTxDraftValue = ({ value, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_DRAFT_VALUE,
  value,
  masterWalletAddress,
})

export const ethereumUpdateTxDraftData = ({ data, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_DRAFT_DATA,
  data,
  masterWalletAddress,
})

export const ethereumUpdateTxDraftUnsignedTx = ({ unsignedTx, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_UNSIGNED_TX,
  unsignedTx,
  masterWalletAddress,
})

export const ethereumUpdateTxDraftSignedTx = ({ signedTx, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_SIGNED_TX,
  signedTx,
  masterWalletAddress,
})
