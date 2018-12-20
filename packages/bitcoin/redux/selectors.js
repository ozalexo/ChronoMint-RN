/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createSelector } from 'reselect'
import { DUCK_BITCOIN } from './constants'
import { BLOCKCHAIN_BITCOIN } from '../constants'

export const getDuckBitcoin = (state) =>
  state[DUCK_BITCOIN]

export const getBitcoinPending = createSelector(
  getDuckBitcoin,
  (duckBitcoin) => duckBitcoin.pending,
)

export const getBitcoinList = createSelector(
  getDuckBitcoin,
  (duckBitcoin) => duckBitcoin.list
)

export const getBitcoinListByMasterAddress = (masterAddress) => createSelector(
  getBitcoinList,
  (bitcoinList) => bitcoinList[masterAddress]
)

export const getBitcoinSelectedWalletAddress = createSelector(
  getDuckBitcoin,
  (duckBitcoin) => duckBitcoin.selected,
)

export const getBitcoinWalletsForSections = (ethAddress) => createSelector(
  getBitcoinList,
  (bitcoinList) => {
    let bitcoinWallets = []
    for (const key in bitcoinList[ethAddress]) {
      bitcoinWallets = [
        ...bitcoinWallets,
        {
          data: [
            {
              address: bitcoinList[ethAddress][key].address,
              blockchain: BLOCKCHAIN_BITCOIN,
            },
          ],
          title: BLOCKCHAIN_BITCOIN,
        },
      ]
    }

    return bitcoinWallets
  }
)

export const getBitcoinWallets = (ethAddress) => createSelector(
  getBitcoinList,
  (bitcoinList) => bitcoinList[ethAddress] 
)

export const getBitcoinWalletsList = (ethAddress) => createSelector(
  getBitcoinList,
  (bitcoinList) => Object.keys(bitcoinList[ethAddress])
)

export const getBitcoinCurrentWallet = (ethAddress) => createSelector(
  getBitcoinList,
  getBitcoinSelectedWalletAddress,
  (bitcoinList, btcAddress) => bitcoinList[ethAddress][btcAddress] || {}
)
