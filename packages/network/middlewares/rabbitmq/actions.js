/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionsTypes from './constants'

export const mwRmqConnect = () => ({
  type: ActionsTypes.MW_RMQ_CONNECT,
})

export const rmqConnectSuccess = () => ({
  type: ActionsTypes.RMQ_CONNECT_SUCCESS,
  isConnected: true,
  error: null,
})

export const rmqConnectFailure = ({ error }) => ({
  type: ActionsTypes.RMQ_CONNECT_FAILURE,
  isConnected: false,
  error,
})

export const mwRmqDisconnect = () => ({
  type: ActionsTypes.MW_RMQ_DISCONNECT,
})

export const rmqDisconnectSuccess = () => ({
  type: ActionsTypes.RMQ_DISCONNECT_SUCCESS,
})

export const rmqDisconnectFailure = ({ error }) => ({
  type: ActionsTypes.RMQ_DISCONNECT_FAILURE,
  error,
})

export const mwRmqSubscribe = ({ channel, handler }) => ({
  type: ActionsTypes.MW_RMQ_SUBSCRIBE,
  channel,
  handler,
})

export const rmqSubscribeSuccess = ({ channel }) => ({
  type: ActionsTypes.RMQ_SUBSCRIBE_SUCCESS,
  channel,
})

export const rmqSubscribeFailure = ({ channel, error }) => ({
  type: ActionsTypes.RMQ_SUBSCRIBE_FAILURE,
  error: {
    channel,
    error,
  },
})

export const mwRmqUnsubscribe = ({ channel }) => ({
  type: ActionsTypes.MW_RMQ_UNSUBSCRIBE,
  channel,
})

export const rmqUnsubscribeSuccess = () => ({
  type: ActionsTypes.RMQ_UNSUBSCRIBE_SUCCESS,
})

export const rmqUnsubscribeFailure = ({ channel, error }) => ({
  type: ActionsTypes.RMQ_UNSUBSCRIBE_FAILURE,
  channel,
  error,
})
