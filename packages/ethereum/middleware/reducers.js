/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'
import { NETWORK_SELECT } from '@chronobank/network/redux/constants'
import initialState from './initialState'

const infoReducer = (state) => state

const appendContract = (state, payload) => {
  return {
    ...state,
    contracts: {
      ...state.contracts,
      list: [...state.contracts.list, payload.contractName],
    },
  }
}

const connectSuccess = (state) => ({
  ...state,
  isConnecting: false,
  isConnected: true,
})

const connectFailure = (state) => ({
  ...state,
  isConnecting: false,
  isConnected: false,
})

const connect = (state, payload) => ({
  ...state,
  isConnecting: payload.isConnecting,
})

const reset = () => {
  return initialState
}

export const mutations = {

  [ActionTypes.WEB3_MIDDLEWARE_APPEND_CONTRACT]: appendContract,
  [ActionTypes.WEB3_MIDDLEWARE_RESET]: reset,
  [ActionTypes.WEB3_MIDDLEWARE_CONNECT]: connect,
  [ActionTypes.WEB3_MIDDLEWARE_CONNECT_SUCCESS]: connectSuccess,
  [ActionTypes.WEB3_MIDDLEWARE_CONNECT_FAILURE]: connectFailure,
  [ActionTypes.WEB3_MIDDLEWARE_INCOMPATIBLE_NETWORK]: infoReducer,
  [NETWORK_SELECT]: connect,

}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
