/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as Keychain from 'react-native-keychain'
import { encryptWallet, createEthWallet, mnemonicToPrivateKeyAndAddress } from '../utils'
import * as Actions from './actions'

// eslint-disable-next-line import/prefer-default-export
export const createAccountByMnemonic = (mnemonic, password) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { privateKey } = mnemonicToPrivateKeyAndAddress(mnemonic)
      const derivedPrivateKey = await dispatch(createAccountByPrivateKey(privateKey, password))
      return resolve(derivedPrivateKey)
    } catch (error) {
      return reject(error)
    }
  })
}

export const createAccountByPrivateKey = (privateKey, password) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const decryptedWallet = createEthWallet(privateKey)
      const ethAddress = decryptedWallet.address
      const encryptedWallet = await encryptWallet(decryptedWallet, password)

      if (!ethAddress) {
        return reject('0001: No ETH address!')
      }
      if (!encryptedWallet) {
        return reject('0002: No ETH encrypted wallet!')
      }

      dispatch(Actions.ethereumCreateWallet(ethAddress, encryptedWallet, decryptedWallet.path))
      await Keychain.setInternetCredentials(ethAddress, ethAddress, password)

      return resolve(decryptedWallet.privateKey)
    } catch (error) {
      return reject(error)
    }
  })
}

export const ethereumUpdateBalance = ({ tokenSymbol, address, balance, amount }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumUpdateBalance({ tokenSymbol, address, balance, amount }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const ethereumSelectWallet = ({ address }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumSelectWallet(address))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const ethereumCreateTxDraft = ({ address, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumCreateTxDraft({ address, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const ethereumDeleteTxDraft = ({ masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumDeleteTxDraft({ masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const ethereumUpdateTxDraftNonce = ({ nonce, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumUpdateTxDraftNonce({ nonce, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const ethereumUpdateTxDraftGasLimit = ({ gasLimit, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumUpdateTxDraftGasLimit({ gasLimit, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const ethereumUpdateTxDraftGasPrice = ({ gasPrice, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumUpdateTxDraftGasPrice({ gasPrice, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const ethereumUpdateTxDraftChainId = ({ chainId, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumUpdateTxDraftChainId({ chainId, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const ethereumUpdateTxDraftTo = ({ to, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumUpdateTxDraftTo({ to, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const ethereumUpdateTxDraftValue = ({ value, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumUpdateTxDraftValue({ value, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const ethereumUpdateTxDraftData = ({ data, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumUpdateTxDraftData({ data, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const ethereumUpdateTxDraftUnsignedTx = ({ unsignedTx, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumUpdateTxDraftUnsignedTx({ unsignedTx, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const ethereumUpdateTxDraftSignedTx = ({ signedTx, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumUpdateTxDraftSignedTx({ signedTx, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}
