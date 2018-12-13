/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { getAvailableNetworkCount } from '@chronobank/network/redux/selectors'
import * as Actions from './actions'

export const init = () => (dispatch, getState) =>  {
  const state = getState()
  const networksCount = getAvailableNetworkCount(state)
  const newState = new Array(networksCount)
  const initialNetworkState = {
    isConnected: false,
    isConnecting: false,
    isSyncing: null,
    tokens: {
      list: [],
    },
    contracts: {
      list: [],
    },
  }
  newState.fill(initialNetworkState)

  dispatch(Actions.init(newState))
}

export const connect = (networkIndex) => (dispatch) =>
  dispatch(Actions.middlewareConnect(networkIndex))

export const disconnect = (networkIndex) => (dispatch) =>
  dispatch(Actions.middlewareDisconnect(networkIndex))

export const subscribe = (networkIndex, channel, onMessageThunk) => (dispatch) =>
  dispatch(Actions.middlewareSubscribe(networkIndex, channel, onMessageThunk))

export const unsubscribe = (networkIndex, channel) => (dispatch) =>
  dispatch(Actions.middlewareUnsubscribe(networkIndex, channel))

export const reconnect = (/*isConnecting*/) => (/*dispatch, getState*/) => {
  // const state = getState()
  // const isConnectingState = selectWeb3ListenerReconnectingStatus(state)
  // if (!isConnectingState) {
  //   dispatch(Actions.middlewareReconnect(isConnecting))
  // }
}
