/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createSelector } from 'reselect'
import { DUCK_BITCOIN } from './constants'

export const getDuckBitcoin = () => (state) =>
  state[DUCK_BITCOIN]

export const getBitcoinPending = (blockchain) => createSelector(
  getDuckBitcoin(),
  (scope) => scope[blockchain].pending,
)

export const getBitcoinWallets = () => createSelector(
  getDuckBitcoin(),
  (bitcoin) => {
    let bitcoinWallets = []
    for (const key in bitcoin.list) {
      for (const secKey in bitcoin.list[key]) {
        bitcoinWallets = [
          ...bitcoinWallets,
          {
            data: [
              {
                address: bitcoin.list[key][secKey].address,
                blockchain: 'BTC',
              },
            ],
            title: key,
          },
        ]
      }
    }

    return bitcoinWallets
  }
)

export const getEntryPending = (address, key, blockchain) => createSelector(
  getBitcoinPending(blockchain),
  (pending) => {
    if (address in pending) {
      return pending[address][key] || null
    }
    return null
  },
)
