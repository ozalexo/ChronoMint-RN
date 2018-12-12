/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import bitcoin, { networks } from 'bitcoinjs-lib'
import { checkPrivateKey } from '@chronobank/ethereum/utils'
import coinselect from 'coinselect'
import BigNumber from 'bignumber.js'

export const getAddress = (privateKey) => {
  const key = checkPrivateKey(privateKey)
  const keyPair = getKeyPair(key)
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: networks.testnet })
  return address
}

const getKeyPair = (privateKey) => {
  return new bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, "hex"), { network: networks.testnet })
}

export const selectCoins = (to, amount, feeRate, utxos) => {
  const targets = [
    {
      address: to,
      value: amount.toNumber(),
    },
  ]
  const utxosArray = utxos.map((output) => ({
    txId: output.txid,
    vout: output.vout,
    value: Number.parseInt(output.satoshis),
  }))

  // An unspent transaction output (UTXO) selection
  const { inputs, outputs, fee } = coinselect(utxosArray, targets, Math.ceil(feeRate))
  // const { inputs, outputs, fee } = coinselect(utxosArray, targets, Math.ceil(feeRate))

  // TODO: need to process a case, if some of inputs, outputs or fee is undefined... Here or outside
  return { inputs, outputs, fee }
}

export const describeBitcoinTransaction = (tx, options, utxos) => {
  const { to, from, value } = tx
  const { feeRate, blockchain, network } = options
  const bitcoinNetwork = bitcoin.networks[network['Bitcoin']]
  const { inputs, outputs, fee } = selectCoins(to, value, feeRate, utxos)

  if (!inputs || !outputs) {
    throw new Error(`Cannot describe ${blockchain} transaction. Bad transaction data.`)
  }

  const txb = new bitcoin.TransactionBuilder(network)
  // const txb = new bitcoin.TransactionBuilder(bitcoinNetwork)
  for (const input of inputs) {
    txb.addInput(input.txId, input.vout)
  }

  for (const output of outputs) {
    if (!output.address) {
      output.address = from
    }
    txb.addOutput(output.address, output.value)
  }

  return {
    tx: txb,
    inputs,
    outputs,
    fee,
  }
}

export const prepareBitcoinTransaction = async ({ tx, blockchain, feeRate, network, utxos, feeMultiplier = 1, satPerByte = null }) => {
  const tokenRate = (satPerByte || feeRate) * feeMultiplier // TODO: What if satPerByte will be zero (not null)?
  const options = {
    from: tx.from,
    feeRate: new BigNumber(tokenRate),
    blockchain,
    network,
  }
  const prepared = await describeBitcoinTransaction(tx, options, utxos)

  return {
    from: tx.from,
    to: tx.to,
    amount: tx.value,
    fee: new BigNumber(prepared.fee),
    prepared: prepared.tx,
    inputs: prepared.inputs,
    outputs: prepared.outputs,
  }
}

export const signTransaction = ({ unsignedTxHex, network, privateKey }) => {
  const txb = new bitcoin.TransactionBuilder
    .fromTransaction(bitcoin.Transaction.fromHex(unsignedTxHex), network)
  const key = checkPrivateKey(privateKey)
  const keyPair = getKeyPair(key)

  for (let i = 0; i < txb.__inputs.length; i++) {
    txb.sign(i, keyPair)
  }

  return txb.build().toHex()
}
