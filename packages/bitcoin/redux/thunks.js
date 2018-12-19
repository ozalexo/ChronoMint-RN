/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { getCurrentNetwork } from '@chronobank/network/redux/selectors'
import { getAddress } from '../utils'
import {
  bitcoinCreateWallet,
  bitcoinUpdateBalance,
  bitcoinSelectWallet,
  bitcoinCreateTxDraft,
  bitcoinDropSelectedWallet,
  bitcoinDeleteTxDraft,
  bitcoinTxDraftUpdateRecipient,
  bitcoinTxDraftUpdateAmount,
  bitcoinTxDraftUpdateToken,
  bitcoinTxDraftUpdateFee,
  bitcoinTxDraftUpdateFeeMultiplier,
  bitcoinTxDraftUpdateUnsignedTx,
  bitcoinTxDraftUpdateSignedTx,
  bitcoinTxUpdateHistory,
} from './actions'

export const createBitcoinWallet = (privateKey, ethAddress) => (dispatch, getState) => {

  return new Promise((resolve, reject) => {
    try {
      const network = getCurrentNetwork(getState()).networkType
      const bitcoinAddress = getAddress(privateKey, network)
      dispatch(bitcoinCreateWallet(ethAddress, bitcoinAddress))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const selectBitcoinWallet = ({ address }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinSelectWallet(address))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftRecipient = ({ address, masterWalletAddress, recipient }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinTxDraftUpdateRecipient({ address, masterWalletAddress, recipient }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftAmount = ({ address, masterWalletAddress, amount }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinTxDraftUpdateAmount({ address, masterWalletAddress, amount }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxHistory = ({ latestTxDate, txList, parentAddress, address }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinTxUpdateHistory({ latestTxDate, txList, parentAddress, address }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftToken = ({ address, masterWalletAddress, token }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinTxDraftUpdateToken({ address, masterWalletAddress, token }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftFee = ({ address, masterWalletAddress, fee }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinTxDraftUpdateFee({ address, masterWalletAddress, fee }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftFeeMultiplier = ({ address, masterWalletAddress, feeMultiplier }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinTxDraftUpdateFeeMultiplier({ address, masterWalletAddress, feeMultiplier }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftUnsignedTx = ({ address, masterWalletAddress, unsignedTx }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinTxDraftUpdateUnsignedTx({ address, masterWalletAddress, unsignedTx }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftSignedTx = ({ address, masterWalletAddress, signedTx }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinTxDraftUpdateSignedTx({ address, masterWalletAddress, signedTx }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const createBitcoinTxDraft = ({ address, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinCreateTxDraft({ address, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const dropBitcoinSelectedWallet = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinDropSelectedWallet())
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const deleteBitcoinTxDraft = ({ address, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinDeleteTxDraft({ address, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinBalance = ({ address, masterWalletAddress, balance, amount }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinUpdateBalance({ address, masterWalletAddress, balance, amount }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}
