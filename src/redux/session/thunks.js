/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { login, logout } from './actions'

export const loginThunk = (currentWallet) => (dispatch) => {
  try {
    return dispatch(login(currentWallet))
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
