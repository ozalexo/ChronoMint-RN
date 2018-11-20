/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { USER_ACTIONS } from './constants'
import { initialState } from './initialState'

const mutations = {
  [USER_ACTIONS.LOGIN]: (state, { currentWallet }) => {
    return {
      ...state,
      session: {
        currentWallet,
      },
    }
  },
  [USER_ACTIONS.LOGOUT]: (state) => {
    return {
      ...state,
      session: {
        currentWallet: '',
      },
    }
  },
}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
