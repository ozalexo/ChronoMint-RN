/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createBitcoinWallet } from '@chronobank/bitcoin/redux/thunks'
import { login, logout, savePrivateKey } from './actions'

export const loginThunk = (ethAddress, privateKey) => (dispatch) => {
  try {
    dispatch(createBitcoinWallet(privateKey, ethAddress))
      .then(() => {
        dispatch(login(ethAddress))
        dispatch(savePrivateKey(privateKey))
      })
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}

export const logoutThunk = () => (dispatch) => {
  try {
    return dispatch(logout())
  } catch (e) {
    return Promise.reject(e)
  }
}
