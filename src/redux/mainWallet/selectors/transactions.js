/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

//#region imports

import {
  createSelector,
  createSelectorCreator,
  defaultMemoize,
} from 'reselect'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/core/dao/EthereumDAO'
import { mainWalletStore } from './models'
import { selectTokensStore, makeGetTokenSymbolListByBlockchainName } from './tokens'

//#endregion

//#region models

export const getTxsFromDuck = (state: any) =>
  mainWalletStore(state)
    .transactions()

export const getTxsList = (state: any) =>
  mainWalletStore(state)
    .transactions()
    .list()

export const getTxs = () => createSelector(
  [ getTxsFromDuck ],
  (txs) => txs
)

//#endregion

//#region fetching status selector

export const getTxsFetchingStatus = createSelector(
  [ getTxsFromDuck ],
  (txs) => {
    const status = txs.toJS()
    return {
      isFailed: status.isFailed,
      isFetched: status.isFetched,
      isFetching: status.isFetching,
      isInited: status.isInited,
      isPending: status.isPending,
      isSelected: status.isSelected,
    }
  }
)

const createEqFetchingStatusTransactions = createSelectorCreator(
  defaultMemoize,
  (aTx, bTx) => {
    if (aTx.isFailed !== bTx.isFailed ||
      aTx.isFetched !== bTx.isFetched ||
      aTx.isFetching !== bTx.isFetching ||
      aTx.isInited !== bTx.isInited ||
      aTx.isPending !== bTx.isPending ||
      aTx.isSelected !== bTx.isSelected
    ) {
      return false
    }

    return true
  }
)

export const mwTxFetchingStatus = createEqFetchingStatusTransactions(
  [
    getTxsFetchingStatus,
  ],
  (txFetchingStatus) => {
    return txFetchingStatus
  }
)

//#endregion

//#region list transactions selector

export const listTransactions = (blockchain: string, address: string) => {
  const getTokenSymbolListByBlockchainName = makeGetTokenSymbolListByBlockchainName(blockchain)
  return createSelector(
    [
      getTxsList,
      selectTokensStore,
      getTokenSymbolListByBlockchainName,
    ],
    (
      mainWalletTransactionsList,
      mainWalletTokens,
      mainWalletTokensSymbolList,
    ) => {

      //#region internal utils
      const calculateConfirmations = (chainBlockNumber, txBlockNumber) => {
        // blockNumber eq -1 (BTC) or undefined (ETH) in case of unconfirmed transaction
        if (
          chainBlockNumber === null ||
          chainBlockNumber === undefined ||
          txBlockNumber === -1 ||
          txBlockNumber === null ||
          txBlockNumber === undefined
        ) {
          return 0
        }

        const diff = chainBlockNumber && chainBlockNumber - txBlockNumber
        if (diff === false) {
          return 0
        }

        if (diff >= 4) {
          return 4
        }

        return diff
      }

      const convertAmountToNumber = (symbol, amount) => {
        if (symbol) {
          return mainWalletTokens
            .item(symbol)
            .removeDecimals(amount)
            .toNumber()
        } else {
          return null
        }
      }

      const calculateTransactionDirection = (fromAddr: string, toAddr: string, myAddress: string) => {
        let isReceivingTransaction = null
        if (blockchain === BLOCKCHAIN_ETHEREUM) {
          isReceivingTransaction = toAddr && toAddr
            .split(',')
            .map( (recipient) => recipient.toLowerCase() )
            .includes(myAddress.toLowerCase())
          return isReceivingTransaction
            ? 'receiving'
            : 'sending'
        } else {
          const isFrom = fromAddr.split(',')
            .map( (recipient) => recipient.toLowerCase() )
            .includes(myAddress.toLowerCase())
          const isTo = toAddr.split(',')
            .map( (recipient) => recipient.toLowerCase() )
            .includes(myAddress.toLowerCase())
          if (isFrom) {
            return 'sending'
          }
          if (isTo) {
            return 'receiving'
          }
        }
      }

      const calculateTxDisplayAddress = (transactionDirection: string, fromAddr: string, toAddr: string, myAddress: string) => {
        if (blockchain === BLOCKCHAIN_ETHEREUM) {
          return transactionDirection === 'receiving'
            ? fromAddr
            : toAddr
        } else {
          return transactionDirection === 'receiving'
            ? fromAddr
            : toAddr.split(',').filter((addr)  => addr !== myAddress)[0] || myAddress // FIXME: logic of selection what to display must be verified
        }
      }

      //#endregion

      const chainData = mainWalletTokens.latestBlocksForBc(blockchain)
      const latestBlockNumber = chainData && chainData['blockNumber']
      const transactions = mainWalletTransactionsList
        .filter( (txModel: TxModel) => {
          const isNeedIt = mainWalletTokensSymbolList.includes(txModel.symbol()) // if symbol of a transaction in range of current blockchain
            && [...txModel.to().split(','), ...txModel.from().split(',')].includes(address) // if to or from address of a transaction contians curent wallet's address
          return isNeedIt
        })
        .map( (txModel: TxModel) => {
          const blockNumber = txModel.blockNumber()
          const recipient = txModel.to()
          const fee = txModel.fee()
          const fromAddress = txModel.from()
          const txSymbol = txModel.symbol()
          const transactionDirection = calculateTransactionDirection(fromAddress, recipient, address)

          return {
            blockNumber,
            fee: convertAmountToNumber(txSymbol, fee),
            type: transactionDirection,
            address: calculateTxDisplayAddress(transactionDirection, fromAddress, recipient, address),
            amount: convertAmountToNumber(txSymbol, txModel.value()),
            symbol: txSymbol,
            confirmations: calculateConfirmations(latestBlockNumber, blockNumber),
            txDate: parseInt(txModel.get('time'), 10),
          }
        })
        .toArray()
        .sort( ({ txDate: a }, { txDate: b }) =>
          (a < b) - (a > b)
        )
      const latestTransactionDate = transactions && ( transactions[0] !== undefined ) && transactions[0].txDate || null
      return {
        transactions,
        latestTransactionDate,
      }
    }
  )
}

const createEqListTransactions = createSelectorCreator(
  defaultMemoize,
  (a, b) => {
    if (a.transactions.length !== b.transactions.length || a.latestTransactionDate !== b.latestTransactionDate) {
      return false
    }

    let compareResult = true

    for (let i = 0; i++; i <= aTxList.length) {
      const aTx = a.transactions[i]
      const bTx = b.transactions[i]
      if (aTx.blockNumber !== bTx.blockNumber ||
        aTx.fee !== bTx.fee ||
        aTx.type !== bTx.type ||
        aTx.address !== bTx.address ||
        aTx.amount !== bTx.amount ||
        aTx.symbol !== bTx.symbol ||
        aTx.confirmations !== bTx.confirmations ||
        aTx.txDate !== bTx.txDate
      ) {
        compareResult = false
        break
      }
    }

    return compareResult
  }
)

export const listEQTransactions = (blockchain: string, address: string) => {
  return createEqListTransactions(
    [
      listTransactions(blockchain, address),
    ],
    (
      eqTxList,
    ) => {
      return eqTxList
    }
  )
}

//#endregion
