/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'

export const init = (networksInitialState) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_INIT,
  networksInitialState,
})

export const connect = (networkIndex) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_CONNECT,
  networkIndex,
})

export const connectSuccess = (networkIndex) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_CONNECT_SUCCESS,
  networkIndex,
})

export const connectFailure = (networkIndex, error) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_CONNECT_FAILURE,
  error,
  networkIndex,
})

export const disconnect = (networkIndex) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_DISCONNECT,
  networkIndex,
})

export const incompatibleNetwork = (networkIndex) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_INCOMPATIBLE_NETWORK,
  networkIndex,
})

export const subscribe = (networkIndex, channel, onMessageThunk) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_SUBSCRIBE,
  channel,
  onMessageThunk,
  networkIndex,
})

export const subscribeSuccess = (networkIndex, channel) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_SUBSCRIBE_SUCCESS,
  channel,
  networkIndex,
})

export const subscribeFailure = (networkIndex, error) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_SUBSCRIBE_FAILURE,
  error,
  networkIndex,
})

export const unsubscribe = (networkIndex, channel) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_UNSUBSCRIBE,
  channel,
  networkIndex,
})

export const appendContract = (networkIndex, contractName) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_APPEND_CONTRACT,
  contractName,
  networkIndex,
})

export const reset = () => ({
  type: ActionTypes.WEB3_MIDDLEWARE_RESET,
})

export const getBalance = (address) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_METHOD_GET_BALANCE,
  address,
})

export const getNonceHex = (address) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_METHOD_GET_NONCE_HEX,
  address,
})

export const getNonce = (address) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_METHOD_GET_NONCE,
  address,
})

export const getChainId = () => ({
  type: ActionTypes.WEB3_MIDDLEWARE_METHOD_GET_CHAIN_ID,
})

export const estimateGas = ({ from, to, value, data, gasPrice, nonce }) => ({
  type: ActionTypes.WEB3_MIDDLEWARE_METHOD_ESTIMATE_GAS,
  from,
  to,
  value,
  data,
  gasPrice,
  nonce,
})

export const getGasPrice = () => ({
  type: ActionTypes.WEB3_MIDDLEWARE_METHOD_GET_GAS_PRICE,
})
