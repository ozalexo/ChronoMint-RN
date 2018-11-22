/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { login, logout, savePrivateKey } from './actions'

export const loginThunk = (privateKey, currentWallet) => (dispatch) => {
  try {
    dispatch(savePrivateKey(privateKey))
    dispatch(login(currentWallet))
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
