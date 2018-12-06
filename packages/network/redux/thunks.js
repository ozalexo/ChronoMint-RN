/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as Actions from './actions'
import * as RmqMiddlewareActions from '../middlewares/rabbitmq/actions'
import * as Selectors from './selectors'

export const networkSelect = (networkIndex) => (dispatch, getState) => {
  const state = getState()
  const availableNetworks = Selectors.getAvailableNetworks(state)

  const isNetworkIndexInvalid = (0 > networkIndex || networkIndex > availableNetworks.length)
  if (isNetworkIndexInvalid) {
    return
  }

  const currentNetwork = Selectors.getCurrentNetwork(state)
  const isAlreadySelected = currentNetwork && currentNetwork.networkIndex === networkIndex
  if (isAlreadySelected) {
    return
  }

  dispatch(Actions.networkSelect(networkIndex))
}

export const autoSelectNetwork = () => (dispatch, getState) => {
  const state = getState()
  const networks = Selectors.getDuckNetwork(state)
  let networkIndex = null
  if (networks.selected === null) {
    if (process.env['NODE_ENV'] === 'development') {
      networkIndex = 3
    } else {
      networkIndex = 1
    }
    dispatch(Actions.networkSelect(networkIndex))
  }
}

export const rmqConnect = () => (dispatch) => {
  return dispatch(RmqMiddlewareActions.mwRmqConnect())
}

export const rmqDisconnect = () => (dispatch) => {
  return dispatch(RmqMiddlewareActions.mwRmqDisconnect())
}

export const rmqSubscribe = ({ channel, handler }) => (dispatch) => {
  return dispatch(RmqMiddlewareActions.mwRmqSubscribe({ channel, handler }))
}

export const rmqUnsubscribe = ({ channel }) => (dispatch) => {
  return dispatch(RmqMiddlewareActions.mwRmqUnsubscribe({ channel }))
}
