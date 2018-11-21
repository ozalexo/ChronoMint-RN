/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import bitcoin, { networks } from 'bitcoinjs-lib'

export const getAddress = (privateKey) => {
  const keyPair = getKeyPair(privateKey)
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: networks.testnet })
  return address
}

const getKeyPair = (privateKey) => {
  return new bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, "hex"), { network: networks.testnet })
}
