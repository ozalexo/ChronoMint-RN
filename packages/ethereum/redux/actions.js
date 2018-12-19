/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionsTypes from './constants'

export const ethereumCreateWallet = (address, encrypted) => ({
  type: ActionsTypes.ETHEREUM_CREATE_WALLET,
  address,
  encrypted,
})

export const ethereumCreateDerivedWallet = (masterWalletAddress, address) => ({
  type: ActionsTypes.ETHEREUM_CREATE_DERIVED_WALLET,
  masterWalletAddress,
  address,
})

export const ethereumUpdateBalance = ({ tokenSymbol, address, balance, amount }) => ({
  type: ActionsTypes.ETHEREUM_UPDATE_BALANCE,
  address,
  amount,
  balance,
  tokenSymbol,
})

export const selectEthereumWallet = ({ address }) => ({
  type: ActionsTypes.ETHEREUM_SELECT_WALLET,
  address,
})
