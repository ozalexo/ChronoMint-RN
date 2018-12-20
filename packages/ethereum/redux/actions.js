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

export const createEthereumTxDraft = ({ address, masterWalletAddress }) => ({
  type: ActionTypes.ETHEREUM_CREATE_TX_DRAFT,
  address,
  masterWalletAddress,
})
