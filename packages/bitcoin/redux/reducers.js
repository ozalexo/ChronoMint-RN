/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as BitcoinActionsConstants from './constants'
import initialState from './initialState'

const newInitialState = {
  // This field 'lastRequestMeta' is using only for logging purposes yet.
  // To be replaced with real state to provide info into UI.
  ...initialState,
  lastRequestMeta: null,
  pending: {},
}

const mutations = {

  // GET UTXOS
  [BitcoinActionsConstants.BITCOIN_HTTP_GET_UTXOS]: (state) => state,
  [BitcoinActionsConstants.BITCOIN_HTTP_GET_UTXOS_SUCCESS]: (state, data) => ({
    ...state,
    lastRequestMeta: data,
  }),
  [BitcoinActionsConstants.BITCOIN_HTTP_GET_UTXOS_FAILURE]: (state, error) => ({
    ...state,
    lastRequestMeta: error,
  }),

  // GET blocks height
  [BitcoinActionsConstants.BITCOIN_HTTP_GET_BLOCKS_HEIGHT]: (state) => state,
  [BitcoinActionsConstants.BITCOIN_HTTP_GET_BLOCKS_HEIGHT_SUCCESS]: (state, data) => ({
    ...state,
    lastRequestMeta: data,
  }),
  [BitcoinActionsConstants.BITCOIN_HTTP_GET_BLOCKS_HEIGHT_FAILURE]: (state, error) => ({
    ...state,
    lastRequestMeta: error,
  }),

  // GET transaction info
  [BitcoinActionsConstants.BITCOIN_HTTP_GET_TX_INFO]: (state) => state,
  [BitcoinActionsConstants.BITCOIN_HTTP_GET_TX_INFO_SUCCESS]: (state, data) => ({
    ...state,
    lastRequestMeta: data,
  }),
  [BitcoinActionsConstants.BITCOIN_HTTP_GET_TX_INFO_FAILURE]: (state, error) => ({
    ...state,
    lastRequestMeta: error,
  }),

  // GET address info
  [BitcoinActionsConstants.BITCOIN_HTTP_GET_ADDRESS_INFO]: (state) => state,
  [BitcoinActionsConstants.BITCOIN_HTTP_GET_ADDRESS_INFO_SUCCESS]: (state, data, host) => ({
    ...state,
    lastRequestMeta: data,
    host,
  }),
  [BitcoinActionsConstants.BITCOIN_HTTP_GET_ADDRESS_INFO_FAILURE]: (state, error) => ({
    ...state,
    lastRequestMeta: error,
  }),

  // POST send transaction
  [BitcoinActionsConstants.BITCOIN_HTTP_POST_SEND_TX]: (state) => state,
  [BitcoinActionsConstants.BITCOIN_HTTP_POST_SEND_TX_SUCCESS]: (state, data) => ({
    ...state,
    lastRequestMeta: data,
  }),
  [BitcoinActionsConstants.BITCOIN_HTTP_POST_SEND_TX_FAILURE]: (state, error) => ({
    ...state,
    lastRequestMeta: error,
  }),

  // Execute bitcoin Tx
  [BitcoinActionsConstants.BITCOIN_EXECUTE_TX]: (state) => state,
  [BitcoinActionsConstants.BITCOIN_EXECUTE_TX_SUCCESS]: (state, data) => ({
    ...state,
    lastRequestMeta: data,
  }),
  [BitcoinActionsConstants.BITCOIN_EXECUTE_TX_FAILURE]: (state, error) => ({
    ...state,
    lastRequestMeta: error,
  }),

  // Operation sign bitcoin
  [BitcoinActionsConstants.BITCOIN_SIGN_TX]: (state) => state,
  [BitcoinActionsConstants.BITCOIN_SIGN_TX_SUCCESS]: (state, data) => ({
    ...state,
    lastRequestMeta: data,
  }),
  [BitcoinActionsConstants.BITCOIN_SIGN_TX_FAILURE]: (state, error) => ({
    ...state,
    lastRequestMeta: error,
  }),

  // Modal dialog shows
  [BitcoinActionsConstants.BITCOIN_SHOW_SIGN_TX_CONFIRMATION_MODAL_DIALOG]: (state) => ({
    ...state,
  }),
  [BitcoinActionsConstants.BITCOIN_CLOSE_SIGN_TX_CONFIRMATION_MODAL_DIALOG]: (state) => ({
    ...state,
  }),

  // Update/Create Tx in state
  [BitcoinActionsConstants.BITCOIN_TX_UPDATE]: (state, { entry }) => {
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
  [BitcoinActionsConstants.BITCOIN_TX_ACCEPT]: (state, { entry }) => {
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
  [BitcoinActionsConstants.BITCOIN_TX_REJECT]: (state, { entry }) => {
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

export default (state = newInitialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}
