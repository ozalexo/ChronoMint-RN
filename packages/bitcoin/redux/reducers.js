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

const bitcoinDeleteTxDraft = (state, { address, parentAddress }) => {
  let list = Object.assign({}, state.list)
  delete list[parentAddress][address].txDraft
  list = {
    ...list,
    [parentAddress]: {
      ...list[parentAddress],
      [address]: {
        ...list[parentAddress][address],
      },
    },
  }
  return {
    ...state,
    list,
  }
}

const bitcoinCreateTxDraft = (state, { address, parentAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [parentAddress]: {
      ...list[parentAddress],
      [address]: {
        ...list[parentAddress][address],
        txDraft: {
          recipient: '',
          amount: null,
          token: {},
          fee: 1,
          feeMultiplier: 1,
          unsignedTx: null,
          signedTx: null,
        },
      },
    },
  }
  return {
    ...state,
    list,
  }
}

const bitcoinSelectWallet = (state, { address }) => {
  return {
    ...state,
    selected: address,
  }
}

const bitcoinDropSelectedWallet = (state) => {
  return {
    ...state,
    selected: null,
  }
}

const bitcoinUpdateWalletBalance = (state, { address, parentAddress, balance, amount }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [parentAddress]: {
      ...list[parentAddress],
      [address]: {
        ...list[parentAddress][address],
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
}

const bitcoinCreateWallet = (state, { parentAddress, address }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [parentAddress]: {
      ...list[parentAddress],
      [address]: {
        address,
        transactions: {
          latestTxDate: null,
          txList: [],
        },
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
}

const bitcoinTxUpdateRecipient = (state, { recipient, address, parentAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [parentAddress]: {
      ...list[parentAddress],
      [address]: {
        ...list[parentAddress][address],
        txDraft: {
          ...list[parentAddress][address].txDraft,
          recipient,
        },
      },
    },
  }
  return {
    ...state,
    list,
  }
}

const bitcoinTxUpdateHistory = (state, { latestTxDate, txList, address, parentAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [parentAddress]: {
      ...list[parentAddress],
      [address]: {
        ...list[parentAddress][address],
        transactions: {
          ...list[parentAddress][address].transactions,
          latestTxDate,
          txList: [
            ...list[parentAddress][address].transactions.txList,
            ...txList,
          ],
        },
      },
    },
  }
  return {
    ...state,
    list,
  }
}

const bitcoinTxUpdateSignedTx = (state, { signedTx, address, parentAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [parentAddress]: {
      ...list[parentAddress],
      [address]: {
        ...list[parentAddress][address],
        txDraft: {
          ...list[parentAddress][address].txDraft,
          signedTx,
        },
      },
    },
  }
  return {
    ...state,
    list,
  }
}

const bitcoinTxUpdateUnsignedTx = (state, { unsignedTx, address, parentAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [parentAddress]: {
      ...list[parentAddress],
      [address]: {
        ...list[parentAddress][address],
        txDraft: {
          ...list[parentAddress][address].txDraft,
          unsignedTx,
        },
      },
    },
  }
  return {
    ...state,
    list,
  }
}

const bitcoinTxUpdateFee = (state, { fee, address, parentAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [parentAddress]: {
      ...list[parentAddress],
      [address]: {
        ...list[parentAddress][address],
        txDraft: {
          ...list[parentAddress][address].txDraft,
          fee,
        },
      },
    },
  }
  return {
    ...state,
    list,
  }
}

const bitcoinTxUpdateFeeMultiplier = (state, { feeMultiplier, address, parentAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [parentAddress]: {
      ...list[parentAddress],
      [address]: {
        ...list[parentAddress][address],
        txDraft: {
          ...list[parentAddress][address].txDraft,
          feeMultiplier,
        },
      },
    },
  }
  return {
    ...state,
    list,
  }
}

const bitcoinTxUpdateToken = (state, { token, address, parentAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [parentAddress]: {
      ...list[parentAddress],
      [address]: {
        ...list[parentAddress][address],
        txDraft: {
          ...list[parentAddress][address].txDraft,
          token,
        },
      },
    },
  }
  return {
    ...state,
    list,
  }
}

const bitcoinTxUpdateAmount = (state, { amount, address, parentAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [parentAddress]: {
      ...list[parentAddress],
      [address]: {
        ...list[parentAddress][address],
        txDraft: {
          ...list[parentAddress][address].txDraft,
          amount,
        },
      },
    },
  }
  return {
    ...state,
    list,
  }
}

const mutations = {

  [REHYDRATE]: bitcoinRehydrate,
  [ActionsTypes.BITCOIN_TX_UPDATE_RECIPIENT]: bitcoinTxUpdateRecipient,
  [ActionsTypes.BITCOIN_TX_UPDATE_AMOUNT]: bitcoinTxUpdateAmount,
  [ActionsTypes.BITCOIN_TX_UPDATE_TOKEN]: bitcoinTxUpdateToken,
  [ActionsTypes.BITCOIN_TX_UPDATE_FEE]: bitcoinTxUpdateFee,
  [ActionsTypes.BITCOIN_TX_UPDATE_FEE_MULTIPLIER]: bitcoinTxUpdateFeeMultiplier,
  [ActionsTypes.BITCOIN_TX_UPDATE_UNSIGNED_TX]: bitcoinTxUpdateUnsignedTx,
  [ActionsTypes.BITCOIN_TX_UPDATE_SIGNED_TX]: bitcoinTxUpdateSignedTx,
  [ActionsTypes.BITCOIN_DELETE_TX_DRAFT]: bitcoinDeleteTxDraft,
  [ActionsTypes.BITCOIN_CREATE_TX_DRAFT]: bitcoinCreateTxDraft,
  [ActionsTypes.BITCOIN_SELECT_WALLET]: bitcoinSelectWallet,
  [ActionsTypes.BITCOIN_DROP_SELECTED_WALLET]: bitcoinDropSelectedWallet,
  [ActionsTypes.BITCOIN_UPDATE_BALANCE]: bitcoinUpdateWalletBalance,
  [ActionsTypes.BITCOIN_CREATE_WALLET]: bitcoinCreateWallet,
  [ActionsTypes.BITCOIN_TX_UPDATE_HISTORY]: bitcoinTxUpdateHistory,
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
