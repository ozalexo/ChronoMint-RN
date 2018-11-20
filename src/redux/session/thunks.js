/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { login, logout } from './actions'

export const Login = (currentWallet) => async (dispatch) => {
  try {
    dispatch(login(currentWallet))
  } catch (e) {
    console.error('login error:', e.message)
  }
}

export const Logout = () => async (dispatch) => {
  try {
    dispatch(logout())
  } catch (e) {
    console.error('logout error:', e.message)
  }
}
