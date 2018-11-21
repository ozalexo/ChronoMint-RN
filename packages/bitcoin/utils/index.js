/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Mnemonic from 'bitcore-mnemonic-react-native'
import bitcoin, { networks } from 'bitcoinjs-lib'

const mnemonicObject = new Mnemonic(Mnemonic.Words.ENGLISH)

export const generateMnemonic = async () => {
  const phrase = await mnemonicObject.phrase
  return phrase
}

export const getPrivateKey = async () => {
  const key = mnemonicObject.toHDPrivateKey()
  return key
}

export const getAddress = (privateKey) => {
  const keyPair = getKeyPair(privateKey)
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: networks.testnet })
  return address
}

const getKeyPair = (privateKey) => {
  return new bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, "hex"), { network: networks.testnet })
}
