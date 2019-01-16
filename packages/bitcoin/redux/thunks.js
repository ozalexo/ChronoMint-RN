/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  getAddress,
  parallelPromises,
  processBalanceUpdateResponseBody,
  processTransactionUpdateResponseBody,
} from '../utils'
import { requestBitcoinTransactionsHistoryByAddress } from '../service/api'
import { convertSatoshiToBTC, parseBitcoinBalanceData } from '../utils/amount'
import * as apiBTC from '../service/api'
import * as Actions from './actions'
import * as Selectors from './selectors'

export const createBitcoinWallet = ({ privateKey, masterWalletAddress, networkType }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      const bitcoinAddress = getAddress(privateKey, networkType)
      dispatch(Actions.bitcoinCreateWallet(masterWalletAddress, bitcoinAddress))
      return resolve(bitcoinAddress)
    } catch (error) {
      return reject(error)
    }
  })
}

export const selectBitcoinWallet = ({ address, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(requestBitcoinTransactionsHistoryByAddress(address))
        .then((response) => {
          const timestamps = []
          const txList = response.payload.data.map((tx) => {
            timestamps.push(tx.timestamp)
            return {
              from: tx.inputs[0].address,
              to: tx.outputs[0].address,
              amount: tx.outputs[0].value,
              balance: convertSatoshiToBTC(tx.outputs[0].value),
              timestamp: tx.timestamp,
              hash: tx.hash,
              confirmations: tx.confirmations,
            }
          })
          dispatch(updateBitcoinTxHistory({
            address,
            masterWalletAddress,
            txList,
            latestTxDate: Math.max(...timestamps),
            withReset: true,
          }))
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error)
        })
      dispatch(Actions.bitcoinSelectWallet(address))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftRecipient = ({ address, masterWalletAddress, recipient }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxDraftUpdateRecipient({ address, masterWalletAddress, recipient }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftAmount = ({ address, masterWalletAddress, amount }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxDraftUpdateAmount({ address, masterWalletAddress, amount }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxHistory = ({ latestTxDate, txList, masterWalletAddress, address, withReset = false }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxUpdateHistory({ latestTxDate, txList, masterWalletAddress, address, withReset }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftToken = ({ address, masterWalletAddress, token }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxDraftUpdateToken({ address, masterWalletAddress, token }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftFee = ({ address, masterWalletAddress, fee }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxDraftUpdateFee({ address, masterWalletAddress, fee }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftFeeMultiplier = ({ address, masterWalletAddress, feeMultiplier }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxDraftUpdateFeeMultiplier({ address, masterWalletAddress, feeMultiplier }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftUnsignedTx = ({ address, masterWalletAddress, unsignedTx }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxDraftUpdateUnsignedTx({ address, masterWalletAddress, unsignedTx }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftSignedTx = ({ address, masterWalletAddress, signedTx }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinTxDraftUpdateSignedTx({ address, masterWalletAddress, signedTx }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const createBitcoinTxDraft = ({ address, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinCreateTxDraft({ address, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const dropBitcoinSelectedWallet = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinDropSelectedWallet())
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const deleteBitcoinTxDraft = ({ address, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.bitcoinDeleteTxDraft({ address, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinBalance = ({ address, masterWalletAddress, balance, amount }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      // console.log('updateBitcoinBalance 001', address, masterWalletAddress, balance, amount)
      dispatch(Actions.bitcoinUpdateBalance({ address, masterWalletAddress, balance, amount }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

// Process body from HTTP response (BTC balance) and update store
export const balanceUpdateHandler = (address, masterWalletAddress) => (body) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      const updatedData = processBalanceUpdateResponseBody(body, address, masterWalletAddress)
      console.log('balanceUpdateHandler 002 updatedData', updatedData)
      dispatch(updateBitcoinBalance(updatedData))
        .then(() => {
          return resolve()
        })
        .catch((error) => {
          return reject(error)
        })
    } catch (error) {
      return reject(error)
    }
  })
}

// Process body from HTTP response (BTC transaction) and update store
export const transactionUpdateHandler = (address, masterWalletAddress) => (body) => (dispatch) => {
  return new Promise((resolve, reject) => {
    if (!body) {
      return reject('Error BTC002: no transaction data to update.')
    }

    try {
      const updatedData = processTransactionUpdateResponseBody(body, address, masterWalletAddress)

      dispatch(updateBitcoinTxHistory(updatedData))
        .then(() => {
          return resolve()
        })
        .catch((error) => {
          return reject(error)
        })
    } catch (error) {
      return reject(error)
    }
  })
}

export const requestAndSubscribeBitcoinWallets = (masterWalletAddress) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    try {
      const state = getState()
      const btcWalletAddressList = Selectors.getBitcoinWalletsList(masterWalletAddress)(state)
      const promises = btcWalletAddressList.reduce((acc, address) => {
        return acc.concat([
          () => dispatch(apiBTC.requestBitcoinSubscribeWalletByAddress(address)),
          () => dispatch(apiBTC.requestBitcoinBalanceByAddress(address))
            .then((balance) => {
              dispatch(updateBitcoinBalance({
                address,
                masterWalletAddress,
                balance: parseBitcoinBalanceData(balance),
                amount: balance.payload.data.confirmations0.amount || balance.payload.data.confirmations6.amount,
              }))
            }),

        ])}, []
      )
    
      return resolve(parallelPromises(promises))
    } catch (error) {
      return reject(error)
    }
  })
}

