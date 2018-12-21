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

export const updateEthereumBalance = ({ tokenSymbol, address, balance, amount }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumUpdateBalance({ tokenSymbol, address, balance, amount }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const selectEthereumWallet = ({ address }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.selectEthereumWallet({ address }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const createEthereumTxDraft = ({ address, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.createEthereumTxDraft({ address, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const deleteEthereumTxDraft = ({ masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.deleteEthereumTxDraft({ masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftNonce = ({ nonce, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftNonce({ nonce, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftGasLimit = ({ gasLimit, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftGasLimit({ gasLimit, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftGasPrice = ({ gasPrice, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftGasPrice({ gasPrice, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftChainId = ({ chainId, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftChainId({ chainId, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftTo = ({ to, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftTo({ to, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftValue = ({ value, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftValue({ value, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftData = ({ data, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftData({ data, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftUnsignedTx = ({ unsignedTx, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftUnsignedTx({ unsignedTx, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftSignedTx = ({ signedTx, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftSignedTx({ signedTx, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}
