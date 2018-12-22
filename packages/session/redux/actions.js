/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'

export const login = (masterWalletAddress) => {
  return {
    type: ActionTypes.SESSION_LOGIN,
    masterWalletAddress,
  }
}

export const logout = () => {
  return {
    type: ActionTypes.SESSION_LOGOUT,
  }
}
