/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Web3Controller from './Web3Controller'
import { NETWORK_SELECT, NETWORK_DISCONNECT } from '@chronobank/network/redux/constants'
import * as ActionTypes from './constants'
import { getNetworkByIndex } from '@chronobank/network/redux/selectors'

let w3c = null

const connect = async (store, action, next) => {
  const state = store.getState()
  const networkIndex = action.networkIndex
  const networkData = getNetworkByIndex(networkIndex)(state)
  const primaryNodeURL = networkData.primaryNode.ws

  w3c = new Web3Controller(store.dispatch, primaryNodeURL, networkData.networkId.toString(), networkIndex)
  try {
    await w3c.initController()
    next(action)
    // return Promise.resolve(w3c.getWeb3Instance())
  } catch (error) {
    // return Promise.reject(error)
  }
}

const disconnect = (store, action, next) => {
  return w3c.disconnect()
    .then(() => {
      next(action)
    })
}

const getBalance = (store, { address }) =>
  w3c.getBalance(address)

const getNonceHex = (store, { address }) =>
  w3c.getNonceHex(address)

const getNonce = (store, { address }) =>
  w3c.getNonce(address)

const getChainId = () =>
  w3c.getChainId()

const estimateGas = (store, { from, to, value, data, gasPrice, nonce }) =>
  w3c.estimateGas({ from, to, value, data, gasPrice, nonce })

const getGasPrice = () =>
  w3c.getGasPrice()

const mutations = {

  [NETWORK_SELECT]: connect,
  [NETWORK_DISCONNECT]: disconnect,
  [ActionTypes.WEB3_MIDDLEWARE_METHOD_ESTIMATE_GAS]: estimateGas,
  [ActionTypes.WEB3_MIDDLEWARE_METHOD_GET_BALANCE]: getBalance,
  [ActionTypes.WEB3_MIDDLEWARE_METHOD_GET_GAS_PRICE]: getGasPrice,
  [ActionTypes.WEB3_MIDDLEWARE_METHOD_GET_NONCE_HEX]: getNonceHex,
  [ActionTypes.WEB3_MIDDLEWARE_METHOD_GET_NONCE]: getNonce,
  [ActionTypes.WEB3_MIDDLEWARE_METHOD_GET_CHAIN_ID]: getChainId,

}

export default (store) => (next) => (action) => {
  const { type } = action
  return (type in mutations)
    ? mutations[type](store, action, next)
    : next(action)
}
