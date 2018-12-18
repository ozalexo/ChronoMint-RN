/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'
import { NETWORK_SELECT } from '@chronobank/network/redux/constants'
import initialState from './initialState'

const infoReducer = (state) => state

const appendContract = (state, { networkIndex, contractName }) => {
  return state.map((netState, index) =>
    index === networkIndex
      ? {
        ...netState,
        contracts: {
          list: [...netState.contracts.list, contractName],
        },
      }
      : netState
  )
}

const connectSuccess = (state, { networkIndex }) => {
  return state.map((netState, index) =>
    index === networkIndex
      ? {
        ...netState,
        isConnecting: false,
        isConnected: true,
      }
      : netState
  )
}

const connectFailure = (state, { networkIndex }) => {
  return state.map((netState, index) =>
    index === networkIndex
      ? {
        ...netState,
        isConnecting: false,
        isConnected: false,
      }
      : netState
  )
}

const connect = (state, { networkIndex, isConnecting }) => {
  return state.map((netState, index) =>
    index === networkIndex
      ? {
        ...netState,
        isConnecting: isConnecting,
      }
      : netState
  )
}

const reset = () => {
  return initialState
}

const web3MiddlewareInit = (state, { networksInitialState }) => [...networksInitialState]

export const mutations = {

  [ActionTypes.WEB3_MIDDLEWARE_APPEND_CONTRACT]: appendContract,
  [ActionTypes.WEB3_MIDDLEWARE_RESET]: reset,
  [ActionTypes.WEB3_MIDDLEWARE_CONNECT]: connect,
  [ActionTypes.WEB3_MIDDLEWARE_CONNECT_SUCCESS]: connectSuccess,
  [ActionTypes.WEB3_MIDDLEWARE_CONNECT_FAILURE]: connectFailure,
  [ActionTypes.WEB3_MIDDLEWARE_INCOMPATIBLE_NETWORK]: infoReducer,
  [ActionTypes.WEB3_MIDDLEWARE_INIT]: web3MiddlewareInit,
  [NETWORK_SELECT]: connect,

}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
