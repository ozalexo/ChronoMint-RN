/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'

export const connect = () => ({
  type: ActionTypes.WEB3_MIDDLEWARE_CONNECT,
})

export const connectSuccess = () => ({
  type: ActionTypes.WEB3_MIDDLEWARE_CONNECT_SUCCESS,
})

export const connectFailure = (error) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_CONNECT_FAILURE,
  error,
})

export const disconnect = () => ({
  type: ActionTypes.WEB3_MIDDLEWARE_DISCONNECT,
})

export const incompatibleNetwork = () => ({
  type: ActionTypes.WEB3_MIDDLEWARE_INCOMPATIBLE_NETWORK,
})

export const subscribe = (channel, onMessageThunk) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_SUBSCRIBE,
  channel,
  onMessageThunk,
})

export const subscribeSuccess = (channel) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_SUBSCRIBE_SUCCESS,
  channel,
})

export const subscribeFailure = (error) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_SUBSCRIBE_FAILURE,
  error,
})

export const unsubscribe = (channel) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_UNSUBSCRIBE,
  channel,
})

export const appendContract = (contractName) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_APPEND_CONTRACT,
  contractName,
})

export const reset = () => ({
  type: ActionTypes.WEB3_MIDDLEWARE_RESET,
})
