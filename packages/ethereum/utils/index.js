/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Mnemonic from 'bitcore-mnemonic-react-native'
import hdKey from 'ethereumjs-wallet/hdkey'
import Accounts from 'web3-eth-accounts'
import {WALLET_HD_PATH} from '../constants'

const getDerivedWallet = (mnemonic, path) => {
  const walletPath = !path ? WALLET_HD_PATH : path
  const accounts = new Accounts()
  const wallets = accounts.wallet.create()

  const hdWallet = hdKey.fromMasterSeed(mnemonic)
  const wallet = hdWallet.derivePath(walletPath).getWallet()
  const account = accounts.privateKeyToAccount(`0x${wallet.getPrivateKey().toString('hex')}`)
  wallets.add(account)

  return wallets[0]
}

export const generateMnemonic = async () => {
  const mnemonicObject = new Mnemonic(Mnemonic.Words.ENGLISH)
  const phrase = await mnemonicObject.phrase
  return phrase
}

export const getAddressByMnemonic = (mnemonic, path) => {
  return getDerivedWallet(mnemonic, path).address
}

export const getPrivateKeyByMnemonic = (mnemonic, path) => {
  let privateKey = getDerivedWallet(mnemonic, path).privateKey
  if (privateKey.slice(0, 2) === '0x') {
    privateKey = privateKey.slice(2)
  }
  return privateKey
}
