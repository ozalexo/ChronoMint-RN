/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import bitcoin, { networks } from 'bitcoinjs-lib'
import { checkPrivateKey } from '@chronobank/ethereum/utils'

export const getAddress = (privateKey) => {
  const key = checkPrivateKey(privateKey)
  const keyPair = getKeyPair(key)
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: networks.testnet })
  return address
}

const getKeyPair = (privateKey) => {
  return new bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, "hex"), { network: networks.testnet })
}
