/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { USER_ACTIONS } from './constants'

export const login = (currentWallet) => {
  return {
    type: USER_ACTIONS.LOGIN,
    currentWallet,
  }
}

export const logout = () => {
  return {
    type: USER_ACTIONS.LOGOUT,
    currentWallet: '',
  }
}
