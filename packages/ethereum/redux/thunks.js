/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as Keychain from 'react-native-keychain'
import { encryptWallet, createEthWallet } from '../utils'
import { ethereumCreateWallet } from './actions'

// eslint-disable-next-line import/prefer-default-export
export const createAccount = (mnemonic, password) => async (dispatch) => {
  try {
    const decryptedWallet = createEthWallet(mnemonic)
    const ethAddress = decryptedWallet.address
    
    await Keychain.setInternetCredentials(ethAddress, ethAddress, password)
    
    const encryptedWallet = await encryptWallet(decryptedWallet, password)
    dispatch(ethereumCreateWallet(ethAddress, encryptedWallet))

    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}
