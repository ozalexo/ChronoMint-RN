/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Mnemonic from 'bitcore-mnemonic-react-native'
import hdKey from 'ethereumjs-wallet/hdkey'
import Accounts from 'web3-eth-accounts'

export const DEFAULT_PATH = `m/44'/60'/0'/0/0`

const getDerivedWallet = (mnemonic, path) => {
  const walletPath = !path ? DEFAULT_PATH : path
  const accounts = new Accounts()
  const wallet = accounts.wallet.create()

  const hdWallet = hdKey.fromMasterSeed(mnemonic)
  const w = hdWallet.derivePath(walletPath).getWallet()
  const account = accounts.privateKeyToAccount(`0x${w.getPrivateKey().toString('hex')}`)
  wallet.add(account)

  return wallet[0]
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
