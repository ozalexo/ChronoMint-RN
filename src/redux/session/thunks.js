/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { getAddress } from '@chronobank/bitcoin/utils'
import { bitcoinCreateWallet } from '@chronobank/bitcoin/redux/actions'
import { ethereumCreateWallet } from '@chronobank/ethereum/redux/actions'
import { getPrivateKeyByMnemonic, getAddressByMnemonic } from '@chronobank/ethereum/utils'
import { login, logout, savePrivateKey } from './actions'

export const loginThunk = (mnemonic) => (dispatch) => {
  try {
    const privateKey = getPrivateKeyByMnemonic(mnemonic)
    const bitcoinAddress = getAddress(privateKey)
    const ethAddress = getAddressByMnemonic(mnemonic)
    dispatch(ethereumCreateWallet(ethAddress))
    dispatch(bitcoinCreateWallet(ethAddress, bitcoinAddress))
    dispatch(savePrivateKey(privateKey))
    dispatch(login(ethAddress))
  } catch (e) {
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
