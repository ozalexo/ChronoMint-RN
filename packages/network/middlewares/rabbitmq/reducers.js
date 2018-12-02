/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import initialState from './initialState'
import * as ActionTypes from './constants'

const connectSuccess = (state) => {
  return {
    ...state,
    isConnected: true,
    error: null,
  }
}

const connectFailure = (state, action) => {
  return {
    ...state,
    isConnected: false,
    error: action.error,
  }
}

const subscribeSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    subscriptions: {
      ...state.subscriptions,
      [action.channel]: true,
    },
  }
}

const subscribeFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  }
}

const unsubscribeSuccess = (state, action) => {
  const {
    // eslint-disable-next-line no-unused-vars
    [action.channel]: unsubscribedChannel,
    otherChannels,
  } = state.subscriptions

  return {
    ...state,
    error: null,
    subscriptions: otherChannels,
  }
}

const unsubscribeFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  }
}

const disconnectSuccess = (state) => {
  return {
    ...state,
    error: null,
    subscriptions: null,
    isConnected: false,
  }
}

const disconnectFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
    subscriptions: null,
    isConnected: false,
  }
}

// This is info reducer to display log in Redux logger
// const resubscribed = (state) => state

const mutations = {
  [ActionTypes.RMQ_CONNECT_SUCCESS]: connectSuccess,
  [ActionTypes.RMQ_CONNECT_FAILURE]: connectFailure,
  [ActionTypes.RMQ_DISCONNECT_SUCCESS]: disconnectSuccess,
  [ActionTypes.RMQ_DISCONNECT_FAILURE]: disconnectFailure,
  [ActionTypes.RMQ_SUBSCRIBE_SUCCESS]: subscribeSuccess,
  [ActionTypes.RMQ_SUBSCRIBE_FAILURE]: subscribeFailure,
  [ActionTypes.RMQ_UNSUBSCRIBE_SUCCESS]: unsubscribeSuccess,
  [ActionTypes.RMQ_UNSUBSCRIBE_FAILURE]: unsubscribeFailure,
}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
