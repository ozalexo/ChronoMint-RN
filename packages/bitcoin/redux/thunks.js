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

export const createBitcoinWallet = (privateKey, ethAddress, network) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      const bitcoinAddress = getAddress(privateKey, network)
      dispatch(bitcoinCreateWallet(ethAddress, bitcoinAddress))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const selectBitcoinWallet = ({ address }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinSelectWallet(address))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const createBitcoinTxDraft = ({ address, parentAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinCreateTxDraft({ address, parentAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const dropBitcoinSelectedWallet = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinDropSelectedWallet())
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const deleteBitcoinTxDraft = ({ address, parentAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinDeleteTxDraft({ address, parentAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinBalance = ({ address, parentAddress, balance, amount }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinUpdateBalance({ address, parentAddress, balance, amount }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}
