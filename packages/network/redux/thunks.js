/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { BLOCKCHAIN_BITCOIN } from '@chronobank/bitcoin/constants'
// import { BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'
import * as BtcSelectors from '@chronobank/bitcoin/redux/selectors'
import * as BtcThunks from '@chronobank/bitcoin/redux/thunks'
// import * as EthSelectors from '@chronobank/ethereum/redux/selectors'
// import * as EthThunks from '@chronobank/ethereum/redux/thunks'
import * as Actions from './actions'
import * as RmqMiddlewareActions from '../middlewares/rabbitmq/actions'
import * as Selectors from './selectors'

export const networkSelect = (networkIndex) => (dispatch, getState) => {
  const state = getState()
  const availableNetworks = Selectors.getAvailableNetworks(state)

  const isNetworkIndexInvalid = (0 > networkIndex || networkIndex > availableNetworks.length)
  if (isNetworkIndexInvalid) {
    return
  }

  const currentNetwork = Selectors.getCurrentNetwork(state)
  const isAlreadySelected = currentNetwork && currentNetwork.networkIndex === networkIndex
  if (isAlreadySelected) {
    return
  }

  dispatch(Actions.networkSelect(networkIndex))
}

export const autoSelectNetwork = () => (dispatch, getState) => {
  const state = getState()
  const networks = Selectors.getDuckNetwork(state)
  let networkIndex = null

  if (networks.selected === null) {
    if (process.env['NODE_ENV'] === 'development') {
      networkIndex = 3
    } else {
      // networkIndex = 1
      networkIndex = 3 // Always connect to testnet for the very first demo purposes
    }
    dispatch(Actions.networkSelect(networkIndex))
  }
}

export const rmqConnect = () => (dispatch) => {
  return dispatch(RmqMiddlewareActions.mwRmqConnect())
}

export const rmqDisconnect = () => (dispatch) => {
  return dispatch(RmqMiddlewareActions.mwRmqDisconnect())
}

export const rmqSubscribe = ({ channel, handler }) => (dispatch) => {
  return dispatch(RmqMiddlewareActions.mwRmqSubscribe({ channel, handler }))
}

export const rmqUnsubscribe = ({ channel }) => (dispatch) => {
  return dispatch(RmqMiddlewareActions.mwRmqUnsubscribe({ channel }))
}

const rmqSubscribeChannel = (channel, handler) => (dispatch) => {
  const subscriptionCredentials = {
    channel,
    handler,
  }

  return dispatch(rmqSubscribe(subscriptionCredentials))
    // .then(() => {}) // No 'then' required
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('Ignored error NETRT001: can\'t subscribe to %s.', channel, error)
      throw error
    })
}

/**
 * Get all channels and wallets from store and subscribe to everything
 * @param {string} masterWalletAddress ETH master wallet's address
 */
export const subscribeBtcChannels = (masterWalletAddress) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    try {
      const state = getState()
      const btcWallets = BtcSelectors.getBitcoinWalletsList(masterWalletAddress)(state)
      const btcChannels = Selectors.getCurrentNetworkBlockchainChannels(BLOCKCHAIN_BITCOIN)(state)

      btcWallets.forEach(({ address }) => {
        Object.keys(btcChannels).forEach((channel) => {
          let handler = () => {}
          switch (channel) {
          case 'balance': {
            handler = BtcThunks.balanceUpdateHandler(address, masterWalletAddress)
            break
          }
          case 'transaction': {
            handler = BtcThunks.transactionUpdateHandler(address, masterWalletAddress)
            break
          }
          case 'block': {
            // handler = () => {} // TODO
            break
          }
          }

          rmqSubscribeChannel(channel, handler)
        })
      })
      return resolve()
    } catch (error) {
      return reject(error)
    }
  })
}

/**
 * Get all channels and wallets from store and subscribe to everything
 * @param {string} masterWalletAddress ETH master wallet's address
 */
export const subscribeEthChannels = (masterWalletAddress) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    try {
      // const state = getState()
      // const ethWallets = EthSelectors.getEthAccountList(state)
      // const ethChannels = Selectors.getCurrentNetworkBlockchainChannels(BLOCKCHAIN_ETHEREUM)(state)

      // ethWallets.forEach(({ address }) => {
      //   Object.keys(ethChannels).forEach((channel) => {
      //     let handler = () => {}
      //     switch (channel) {
      //     case 'balance': {
      //       handler = EthThunks.balanceUpdateHandler(address, masterWalletAddress)
      //       break
      //     }
      //     case 'transaction': {
      //       handler = EthThunks.transactionUpdateHandler(address, masterWalletAddress)
      //       break
      //     }
      //     case 'block': {
      //       // handler = () => {} // TODO
      //       break
      //     }
      //     }
    
      //     rmqSubscribeChannel(channel, handler)
      //   })
      // })
      return resolve()
    } catch (error) {
      return reject(error)
    }
  })
}
