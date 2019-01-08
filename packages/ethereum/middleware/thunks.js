/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { getAvailableNetworkCount } from '@chronobank/network/redux/selectors'
import * as Actions from './actions'

export const init = () => (dispatch, getState) => {
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

export const getBalance = (address) => (dispatch) =>
  dispatch(Actions.getBalance(address))

export const getNonceHex = (address) => (dispatch) =>
  dispatch(Actions.getNonceHex(address))

export const sendSignedTransaction = ({ signedTx }) => (dispatch) =>
  dispatch(Actions.sendSignedTransaction({ signedTx }))

export const getNonce = (address) => (dispatch) =>
  dispatch(Actions.getNonce(address))

export const estimateGas = ({ from, to, value, data, gasPrice, nonce }) => (dispatch) =>
  dispatch(Actions.estimateGas({ from, to, value, data, gasPrice, nonce }))

export const getGasPrice = () => (dispatch) =>
  dispatch(Actions.getGasPrice())

export const initContracts = (ethAddress) => (dispatch) =>
  dispatch(Actions.initContracts(ethAddress))

export const sendToken = ({ from, to, gasPrice, gas, tokenSymbol, value }) => (dispatch) =>
  dispatch(Actions.sendToken({ from, to, gasPrice, gas, tokenSymbol, value }))

export const getChainId = () => (dispatch) =>
  dispatch(Actions.getChainId())

export const getContractByName = ({ contractName }) => (dispatch) => {
  console.log('GCBN', contractName)
  return dispatch(Actions.getContractByName(contractName))
}
