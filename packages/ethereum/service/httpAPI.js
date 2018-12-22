/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

/**
 * See middleware API documantaion here: https://github.com/ChronoBank/middleware-ethereum-rest
 */

import { BLOCKCHAIN_ETHEREUM } from '../constants'

/**
 * register new address on middleware
 * @param {string} address
 */
export const requestSubscribeWalletByAddress = (address) => (dispatch) => {
  const action = {
    type: 'REQ/MIDDLEWARE/ETHEREUM/POST/SUBSCRIBE',
    payload: {
      blockchain: BLOCKCHAIN_ETHEREUM,
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
    type: 'REQ/MIDDLEWARE/ETHEREUM/DELETE/UNSUBSCRIBE',
    payload: {
      blockchain: BLOCKCHAIN_ETHEREUM,
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
    type: 'REQ/MIDDLEWARE/ETHEREUM/GET/BALANCE',
    payload: {
      blockchain: BLOCKCHAIN_ETHEREUM,
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

const TXS_PER_PAGE = 20
/**
 * retrieve transactions for the registered adresses [use skip and limit paramters]
 * @param {string} address
 */
export const requestTransactionsHistoryByAddress = (address, skip = 0, offset = TXS_PER_PAGE) => (dispatch) => {
  const action = {
    type: 'REQ/MIDDLEWARE/ETHEREUM/GET/TRANSACTIONS_HISTORY',
    payload: {
      blockchain: BLOCKCHAIN_ETHEREUM,
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
    type: 'REQ/MIDDLEWARE/ETHEREUM/GET/TRANSACTION_BY_HASH',
    payload: {
      blockchain: BLOCKCHAIN_ETHEREUM,
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

// /**
//  * estimate fee rate (based on last 6 blocks)
//  */
// export const requestEstimateFeeRate = () => (dispatch) => {
//   const action = {
//     type: 'REQ/MIDDLEWARE/ETHEREUM/GET/ESTIMATE_FEE_RATE',
//     payload: {
//       blockchain: BLOCKCHAIN_ETHEREUM,
//       request: {
//         method: 'GET',
//         url: '/estimate/feerate',
//       },
//     },
//   }

//   return dispatch(action)
//     .then((result) => {
//       return result
//     })
//     .catch((error) => {
//       throw new Error(error)
//     })
// }

/**
 * get current block height
 */
export const requestBlocksHeight = () => (dispatch) => {
  const action = {
    type: 'REQ/MIDDLEWARE/ETHEREUM/GET/BLOCKS_HEIGHT',
    payload: {
      blockchain: BLOCKCHAIN_ETHEREUM,
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
