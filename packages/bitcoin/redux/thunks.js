/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { getAddress } from '../utils'
import { bitcoinCreateWallet, bitcoinUpdateBalance } from './actions'

export const createBitcoinWallet = (privateKey, ethAddress) => (dispatch) => {
  try {
    const bitcoinAddress = getAddress(privateKey)
    dispatch(bitcoinCreateWallet(ethAddress, bitcoinAddress))
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}

export const updateBitcoinWalletBalance = ({parentAddress, address, balance, amount}) => (dispatch) => {
  try {
    dispatch(bitcoinUpdateBalance({parentAddress, address, balance, amount}))
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}
