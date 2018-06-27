/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import {
  createSelector,
} from 'reselect'
import type BalanceModel from '@chronobank/core/models/tokens/BalanceModel'
import { getPrimaryToken } from './utils'
import * as models from './models'

const primaryBalanceAndToken = (blockchain: string) => createSelector(
  [
    models.getMainWalletBalancesCollection,
    models.tokensStore,
  ],
  (
    balances,
    tokens,
  ) => {

    let symbol: string = '---'
    symbol = getPrimaryToken(blockchain)

    if (symbol !== '---') {
      const primaryBalance: BalanceModel = balances.item(symbol)
      const amount = tokens
        .item(symbol)
        .removeDecimals(primaryBalance.amount())
        .toNumber()
      return {
        amount,
        symbol,
      }
    } else {
      return {
        amount: null,
        symbol: null,
      }
    }
  }
)

type TBalanceAndToken = {
  amount: BalanceModel,
  symbol: TokenModel,
}
const primaryBalanceCalculator = (blockchain: string) => createSelector(
  [
    primaryBalanceAndToken(blockchain),
    models.selectedCurrencyStore,
    models.pricesStore,
  ],
  (
    primaryBalanceAndToken,
    selectedCurrency,
    priceList,
  ) => {
    const { amount, symbol }: TBalanceAndToken = primaryBalanceAndToken
    if (amount && symbol && symbol !== '---') {
      const tokenPrice = priceList[ symbol ]
        && priceList[ symbol ][ selectedCurrency ]
        || null
      return ( ( amount || 0 ) * ( tokenPrice || 0 ))
    }
    return 0
  }
)

/**
 * Provides balance of primary token of selected main wallet
 * Output example:
 * 33.234234
*/
// eslint-disable-next-line import/prefer-default-export
export const walletPrimaryBalanceSelector = (blockchain: string) => createSelector(
  [
    primaryBalanceCalculator(blockchain),
  ],
  (
    primaryBalance,
  ) => {
    return primaryBalance
  }
)
