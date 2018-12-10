/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { REHYDRATE } from 'redux-persist'
import { DECIMALS, BTC_PRIMARY_TOKEN } from '../constants'
import * as ActionsTypes from './constants'
import initialState from './initialState'

const bitcoinRehydrate = (state, payload) => {
  // action.payload is undefined if LocalStorage is empty
  // See https://github.com/rt2zz/redux-persist/issues/719
  if (!payload.payload || payload.key !== ActionsTypes.DUCK_ETHEREUM) {
    return state
  }
  return {
    ...state,
    list: payload.payload.list,
  }
}

const mutations = {

  [REHYDRATE]: bitcoinRehydrate,
  [ActionsTypes.BITCOIN_UPDATE_BALANCE]: (state, { address, parentAddress, balance, amount }) => {
    let list = Object.assign({}, state.list)
    list = {
      ...list,
      [parentAddress]: {
        ...list[parentAddress],
        [address]: {
          address,
          tokens: {
            [BTC_PRIMARY_TOKEN]: {
              ...list[parentAddress][address].tokens[BTC_PRIMARY_TOKEN],
              balance,
              amount,
            },
          },
        },
      },
    }
    return {
      ...state,
      list,
    }
  },
  [ActionsTypes.BITCOIN_CREATE_WALLET]: (state, { parentAddress, address }) => {
    let list = Object.assign({}, state.list)
    list = {
      ...list,
      [parentAddress]: {
        ...list[parentAddress],
        [address]: {
          address,
          tokens: {
            [BTC_PRIMARY_TOKEN]: {
              balance: null,
              symbol: BTC_PRIMARY_TOKEN,
              amount: null,
              decimals: DECIMALS,
            },
          },
        },
      },
    }
    return {
      ...state,
      list,
    }
  },
  // GET UTXOS
  [ActionsTypes.BITCOIN_HTTP_GET_UTXOS]: (state) => state,
  [ActionsTypes.BITCOIN_HTTP_GET_UTXOS_SUCCESS]: (state, data) => ({
    ...state,
    lastRequestMeta: data,
  }),
  [ActionsTypes.BITCOIN_HTTP_GET_UTXOS_FAILURE]: (state, error) => ({
    ...state,
    lastRequestMeta: error,
  }),

  // GET blocks height
  [ActionsTypes.BITCOIN_HTTP_GET_BLOCKS_HEIGHT]: (state) => state,
  [ActionsTypes.BITCOIN_HTTP_GET_BLOCKS_HEIGHT_SUCCESS]: (state, data) => ({
    ...state,
    lastRequestMeta: data,
  }),
  [ActionsTypes.BITCOIN_HTTP_GET_BLOCKS_HEIGHT_FAILURE]: (state, error) => ({
    ...state,
    lastRequestMeta: error,
  }),

  // GET transaction info
  [ActionsTypes.BITCOIN_HTTP_GET_TX_INFO]: (state) => state,
  [ActionsTypes.BITCOIN_HTTP_GET_TX_INFO_SUCCESS]: (state, data) => ({
    ...state,
    lastRequestMeta: data,
  }),
  [ActionsTypes.BITCOIN_HTTP_GET_TX_INFO_FAILURE]: (state, error) => ({
    ...state,
    lastRequestMeta: error,
  }),

  // GET address info
  [ActionsTypes.BITCOIN_HTTP_GET_ADDRESS_INFO]: (state) => state,
  [ActionsTypes.BITCOIN_HTTP_GET_ADDRESS_INFO_SUCCESS]: (state, data, host) => ({
    ...state,
    lastRequestMeta: data,
    host,
  }),
  [ActionsTypes.BITCOIN_HTTP_GET_ADDRESS_INFO_FAILURE]: (state, error) => ({
    ...state,
    lastRequestMeta: error,
  }),

  // POST send transaction
  [ActionsTypes.BITCOIN_HTTP_POST_SEND_TX]: (state) => state,
  [ActionsTypes.BITCOIN_HTTP_POST_SEND_TX_SUCCESS]: (state, data) => ({
    ...state,
    lastRequestMeta: data,
  }),
  [ActionsTypes.BITCOIN_HTTP_POST_SEND_TX_FAILURE]: (state, error) => ({
    ...state,
    lastRequestMeta: error,
  }),

  // Execute bitcoin Tx
  [ActionsTypes.BITCOIN_EXECUTE_TX]: (state) => state,
  [ActionsTypes.BITCOIN_EXECUTE_TX_SUCCESS]: (state, data) => ({
    ...state,
    lastRequestMeta: data,
  }),
  [ActionsTypes.BITCOIN_EXECUTE_TX_FAILURE]: (state, error) => ({
    ...state,
    lastRequestMeta: error,
  }),

  // Operation sign bitcoin
  [ActionsTypes.BITCOIN_SIGN_TX]: (state) => state,
  [ActionsTypes.BITCOIN_SIGN_TX_SUCCESS]: (state, data) => ({
    ...state,
    lastRequestMeta: data,
  }),
  [ActionsTypes.BITCOIN_SIGN_TX_FAILURE]: (state, error) => ({
    ...state,
    lastRequestMeta: error,
  }),

  // Modal dialog shows
  [ActionsTypes.BITCOIN_SHOW_SIGN_TX_CONFIRMATION_MODAL_DIALOG]: (state) => ({
    ...state,
  }),
  [ActionsTypes.BITCOIN_CLOSE_SIGN_TX_CONFIRMATION_MODAL_DIALOG]: (state) => ({
    ...state,
  }),

  // Update/Create Tx in state
  [ActionsTypes.BITCOIN_TX_UPDATE]: (state, { entry }) => {
    const address = entry.tx.from
    const blockchainScope = state[entry.blockchain]
    const pending = blockchainScope.pending
    const scope = pending[address]
    return {
      ...state,
      [entry.blockchain]: {
        ...blockchainScope,
        pending: {
          ...pending,
          [address]: {
            ...scope,
            [entry.key]: entry,
          },
        },
      },
    }
  },

  // Accept Tx in state
  [ActionsTypes.BITCOIN_TX_ACCEPT]: (state, { entry }) => {
    const address = entry.tx.from
    const blockchainScope = state[entry.blockchain]
    const pending = blockchainScope.pending
    const scope = pending[address]
    return {
      ...state,
      [entry.blockchain]: {
        ...blockchainScope,
        pending: {
          ...pending,
          [address]: {
            ...scope,
            [entry.key]: entry,
          },
        },
      },
    }
  },

  // Reject Tx in state
  [ActionsTypes.BITCOIN_TX_REJECT]: (state, { entry }) => {
    const address = entry.tx.from
    const blockchainScope = state[entry.blockchain]
    const pending = blockchainScope.pending
    const scope = pending[address]
    return {
      ...state,
      [entry.blockchain]: {
        ...blockchainScope,
        pending: {
          ...pending,
          [address]: {
            ...scope,
            [entry.key]: entry,
          },
        },
      },
    }
  },
}

export default (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}
