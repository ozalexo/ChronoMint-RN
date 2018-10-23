/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import {
  createSelector,
} from 'reselect'
import * as models from './models'

const filteredBalances = (blockchain: string) => createSelector(
  [
    models.getMainWalletBalancesListStore,
    models.tokensStore,
  ],
  (
    balances,
    tokens,
  ) => {
    return balances
      .filter( (balance) => {
        const symbol = balance.symbol()
        const token = symbol && tokens.item(symbol)
        return token && token.blockchain() === blockchain
      })
  }
)

export const filteredBalancesAndTokens = (blockchain: string) => createSelector(
  [
    filteredBalances(blockchain),
    models.tokensStore,
  ],
  (
    balances,
    tokens,
  ) => {
    return balances
      .map( (balance) => {
        return {
          balance: balance,
          token: tokens.item(balance.symbol()),
        }
      })
  }
)

const balanceCalculator = (blockchain: string) => createSelector(
  [
    filteredBalancesAndTokens(blockchain),
    models.selectedCurrencyStore,
    models.pricesStore,
  ],
  (
    balances,
    selectedCurrency,
    priceList,
  ) => {
    return balances
      .reduce( (accumulator, tokenBalance) => {
        if (tokenBalance) {
          const symbol = Object.keys(tokenBalance)[0]
          const balance = Object.values(tokenBalance)[0]
          const tokenPrice = priceList[ symbol ]
            && priceList[ symbol ][ selectedCurrency ]
            || null
          accumulator += ( ( balance || 0 ) * ( tokenPrice || 0 ))
        }
        return accumulator
      }, 0)
  }
)

/**
 * Provides balance of selected main wallet
 * Output example:
 * 33.234234
*/
export const walletBalanceSelector = (blockchain: string) => createSelector(
  [
    balanceCalculator(blockchain),
  ],
  (
    calculatedBalance,
  ) => {
    return calculatedBalance
  }
)
