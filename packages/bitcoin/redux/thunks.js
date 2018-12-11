/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { getAddress } from '../utils'
import {
  bitcoinCreateWallet,
  bitcoinUpdateBalance,
  bitcoinSelectWallet,
  bitcoinCreateTxDraft,
  bitcoinDropSelectedWallet,
  bitcoinDeleteTxDraft,
} from './actions'

export const createBitcoinWallet = (privateKey, ethAddress) => (dispatch) => {
  try {
    const bitcoinAddress = getAddress(privateKey)
    dispatch(bitcoinCreateWallet(ethAddress, bitcoinAddress))
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}

export const selectBitcoinWallet = ({ address, parentAddress }) => (dispatch) => {
  try {
    dispatch(bitcoinSelectWallet(address))
    dispatch(bitcoinCreateTxDraft({ address, parentAddress }))
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}

export const dropSelectedWallet = ({ address, parentAddress }) => (dispatch) => {
  try {
    dispatch(bitcoinDropSelectedWallet())
    dispatch(bitcoinDeleteTxDraft({ address, parentAddress }))
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}

export const updateBitcoinWalletBalance = ({ address, parentAddress, balance, amount }) => (dispatch) => {
  try {
    dispatch(bitcoinUpdateBalance({ address, parentAddress, balance, amount }))
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}
