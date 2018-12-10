/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createSelector } from 'reselect'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { DUCK_BITCOIN } from './constants'

export const getDuckBitcoin = () => (state) =>
  state[DUCK_BITCOIN]

export const getBitcoinPending = (blockchain) => createSelector(
  getDuckBitcoin(),
  (scope) => scope[blockchain].pending,
)

export const getBitcoinWalletsForSections = createSelector(
  getDuckBitcoin(),
  getCurrentWallet,
  (bitcoin, ethAddress) => {
    let bitcoinWallets = []
    for (const key in bitcoin.list[ethAddress]) {
      bitcoinWallets = [
        ...bitcoinWallets,
        {
          data: [
            {
              address: bitcoin.list[ethAddress][key].address,
              blockchain: DUCK_BITCOIN,
            },
          ],
          title: ethAddress,
        },
      ]
    }

    return bitcoinWallets
  }
)

export const getBitcoinWallets = createSelector(
  getDuckBitcoin(),
  getCurrentWallet,
  (bitcoin, ethAddress) => bitcoin.list[ethAddress]
)

export const getBitcoinWalletsList = createSelector(
  getDuckBitcoin(),
  getCurrentWallet,
  (bitcoin, ethAddress) => Object.keys(bitcoin.list[ethAddress])
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
