/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as Keychain from 'react-native-keychain'
// import { getAddress } from '@chronobank/bitcoin/utils'
import { savePrivateKey } from '@chronobank/session/redux/actions'
// import { bitcoinCreateWallet } from '@chronobank/bitcoin/redux/actions'
import { encryptWallet, createEthWallet } from '../utils'
import { ethereumCreateWallet } from './actions'

// eslint-disable-next-line import/prefer-default-export
export const createAccount = (mnemonic, password) => async (dispatch) => {
  try {
    const decryptedWallet = createEthWallet(mnemonic)
    const ethAddress = decryptedWallet.address
    // const bitcoinAddress = getAddress(decryptedWallet.privateKey)
    
    await Keychain.setInternetCredentials(ethAddress, ethAddress, password)
    
    const encryptedWallet = await encryptWallet(decryptedWallet, password)
    dispatch(ethereumCreateWallet(ethAddress, encryptedWallet))

    dispatch(savePrivateKey(decryptedWallet.privateKey))
    // dispatch(bitcoinCreateWallet(ethAddress, bitcoinAddress))
    // dispatch(login(ethAddress))
  } catch (e) {
    return Promise.reject(e)
  }
}
