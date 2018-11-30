/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import initialState from './initialState'
import * as ActionTypes from './constants'

const connect = (state, action) => {
  return {
    ...state,
    isConnected: action.isConnected,
    error: action.error,
  }
}

const disconnect = (state, action) => {
  console.log('DISCONNECT ACTION:', action)
  return {
    ...state,
    isConnected: false,
    error: {
      // code: action.code,
      // reason: action.reason,
    },
  }
}

const subscribe = (state, action) => {
  return {
    ...state,
    subscriptions: {
      ...state.subscriptions,
      [action.channel]: action.channel,
    },
  }
}

const unsubscribe = (state, action) => {

}

// This is info reducer to display log in Redux logger
const resubscribed = (state) => state

const mutations = {
  // [ActionTypes.NETWORK_SELECT]: connect,
  [ActionTypes.RMQ_CONNECT]: connect,
  [ActionTypes.RMQ_DISCONNECT]: disconnect,
  [ActionTypes.RMQ_RESUBSCRIBED]: resubscribed,
  [ActionTypes.RMQ_SUBSCRIBE]: subscribe,
  [ActionTypes.RMQ_UNSUBSCRIBE]: unsubscribe,
}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
