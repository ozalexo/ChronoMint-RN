/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import BigNumber from 'bignumber.js'
import { DECIMALS } from '../constants'

export const parseBitcoinBalanceData = (response) => {
  const {
    confirmations0,
    confirmations3,
    confirmations6,
  } = response.payload.data
  const result = {
    balance0: new BigNumber(confirmations0.satoshis),
    balance3: new BigNumber(confirmations3.satoshis),
    balance6: new BigNumber(confirmations6.satoshis),
  }
  return result.balance0 || result.balance6
}

export const convertSatoshiToBTC = (satoshiAmount) => {
  return new BigNumber(satoshiAmount / DECIMALS)
}

export const convertBTCToSatoshi = (BTC) => {
  return new BigNumber(BTC * DECIMALS)
}

