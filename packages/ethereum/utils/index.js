/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Mnemonic from 'bitcore-mnemonic-react-native'
import hdKey from 'ethereumjs-wallet/hdkey'
import Accounts from 'web3-eth-accounts'
import { WALLET_HD_PATH } from '../constants'
import { amountToBalance } from './amount'

const getDerivedWalletByPrivateKey = (privateKey, path = WALLET_HD_PATH) => {
  const accounts = new Accounts()
  const wallets = accounts.wallet.create()
  const hdWallet = hdKey.fromMasterSeed(Buffer.from(privateKey, 'hex')).derivePath(path)
  const wallet = hdWallet.getWallet()
  const account = accounts.privateKeyToAccount(wallet.getPrivateKeyString())

  wallets.add(account)
  const newWallet = wallets[0]
  newWallet.path = path

  return newWallet
}

export const generateMnemonic = async () => {
  const mnemonicObject = new Mnemonic(Mnemonic.Words.ENGLISH)
  const phrase = await mnemonicObject.phrase
  return phrase
}

export const decryptWallet = async (entry, password) => {
  const accounts = new Accounts()
  const wallet = await accounts.wallet.decrypt([entry], password)

  return wallet[0]
}

export const mnemonicToPrivateKeyAndAddress = (mnemonic, path = WALLET_HD_PATH) => {
  const accounts = new Accounts()
  const wallets = accounts.wallet.create()
  const mnemonicSeed = new Mnemonic(mnemonic, Mnemonic.Words.ENGLISH).toSeed()
  const hdWallet = hdKey.fromMasterSeed(mnemonicSeed)
  const hdkey = hdWallet.derivePath(path)._hdkey
  const account = accounts.privateKeyToAccount(`0x${hdkey._privateKey.toString('hex')}`)
  wallets.add(account)
  const newWallet = wallets[0]
  newWallet.path = path
  return newWallet
}

export const createEthWallet = (privateKey) => {
  const wallet = getDerivedWalletByPrivateKey(privateKey)
  return wallet
}

export const getAddress = (privateKey) => {
  if (!privateKey) {
    throw new Error('0004: Can\'t create ETH wallet without privateKey')
  }

  const wallet = createEthWallet(privateKey)
  return wallet.address
}

export const encryptWallet = async (wallet, password) => {
  // Simplified encryption to speedup decription on mobile devices
  // Original: const encryptWallet = await wallet.encrypt(password)
  const encryptWallet = await wallet.encrypt(password, { n: 128, r: 1, p: 1 })
  return encryptWallet
}

export const checkPrivateKey = (privateKey) => {
  let finalPrivate = privateKey
  if (finalPrivate.slice(0, 2) === '0x') {
    finalPrivate = finalPrivate.slice(2)
  }
  return finalPrivate
}

export const signEthTransaction = ({ tx, privateKey }) => {
  const accounts = new Accounts()
  const signedTx = accounts.signTransaction(tx, privateKey)
  return signedTx
}

export const processBalanceUpdateResponseBody = (body, address, masterWalletAddress) => {
  if (!body || !address || !masterWalletAddress) {
    throw new Error('Error ETHU005: processBalanceUpdateResponseBody, incorrect arguments')
  }

  const data = JSON.parse(body)
  console.log('ETH processBalanceUpdateResponseBody data', data)
  const confirmations0 = data.balances.confirmations0
  const confirmations6 = data.balances.confirmations6
  const balance0 = amountToBalance(confirmations0)
  const balance6 = amountToBalance(confirmations6)
  const updatedData = {
    address: data.address,
    masterWalletAddress,
    balance: balance0 || balance6,
    amount: confirmations0 || confirmations6,
  }

  return updatedData
}

export const processTransactionUpdateResponseBody = (body, address, masterWalletAddress) => {
  if (!body || !address || !masterWalletAddress) {
    throw new Error('Error ETHU006: processTransactionUpdateResponseBody, incorrect arguments')
  }
  const data = JSON.parse(body)
  console.log('ETH processTransactionUpdateResponseBody data', data)
  const txList = [
    {
      from: data.inputs[0].address,
      to: data.outputs[0].address,
      amount: data.outputs[0].value,
      balance: amountToBalance(data.outputs[0].value),
      timestamp: data.timestamp,
      hash: body.hash,
      confirmations: data.confirmations,
    },
  ]
  const updatedData = {
    address,
    masterWalletAddress,
    txList,
    latestTxDate: data.timestamp,
  }

  return updatedData
}