/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as MiddlewareActionTypes from './constants'

export const middlewareConnect = () => ({
  type: MiddlewareActionTypes.WEB3_LISTENER_CONNECT,
})

export const middlewareConnectSuccess = () => ({
  type: MiddlewareActionTypes.WEB3_LISTENER_CONNECT_SUCCESS,
})

export const middlewareConnectFailure = (error) => ({
  type: MiddlewareActionTypes.WEB3_LISTENER_CONNECT_FAILURE,
  error,
})

export const middlewareDisconnect = () => ({
  type: MiddlewareActionTypes.WEB3_LISTENER_DISCONNECT,
})

export const middlewareReconnect = (isConnecting = true) => ({
  type: MiddlewareActionTypes.WEB3_LISTENER_RECONNECT,
  isConnecting,
})

export const middlewareReconnectSuccess = () => ({
  type: MiddlewareActionTypes.WEB3_LISTENER_RECONNECT_SUCCESS,
})

export const middlewareReconnectFailure = (error) => ({
  type: MiddlewareActionTypes.WEB3_LISTENER_RECONNECT_FAILURE,
  error,
})

export const middlewareIncompatibleNetwork = () => ({
  type: MiddlewareActionTypes.WEB3_LISTENER_INCOMPATIBLE_NETWORK,
})

export const middlewareSubscribe = (channel, onMessageThunk) => ({
  type: MiddlewareActionTypes.WEB3_LISTENER_SUBSCRIBE,
  channel,
  onMessageThunk,
})

export const middlewareSubscribeSuccess = (channel) => ({
  type: MiddlewareActionTypes.WEB3_LISTENER_SUBSCRIBE_SUCCESS,
  channel,
})

export const middlewareSubscribeFailure = (error) => ({
  type: MiddlewareActionTypes.WEB3_LISTENER_SUBSCRIBE_FAILURE,
  error,
})

export const middlewareUnsubscribe = (channel) => ({
  type: MiddlewareActionTypes.WEB3_LISTENER_UNSUBSCRIBE,
  channel,
})

export const appendContract = (contractName) => ({
  type: MiddlewareActionTypes.WEB3_LISTENER_APPEND_CONTRACT,
  contractName,
})

export const web3Reset = () => ({
  type: MiddlewareActionTypes.WEB3_LISTENER_RESET,
})
