/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as Actions from './actions'
// import { selectWeb3ListenerReconnectingStatus } from '../../nodes/selectors'

export const connect = () => (dispatch) =>
  dispatch(Actions.middlewareConnect())

export const disconnect = () => (dispatch) =>
  dispatch(Actions.middlewareDisconnect())

export const subscribe = (channel, onMessageThunk) => (dispatch) =>
  dispatch(Actions.middlewareSubscribe(channel, onMessageThunk))

export const unsubscribe = (channel) => (dispatch) =>
  dispatch(Actions.middlewareUnsubscribe(channel))

export const reconnect = (/*isConnecting*/) => (/*dispatch, getState*/) => {
  // const state = getState()
  // const isConnectingState = selectWeb3ListenerReconnectingStatus(state)
  // if (!isConnectingState) {
  //   dispatch(Actions.middlewareReconnect(isConnecting))
  // }
}
