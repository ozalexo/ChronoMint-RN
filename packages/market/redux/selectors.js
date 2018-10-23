/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createSelector } from 'reselect'
import { DUCK_MARKET } from './constants'

// store.market
export const selectDuckMarket = (state) => {
  return state[DUCK_MARKET]
}

// store.market.selectedCurrency
export const selectCurrentCurrency = createSelector(
  selectDuckMarket,
  (market) => market.selectedCurrency
)

// store.market.selectedCoin
export const selectCurrentCoin = createSelector(
  selectDuckMarket,
  (market) => market.selectedCoin
)

// store.market.rates
export const selectMarketRates = createSelector(
  selectDuckMarket,
  (market) => market.rates
)

// store.market.lastMarket
export const selectLastMarket = createSelector(
  selectDuckMarket,
  (market) => market.lastMarket
)

// store.market.tokens
export const selectMarketTokens = createSelector(
  selectDuckMarket,
  (market) => market.tokens
)

// store.market.prices
export const selectMarketPrices = createSelector(
  selectDuckMarket,
  (market) => market.prices
)

// store.market.currencies
export const selectMarketCurrencies = createSelector(
  selectDuckMarket,
  (market) => market.currencies
)
