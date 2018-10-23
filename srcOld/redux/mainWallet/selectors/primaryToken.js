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

export const primaryTokenAmount = (blockchain: string) => createSelector(
  [
    models.getMainWalletBalancesCollection,
    models.tokensStore,
  ],
  (
    balances,
    tokens,
  ) => {

    let walletPrimaryToken: string = '---'
    walletPrimaryToken = getPrimaryToken(blockchain)

    if (walletPrimaryToken !== '---') {
      const primaryBalance: BalanceModel = balances.item(walletPrimaryToken)
      const amount = tokens
        .item(walletPrimaryToken)
        .removeDecimals(primaryBalance.amount())
        .toNumber()
      return {
        amount: amount,
        symbol: walletPrimaryToken,
      }
    } else {
      return {
        amount: null,
        symbol: '---',
      }
    }
  }
)

export const primaryTokenBalance = (blockchain: string) => createSelector(
  [
    primaryTokenAmount(blockchain),
    models.selectedCurrencyStore,
    models.pricesStore,
  ],
  (
    primaryBalanceAndToken,
    selectedCurrency,
    priceList,
  ) => {
    const { balance, symbol }: {balance: BalanceModel, symbol: string} = primaryBalanceAndToken
    if (balance && symbol && symbol !== '---') {
      const tokenPrice = priceList[ symbol ]
        && priceList[ symbol ][ selectedCurrency ]
        || null
      return ( ( balance || 0 ) * ( tokenPrice || 0 ))
    }
    return null
  }
)
