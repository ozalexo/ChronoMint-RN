/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'
import initialState from './initialState'
// import * as Actions from './actions'

const infoReducer = (state) => state

const web3ListenerAppendContract = (state, payload) => {
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

const web3ListenerReset = () => {
  return initialState
}

export const mutations = {

  [ActionTypes.WEB3_LISTENER_APPEND_CONTRACT]: web3ListenerAppendContract,
  [ActionTypes.WEB3_LISTENER_RESET]: web3ListenerReset,
  [ActionTypes.WEB3_LISTENER_RECONNECT]: connect,
  [ActionTypes.WEB3_LISTENER_RECONNECT_SUCCESS]: connectSuccess,
  [ActionTypes.WEB3_LISTENER_RECONNECT_FAILURE]: connectFailure,
  [ActionTypes.WEB3_LISTENER_CONNECT]: connect,
  [ActionTypes.WEB3_LISTENER_CONNECT_SUCCESS]: connectSuccess,
  [ActionTypes.WEB3_LISTENER_CONNECT_FAILURE]: connectFailure,
  [ActionTypes.WEB3_LISTENER_INCOMPATIBLE_NETWORK]: infoReducer,

}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
