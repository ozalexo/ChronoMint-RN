/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { getAddress } from '@chronobank/bitcoin/utils'
import { login, savePrivateKey } from '@chronobank/session/redux/actions'
import { bitcoinCreateWallet } from '@chronobank/bitcoin/redux/actions'
import { encryptWallet, decryptWallet, checkPrivateKey } from '../utils'
import { ethereumCreateWallet } from './actions'
import * as Keychain from 'react-native-keychain'

export const createAccount = (mnemonic, password) => async (dispatch) => {
  try {
    const encryptedWallet = await encryptWallet(mnemonic, password)
    const decryptedWallet = await decryptWallet(encryptedWallet, password)
    const privateKey = checkPrivateKey(decryptedWallet.privateKey)
    const ethAddress = decryptedWallet.address
    const bitcoinAddress = getAddress(privateKey)

    await Keychain.setInternetCredentials(ethAddress, ethAddress, password)

    dispatch(ethereumCreateWallet(ethAddress))
    dispatch(savePrivateKey(decryptedWallet.privateKey))

    dispatch(bitcoinCreateWallet(ethAddress, bitcoinAddress))
    dispatch(login(ethAddress))
  } catch (e) {
    console.log(e)
    return Promise.reject(e)
  }
}