/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import BigNumber from 'bignumber.js'
import web3utils from 'web3/lib/utils/utils'
import { DECIMALS } from '../constants'

/**
 * Converts a number to BigNumber with Ethereum decimals
 * @param {number} balance 
 */
export const balanceToAmount = (balance) => {
  try {
    const amountBN = new BigNumber(balance.toString())
    return amountBN.multipliedBy(Math.pow(10, DECIMALS))
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// long to 1.11
export const amountToBalance = (amount) => {
  try {
    const balanceBN = new BigNumber(amount)
    return balanceBN.dividedBy(Math.pow(10, DECIMALS))
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const convertToWei = (amount) => web3utils.toWei(amount)
