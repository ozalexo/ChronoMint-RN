/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { getAddress } from '@chronobank/bitcoin/utils'
import { bitcoinCreateWallet } from '@chronobank/bitcoin/redux/actions'
import { ethereumCreateWallet } from '@chronobank/ethereum/redux/actions'
import { encryptWallet, decryptWallet, checkPrivateKey } from '@chronobank/ethereum/utils'
import * as Keychain from 'react-native-keychain'
import { login, logout, savePrivateKey } from './actions'

export const loginThunk = (mnemonic, password) => async (dispatch) => {
  try {

    const encryptedWallet = await encryptWallet(mnemonic, password)
    const decryptedWallet = await decryptWallet(encryptedWallet, password)
    const privateKey = checkPrivateKey(decryptedWallet.privateKey)
    const ethAddress = decryptedWallet.address
    const bitcoinAddress = getAddress(privateKey)

    await Keychain.setInternetCredentials(ethAddress, ethAddress, password).then(async () => {

      try {
        // Retreive the credentials
        const credentials = await Keychain.getInternetCredentials(ethAddress)
        console.log(credentials)
        if (credentials) {
          console.log('Credentials successfully loaded for user ' + credentials.username)
        } else {
          console.log('No credentials stored')
        }
      } catch (error) {
        console.log('Keychain couldn\'t be accessed!', error)
      }
    })
    dispatch(ethereumCreateWallet(ethAddress))
    dispatch(savePrivateKey(decryptedWallet.privateKey))

    dispatch(bitcoinCreateWallet(ethAddress, bitcoinAddress))
    dispatch(login(ethAddress))
  } catch (e) {
    console.log(e)
    return Promise.reject(e)
  }
}

export const logoutThunk = () => (dispatch) => {
  try {
    return dispatch(logout())
  } catch (e) {
    return Promise.reject(e)
  }
}
