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

export const updateBitcoinTxDraftRecipient = ({ address, parentAddress, recipient }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinTxDraftUpdateRecipient({ address, parentAddress, recipient }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftAmount = ({ address, parentAddress, amount }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinTxDraftUpdateAmount({ address, parentAddress, amount }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftToken = ({ address, parentAddress, token }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinTxDraftUpdateToken({ address, parentAddress, token }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftFee = ({ address, parentAddress, fee }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinTxDraftUpdateFee({ address, parentAddress, fee }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftFeeMultiplier = ({ address, parentAddress, feeMultiplier }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinTxDraftUpdateFeeMultiplier({ address, parentAddress, feeMultiplier }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftUnsignedTx = ({ address, parentAddress, unsignedTx }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinTxDraftUpdateUnsignedTx({ address, parentAddress, unsignedTx }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinTxDraftSignedTx = ({ address, parentAddress, signedTx }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinTxDraftUpdateSignedTx({ address, parentAddress, signedTx }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const createBitcoinTxDraft = ({ address, parentAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinCreateTxDraft({ address, parentAddress }))
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

export const deleteBitcoinTxDraft = ({ address, parentAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinDeleteTxDraft({ address, parentAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateBitcoinBalance = ({ address, parentAddress, balance, amount }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(bitcoinUpdateBalance({ address, parentAddress, balance, amount }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}
