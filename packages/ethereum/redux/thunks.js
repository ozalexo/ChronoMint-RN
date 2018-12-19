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
      dispatch(Actions.ethereumCreateWallet(ethAddress, encryptedWallet))
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