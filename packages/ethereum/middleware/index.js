/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Web3Controller from './Web3Controller'
import { NETWORK_SELECT } from '@chronobank/network/redux/constants'
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

const getBalance = (store, { address }) =>
  w3c.getBalance(address)

const sendSignedTransaction = (store, { signedTx }) =>
  w3c.sendSignedTransaction({ signedTx })

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

const loadTokens = () =>
  w3c.loadTokens()

const initContracts = (store, { ethAddress }) =>
  w3c.initContracts(ethAddress)

const sendToken = (store, { from, to, tokenSymbol, value }) =>
  w3c.sendToken({ from, to, tokenSymbol, value })

const mutations = {

  [NETWORK_SELECT]: connect,
  [ActionTypes.WEB3_MIDDLEWARE_METHOD_ESTIMATE_GAS]: estimateGas,
  [ActionTypes.WEB3_MIDDLEWARE_LOAD_TOKENS]: loadTokens,
  [ActionTypes.WEB3_MIDDLEWARE_INIT_CONTRACTS]: initContracts,
  [ActionTypes.WEB3_MIDDLEWARE_SEND_TOKEN]: sendToken,
  [ActionTypes.WEB3_MIDDLEWARE_METHOD_GET_BALANCE]: getBalance,
  [ActionTypes.WEB3_MIDDLEWARE_METHOD_GET_CHAIN_ID]: getChainId,
  [ActionTypes.WEB3_MIDDLEWARE_METHOD_GET_GAS_PRICE]: getGasPrice,
  [ActionTypes.WEB3_MIDDLEWARE_METHOD_GET_NONCE_HEX]: getNonceHex,
  [ActionTypes.WEB3_MIDDLEWARE_METHOD_GET_NONCE]: getNonce,
  [ActionTypes.WEB3_MIDDLEWARE_METHOD_SEND_SIGNED_TX]: sendSignedTransaction,

}

export default (store) => (next) => (action) => {
  const { type } = action
  return (type in mutations)
    ? mutations[type](store, action, next)
    : next(action)
}
