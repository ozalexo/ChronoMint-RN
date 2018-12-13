/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as Keychain from 'react-native-keychain'
import { encryptWallet, createEthWallet, mnemonicToPrivateKeyAndAddress } from '../utils'
import { ethereumCreateWallet } from './actions'

// eslint-disable-next-line import/prefer-default-export
export const createAccountByMnemonic = (mnemonic, password) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { privateKey } = mnemonicToPrivateKeyAndAddress(mnemonic)
      await createAccountByPrivateKey(privateKey, password)
      return resolve(privateKey)
    } catch (e) {
      return reject(e)
    }
  })
}

export const createAccountByPrivateKey = (privateKey, password) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      const decryptedWallet = createEthWallet(privateKey)
      const ethAddress = decryptedWallet.address
      
      Keychain.setInternetCredentials(ethAddress, ethAddress, password)
        .then( async () => {
          const encryptedWallet = await encryptWallet(decryptedWallet, password)
          dispatch(ethereumCreateWallet(ethAddress, encryptedWallet))
      
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
