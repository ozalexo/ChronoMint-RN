/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'
import * as MwActionTypes from '../middlewares/rabbitmq/constants'

export const networkSelect = (networkIndex) => ({
  type: ActionTypes.NETWORK_SELECT,
  networkIndex,
})

export const rmqConnect = () => ({
  type: MwActionTypes.RMQ_CONNECT,
})

export const rmqDisconnect = () => ({
  type: MwActionTypes.RMQ_DISCONNECT,
})

export const rmqSubscribe = (channel, handler) => ({
  type: MwActionTypes.RMQ_SUBSCRIBE,
  channel,
  handler,
})

export const rmqUnsubscribe = (channel) => ({
  type: MwActionTypes.RMQ_UNSUBSCRIBE,
  channel,
})
