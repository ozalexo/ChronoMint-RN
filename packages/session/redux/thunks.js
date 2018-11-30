/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { getAddress } from '@chronobank/bitcoin/utils'
import { bitcoinCreateWallet } from '@chronobank/bitcoin/redux/actions'
import { ethereumCreateWallet } from '@chronobank/ethereum/redux/actions'
import { encryptWallet, decryptWallet, checkPrivateKey } from '@chronobank/ethereum/utils'
import { login, logout, savePrivateKey } from './actions'

export const loginThunk = (mnemonic, password) => async (dispatch) => {
  try {

    const encryptedWallet = await encryptWallet(mnemonic, password)
    const decryptedWallet = await decryptWallet(encryptedWallet, password)
    const privateKey = checkPrivateKey(decryptedWallet.privateKey)
    const ethAddress = decryptedWallet.address
    const bitcoinAddress = getAddress(privateKey)

    dispatch(ethereumCreateWallet(ethAddress))
    dispatch(bitcoinCreateWallet(ethAddress, bitcoinAddress))
    dispatch(savePrivateKey(privateKey))
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
