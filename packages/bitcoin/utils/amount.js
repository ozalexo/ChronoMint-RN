/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

 import BigNumber from 'bignumber.js'
 import web3Utils from 'web3-utils'

export const parseByDefaultBitcoinLikeBlockchainBalanceData = (response) => {
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

export const convertToWei = (amount) => web3Utils.toWei(amount)

// const addDecimals = (amount) => {
//   const amountBN = new BigNumber(amount.toString())
//   return amountBN.mul(Math.pow(10, this.decimals()))
// }

// const removeDecimals = (amount) => {
//   const amountBN = new BigNumber(amount)
//   return amountBN.div(Math.pow(10, this.decimals()))
// }
