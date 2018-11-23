/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Web3Controller from './Web3Controller'
import { NETWORK_SELECT } from '@chronobank/network/redux/constants'
// import * as Actions from './actions'
// import * as ActionTypes from './constants'
import { getNetworkByIndex } from '@chronobank/network/redux/selectors'

let w3c = null

const connect = async (store, action, next) => {
  const state = store.getState()
  const networkData = getNetworkByIndex(action.networkIndex)(state)
  const primaryNodeURL = networkData.primaryNode.ws

  w3c = new Web3Controller(store.dispatch, primaryNodeURL, networkData.networkId.toString())
  try {
    console.log('w3c', w3c)
    await w3c.initController()
    console.log('Controller initialized')
    next(action)
    // return Promise.resolve(w3c.getWeb3Instance())
  } catch (error) {
    console.log('Controller initialization error:', error)
    // return Promise.reject(error)
  }
}

// const getWeb3Instance = (store, action, next) => {
//   next(action)
//   return w3c.getWeb3Instance()
// }

// const getWeb3Provider = (store, action, next) => {
//   next(action)
//   return w3c.getWeb3CurrentProvider()
// }

// const nodesInit = async (store, action, next) => {
//   let state = store.getState()
//   if (!state.nodes.selected) {
//     await store.dispatch(NodesThunks.preselectNetwork())
//     state = store.getState()
//   }
//   const networkId = NodesSelectors.selectCurrentNetworkId(state)
//   w3c = new Web3Controller(store.dispatch, NodesSelectors.selectCurrentPrimaryNode(state).ws, networkId.toString())
//   try {
//     await w3c.initController()
//     next(action)
//     return Promise.resolve(w3c.getWeb3Instance())
//   } catch (error) {
//     return Promise.reject(error)
//   }
// }

// const nodesNetworkSwitch = (store, action, next) => {
//   store.dispatch(NodesActions.networkSelect(action.networkIndex))
//   const state = store.getState()
//   const selectedWeb3Host = NodesSelectors.selectCurrentPrimaryNode(state)
//   const selectedProviderUrl = selectedWeb3Host && selectedWeb3Host.ws
//   if (!w3c || !selectedProviderUrl) {
//     store.dispatch(NodesActions.nodesInit())
//   } else {
//     const w3cProviderHost = w3c.getWeb3CurrentProvider().connection.url
//     if (w3cProviderHost !== selectedProviderUrl) {
//       store.dispatch(NodesActions.web3Reset())
//       w3c.changeProvider(selectedProviderUrl, NodesSelectors.selectCurrentNetworkId(state))
//     }
//   }
//   next(action)
// }

// const web3Reconnect = (store, action, next) => {
//   next(action)
//   return w3c.reconnect()
//     .then(() => {
//       store.dispatch(Actions.middlewareReconnectSuccess())
//     })
//     .catch((error) => {
//       store.dispatch(Actions.middlewareReconnectFailure(error))
//       setTimeout(() => {
//         store.dispatch(Actions.middlewareReconnect())
//       }, 5000)
//     })
// }

const mutations = {

  [NETWORK_SELECT]: connect,
  // [ActionTypes.WEB3_RECONNECT]: web3Reconnect,

}

export default (store) => (next) => (action) => {
  const { type } = action
  return (type in mutations)
    ? mutations[type](store, action, next)
    : next(action)
}
