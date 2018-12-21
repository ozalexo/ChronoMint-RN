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

export const selectEthereumWallet = ({ address }) => ({
  type: ActionTypes.ETHEREUM_SELECT_WALLET,
  address,
})

export const dropEthereumSelectedWallet = () => ({
  type: ActionTypes.ETHEREUM_DROP_SELECTED_WALLET,
})

export const createEthereumTxDraft = ({ address, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_CREATE_TX_DRAFT,
  address,
  masterWalletAddress,
})

export const deleteEthereumTxDraft = ({ masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_DELETE_TX_DRAFT,
  masterWalletAddress,
})

export const updateEthereumTxDraftNonce = ({ nonce, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_DRAFT_NONCE,
  nonce,
  masterWalletAddress,
})

export const updateEthereumTxDraftGasLimit = ({ gasLimit, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_DRAFT_GAS_LIMIT,
  gasLimit,
  masterWalletAddress,
})

export const updateEthereumTxDraftGasPrice = ({ gasPrice, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_DRAFT_GAS_PRICE,
  gasPrice,
  masterWalletAddress,
})

export const updateEthereumTxDraftChainId = ({ chainId, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_DRAFT_CHAIN_ID,
  chainId,
  masterWalletAddress,
})

export const updateEthereumTxDraftTo = ({ to, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_DRAFT_TO,
  to,
  masterWalletAddress,
})

export const updateEthereumTxDraftValue = ({ value, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_DRAFT_VALUE,
  value,
  masterWalletAddress,
})

export const updateEthereumTxDraftData = ({ data, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_DRAFT_DATA,
  data,
  masterWalletAddress,
})

export const updateEthereumTxDraftSignedTx = ({ signedTx, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_UPDATE_TX_DRAFT_SIGNED_TX,
  signedTx,
  masterWalletAddress,
})
