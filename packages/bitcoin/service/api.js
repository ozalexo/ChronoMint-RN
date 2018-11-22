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

import { BLOCKCHAIN_BITCOIN } from '../constants'
import * as bitcoinApi from './httpAPI'

const chainsMapping = {
  [BLOCKCHAIN_BITCOIN]: bitcoinApi,
}

/**
 * register new address on middleware
 * @param {string} address
 */
export const requestBitcoinSubscribeWalletByAddress = (blockchain, address) =>
  chainsMapping[blockchain].requestSubscribeWalletByAddress(address)

/**
 * remove an address from middleware
 * @param {string} address
 */
export const requestBitcoinUnubscribeWalletByAddress = (blockchain, address) =>
  chainsMapping[blockchain].requestUnubscribeWalletByAddress(address)

/**
 * retrieve balance of the registered address
 * @param {string} address
 */
export const requestBitcoinBalanceByAddress = (blockchain, address) =>
  chainsMapping[blockchain].requestBalanceByAddress(address)

/**
 * returns an array of unspent transactions (utxo)
 * @param {string} address
 */
export const requestBitcoinUtxoByAddress = (blockchain, address) =>
  chainsMapping[blockchain].requestUtxoByAddress(address)

/**
 * broadcast new transaction to network
 * @param {string} rawTx
 */
export const requestBitcoinSendRawTransaction = (blockchain, rawTx) =>
  chainsMapping[blockchain].requestSendRawTransaction(rawTx)

/**
 * retrieve transactions for the registered adresses [use skip and limit paramters]
 * @param {string} address
 */
export const requestBitcoinTransactionsHistoryByAddress = (blockchain, address, skip, offset) =>
  chainsMapping[blockchain].requestTransactionsHistoryByAddress(address, skip, offset)

/**
 * retrieve transaction by its hash
 * @param {string} txHash
 */
export const requestBitcoinTransactionByHash = (blockchain, txHash) =>
  chainsMapping[blockchain].requestTransactionByHash(txHash)

/**
 * estimate fee rate (based on last 6 blocks)
 */
export const requestBitcoinEstimateFeeRate = (blockchain) =>
  chainsMapping[blockchain].requestEstimateFeeRate()

/**
 * estimate fee rate (based on last 6 blocks)
 */
export const requestBlocksHeight = (blockchain) =>
  chainsMapping[blockchain].requestBlocksHeight()
