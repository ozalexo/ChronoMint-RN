/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'
import initialState from './initialState'

const mutations = {
  [ActionTypes.SESSION_LOGIN]: (state, { currentWallet }) => {
    return {
      ...state,
      currentWallet,
    }
  },
  [ActionTypes.SESSION_SAVE_KEY]: (state, { privateKey }) => {
    return {
      ...state,
      privateKey,
    }
  },
  [ActionTypes.SESSION_LOGOUT]: (state) => {
    return {
      ...state,
      currentWallet: null,
    }
  },
}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
