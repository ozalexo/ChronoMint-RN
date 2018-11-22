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

export const getEntryPending = (address, key, blockchain) => createSelector(
  getBitcoinPending(blockchain),
  (pending) => {
    if (address in pending) {
      return pending[address][key] || null
    }
    return null
  },
)
