/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionsTypes from './constants'

export const mwRmqConnect = ({ isConnected, error }) => ({
  type: ActionsTypes.RMQ_CONNECT,
  isConnected,
  error,
})

export const mwRmqDisconnect = ({ code, reason }) => ({
  type: ActionsTypes.RMQ_DISCONNECT,
  code,
  reason,
})

export const mwRmqSubscribe = ({ channel, handler }) => ({
  type: ActionsTypes.RMQ_SUBSCRIBE,
  channel,
  handler,
})

export const mwRmqUnsubscribe = ({ channel }) => ({
  type: ActionsTypes.RMQ_UNSUBSCRIBE,
  channel,
})

export const mwRmqUnsubscribeAll = () => ({
  type: ActionsTypes.RMQ_UNSUBSCRIBE_ALL,
})

export const mwRmqResubscribed = () => ({
  type: ActionsTypes.RMQ_RESUBSCRIBED,
})
