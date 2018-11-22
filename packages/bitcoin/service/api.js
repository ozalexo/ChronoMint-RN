/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// TODO: to implement validation that provided blockchain exists and throw Error if it does not

/**
 * This is wrapper on real APIs of all Bitcoin-like blockchains (btc, bcc, litecoin).
 * In this module we desides which node will be used.
 * See middleware API documantaion here: https://github.com/ChronoBank/middleware-bitcoin-rest
 */

import * as bitcoinApi from './httpAPI'

/**
 * register new address on middleware
 * @param {string} address
 */
export const requestBitcoinSubscribeWalletByAddress = (address) =>
  bitcoinApi.requestSubscribeWalletByAddress(address)

/**
 * remove an address from middleware
 * @param {string} address
 */
export const requestBitcoinUnubscribeWalletByAddress = (address) =>
  bitcoinApi.requestUnubscribeWalletByAddress(address)

/**
 * retrieve balance of the registered address
 * @param {string} address
 */
export const requestBitcoinBalanceByAddress = (address) =>
  bitcoinApi.requestBalanceByAddress(address)

/**
 * returns an array of unspent transactions (utxo)
 * @param {string} address
 */
export const requestBitcoinUtxoByAddress = (address) =>
  bitcoinApi.requestUtxoByAddress(address)

/**
 * broadcast new transaction to network
 * @param {string} rawTx
 */
export const requestBitcoinSendRawTransaction = (rawTx) =>
  bitcoinApi.requestSendRawTransaction(rawTx)

/**
 * retrieve transactions for the registered adresses [use skip and limit paramters]
 * @param {string} address
 */
export const requestBitcoinTransactionsHistoryByAddress = (address, skip, offset) =>
  bitcoinApi.requestTransactionsHistoryByAddress(address, skip, offset)

/**
 * retrieve transaction by its hash
 * @param {string} txHash
 */
export const requestBitcoinTransactionByHash = (txHash) =>
  bitcoinApi.requestTransactionByHash(txHash)

/**
 * estimate fee rate (based on last 6 blocks)
 */
export const requestBitcoinEstimateFeeRate = () =>
  bitcoinApi.requestEstimateFeeRate()

/**
 * estimate fee rate (based on last 6 blocks)
 */
export const requestBlocksHeight = () =>
  bitcoinApi.requestBlocksHeight()
