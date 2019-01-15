/**
* Copyright 2017–2018, LaborX PTY
* Licensed under the AGPL Version 3 license.
*/

import { createSelector } from 'reselect'
import { DUCK_RMQ_MIDDLEWARE } from './constants'

export const getDuckRmqMiddleware = (state) =>
  state[DUCK_RMQ_MIDDLEWARE]

export const getRmqSubscriptions = createSelector(
  getDuckRmqMiddleware,
  (duckRmqMiddleware) => duckRmqMiddleware.subscriptions
)

export const getRmqConnectionStatus = createSelector(
  getDuckRmqMiddleware,
  (duckRmqMiddleware) => duckRmqMiddleware.isConnected
)
