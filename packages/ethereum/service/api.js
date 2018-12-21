/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// TODO: to implement validation that provided blockchain exists and throw Error if it does not

/**
 * This is wrapper on real APIs of all Ethereum-like blockchains.
 * In this module we desides which node will be used.
 * See middleware API documantaion here: https://github.com/ChronoBank/middleware-ethereum-rest
 */

import * as ethereumAPI from './httpAPI'

/**
 * register new address on middleware
 * @param {string} address
 */
export const requestEthereumSubscribeWalletByAddress = (address) =>
  ethereumAPI.requestSubscribeWalletByAddress(address)

/**
 * remove an address from middleware
 * @param {string} address
 */
export const requestEthereumUnubscribeWalletByAddress = (address) =>
  ethereumAPI.requestUnubscribeWalletByAddress(address)

/**
 * retrieve balance of the registered address
 * @param {string} address
 */
export const requestEthereumBalanceByAddress = (address) =>
  ethereumAPI.requestBalanceByAddress(address)

/**
 * retrieve transactions for the registered adresses [use skip and limit paramters]
 * @param {string} address
 */
export const requestEthereumTransactionsHistoryByAddress = (address, skip, offset) =>
  ethereumAPI.requestTransactionsHistoryByAddress(address, skip, offset)

/**
 * retrieve transaction by its hash
 * @param {string} txHash
 */
export const requestEthereumTransactionByHash = (txHash) =>
  ethereumAPI.requestTransactionByHash(txHash)

// /**
//  * estimate fee rate (based on last 6 blocks)
//  */
// export const requestEthereumEstimateFeeRate = () =>
//   ethereumAPI.requestEstimateFeeRate()

/**
 * estimate fee rate (based on last 6 blocks)
 */
export const requestBlocksHeight = () =>
  ethereumAPI.requestBlocksHeight()
