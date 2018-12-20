/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import BigNumber from 'bignumber.js'
import web3utils from 'web3/lib/utils/utils'
import { DECIMALS } from '../constants'

// short to long (with no dot)
export const balanceToAmount = (balance) => {
  const amountBN = new BigNumber(balance.toString())
  return amountBN.multipliedBy(Math.pow(10, DECIMALS))
}

// long to 1.11
export const amountToBalance = (amount) => {
  const balanceBN = new BigNumber(amount)
  return balanceBN.dividedBy(Math.pow(10, DECIMALS))
}

export const convertToWei = (amount) => web3utils.toWei(amount)
