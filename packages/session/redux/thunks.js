/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  login,
  logout,
} from './actions'
import {
  startMarket,
  stopMarket,
} from '@chronobank/market/middleware/thunks'
import {
  rmqConnect,
  rmqDisconnect,
  subscribeBtcChannels,
  subscribeEthChannels,
} from '@chronobank/network/redux/thunks'
import { getCurrentNetworkType } from '@chronobank/network/redux/selectors'
import { marketAddToken } from '@chronobank/market/redux/thunks'
import { initContracts } from '@chronobank/ethereum/middleware/thunks'
import { requestAndSubscribeEthereumWallet } from '@chronobank/ethereum/redux/thunks'
import { requestAndSubscribeBitcoinWallets } from '@chronobank/bitcoin/redux/thunks'
import { createBitcoinWallet } from '@chronobank/bitcoin/redux/thunks'
import { parallelPromises } from '../utils'

// TODO: to implement common error handler somewhere and here should stay only error/warning messages with codes
const SessionRTErrors = (errorCode, error) => {
  const errorMessages = {
    1: 'Warning SYSRT001: startMarket',
    2: "Warning SYSRT002: : can't subscribe ro RabbitMQ with no masterWalletAddress",
    3: 'Warning SESRT003, rmqConnect:',
    4: 'Warning SYSRT004, loginThunk: No ETH address or privateKey provided',
    5: "Warning SYSRT005, createBitcoinWallet. Can't login:",
    6: 'Warning SYSRT006, logoutThunk:',
  }
  const errorMessage = errorMessages[errorCode]
  if (error) {
    // eslint-disable-next-line no-console
    console.log(errorMessage, error)
  } else {
    // eslint-disable-next-line no-console
    console.log(errorMessage)
  }
  return errorMessage
}

/**
 * Launch Market redux middleware and add predefined coins
 */
const runMarket = () => (dispatch) =>
  dispatch(startMarket())
    .then(() => {
      dispatch(marketAddToken('BTC'))
      dispatch(marketAddToken('ETH'))
    })
    .catch((error) => {
      // Ignoring market errors
      SessionRTErrors(1, error)
    })

/**
 * Connect to RabbitMQ and assign handlers (all wallets and channels of current session)
 * @param {string} masterWalletAddress
 */
const performRmqConnectAndSubscribe = (masterWalletAddress) => (dispatch) => {
  return new Promise((resolve, reject) => {
    if (!masterWalletAddress) {
      return reject(SessionRTErrors(2))
    }

    return dispatch(rmqConnect())
      .then(() => {
        return resolve(parallelPromises([
          () => dispatch(subscribeEthChannels(masterWalletAddress)),
          () => dispatch(subscribeBtcChannels(masterWalletAddress)),
        ]))
      })
      .catch((error) => {
        SessionRTErrors(3, error)
        return reject(error)
      })
  })
}

/**
 * Login thunk performs the following steps:
 * 1) Start Market middleware and subscribe for updates
 * 2) Subsribes for ETH updates from middleware
 * 3) Creates BTC wallet (ETH wallet already created)
 * 3.1) If BTC created succesfully, then trying to connect to RabbitMQ
 * 3.2) If RabbitMQ connected, then subscribes for updates (balances, transactions etc.)
 * Login fails only if we can't create BTC wallet for some reason.
 * @param {string} ethAddress
 * @param {strin} privateKey
 */
export const loginThunk = (masterWalletAddress, privateKey) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    if (!masterWalletAddress || !privateKey) {
      return reject(SessionRTErrors(4))
    }

    const state = getState()
    const networkType = getCurrentNetworkType(state)

    dispatch(createBitcoinWallet({ privateKey, masterWalletAddress, networkType }))
      .then(() => {
        // here we do need await, because all screens must be data-loss tolerant
        // Any action in the array below may safely fail
        parallelPromises([
          // Run market middleware and add predefined coins (ERC20 tokens will be added later dynamically)
          () => dispatch(runMarket()),
          // // Load ETH constracts via Web3 redux middleware
          () => dispatch(initContracts()),
          // // request balances, start wallet listening on middleware
          () => dispatch(requestAndSubscribeEthereumWallet(masterWalletAddress)),
          // // request balances, start wallet listening on middleware
          () => dispatch(requestAndSubscribeBitcoinWallets(masterWalletAddress)),
          // // connect to RabbitMQ and assign handlers
          () => dispatch(performRmqConnectAndSubscribe(masterWalletAddress)),
        ])

        // TODO: Actually, we may start app even with no BTC wallet if we have only one ETH wallet.
        dispatch(login(masterWalletAddress))
        return resolve()
      })
      .catch((error) => {
        return reject(SessionRTErrors(5, error))
      })
  })
}

export const logoutThunk = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(stopMarket())
      dispatch(rmqDisconnect())
        .then(() => {
          dispatch(logout())
          return resolve()
        })
        .catch((error) => {
          SessionRTErrors(6, error)
          return reject(error)
        })
    } catch (error) {
      return reject(error)
    }
  })
}
