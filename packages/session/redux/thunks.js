/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { login, logout } from './actions'
import { createBitcoinWallet } from '@chronobank/bitcoin/redux/thunks'

export const loginThunk = (ethAddress, privateKey) => (dispatch) => {
  try {
    dispatch(createBitcoinWallet(privateKey, ethAddress))
      .then(dispatch(login(ethAddress)))
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
