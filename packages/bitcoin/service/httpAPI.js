/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

/**
 * See middleware API documantaion here: https://github.com/ChronoBank/middleware-bitcoin-rest
 */

import { BLOCKCHAIN_BITCOIN } from '../constants'

/**
 * register new address on middleware
 * @param {string} address
 */
export const requestSubscribeWalletByAddress = (address) => (dispatch) => {
  const action = {
    type: 'REQ/MIDDLEWARE/BITCOIN/POST/SUBSCRIBE',
    payload: {
      blockchain: BLOCKCHAIN_BITCOIN,
      request: {
        method: 'POST',
        url: '/addr',
        data: { address },
      },
    },
  }

  return dispatch(action)
    .then((result) => {
      return result
    })
    .catch((error) => {
      throw new Error(error)
    })
}

/**
 * remove an address from middleware
 * @param {string} address
 */
export const requestUnubscribeWalletByAddress = (address) => (dispatch) => {
  const action = {
    type: 'REQ/MIDDLEWARE/BITCOIN/DELETE/UNSUBSCRIBE',
    payload: {
      blockchain: BLOCKCHAIN_BITCOIN,
      request: {
        method: 'DELETE',
        url: '/addr',
        data: address,
      },
    },
  }

  return dispatch(action)
    .then((result) => {
      return result
    })
    .catch((error) => {
      throw new Error(error)
    })
}

/**
 * retrieve balance of the registered address
 * @param {string} address
 */
export const requestBalanceByAddress = (address) => (dispatch) => {
  const action = {
    type: 'REQ/MIDDLEWARE/BITCOIN/GET/BALANCE',
    payload: {
      blockchain: BLOCKCHAIN_BITCOIN,
      request: {
        method: 'GET',
        url: `/addr/${address}/balance`,
      },
    },
  }

  return dispatch(action)
    .then((result) => {
      return result
    })
    .catch((error) => {
      throw new Error(error)
    })
}

/**
 * returns an array of unspent transactions (utxo)
 * @param {string} address
 */
export const requestUtxoByAddress = (address) => (dispatch) => {
  const action = {
    type: 'REQ/MIDDLEWARE/BITCOIN/GET/UTXO',
    payload: {
      blockchain: BLOCKCHAIN_BITCOIN,
      request: {
        method: 'GET',
        url: `/addr/${address}/utxo`,
      },
    },
  }

  return dispatch(action)
    .then((result) => {
      return result
    })
    .catch((error) => {
      throw new Error(error)
    })
}

/**
 * broadcast new transaction to network
 * @param {string} tx
 */
export const requestSendRawTransaction = (tx) => (dispatch) => {
  const action = {
    type: 'REQ/MIDDLEWARE/BITCOIN/POST/SEND_RAW_TRANSACTION',
    payload: {
      blockchain: BLOCKCHAIN_BITCOIN,
      request: {
        method: 'POST',
        url: '/tx/send',
        data: {tx},
      },
    },
  }

  return dispatch(action)
    .then((result) => {
      return result
    })
    .catch((error) => {
      throw new Error(error)
    })
}

const TXS_PER_PAGE = 20
/**
 * retrieve transactions for the registered adresses [use skip and limit paramters]
 * @param {string} address
 */
export const requestTransactionsHistoryByAddress = (address, skip = 0, offset = TXS_PER_PAGE) => (dispatch) => {
  const action = {
    type: 'REQ/MIDDLEWARE/BITCOIN/GET/TRANSACTIONS_HISTORY',
    payload: {
      blockchain: BLOCKCHAIN_BITCOIN,
      request: {
        method: 'GET',
        url: `tx/${address}/history?skip=${skip}&limit=${offset}`,
      },
    },
  }

  return dispatch(action)
    .then((result) => {
      return result
    })
    .catch((error) => {
      throw new Error(error)
    })
}

/**
 * retrieve transaction by its hash
 * @param {string} txHash
 */
export const requestTransactionByHash = (txHash) => (dispatch) => {
  const action = {
    type: 'REQ/MIDDLEWARE/BITCOIN/GET/TRANSACTION_BY_HASH',
    payload: {
      blockchain: BLOCKCHAIN_BITCOIN,
      request: {
        method: 'GET',
        url: `/tx/${txHash}`,
      },
    },
  }

  return dispatch(action)
    .then((result) => {
      return result
    })
    .catch((error) => {
      throw new Error(error)
    })
}

/**
 * estimate fee rate (based on last 6 blocks)
 */
export const requestEstimateFeeRate = () => (dispatch) => {
  const action = {
    type: 'REQ/MIDDLEWARE/BITCOIN/GET/ESTIMATE_FEE_RATE',
    payload: {
      blockchain: BLOCKCHAIN_BITCOIN,
      request: {
        method: 'GET',
        url: '/estimate/feerate',
      },
    },
  }

  return dispatch(action)
    .then((result) => {
      return result
    })
    .catch((error) => {
      throw new Error(error)
    })
}

/**
 * get current block height
 */
export const requestBlocksHeight = () => (dispatch) => {
  const action = {
    type: 'REQ/MIDDLEWARE/BITCOIN/GET/BLOCKS_HEIGHT',
    payload: {
      blockchain: BLOCKCHAIN_BITCOIN,
      request: {
        method: 'GET',
        url: '/blocks/height',
      },
    },
  }

  return dispatch(action)
    .then((result) => {
      return result
    })
    .catch((error) => {
      throw new Error(error)
    })
}
