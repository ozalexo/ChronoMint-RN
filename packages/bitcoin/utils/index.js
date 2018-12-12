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
  console.log("SELECT COINS")
  console.log("to, amount, feeRate, utxos: ", to, amount, feeRate, utxos)
  const targets = [
    {
      address: to,
      value: amount,
    },
  ]
  const utxosArray = utxos.map((output) => ({
    txId: output.txid,
    vout: output.vout,
    value: Number.parseInt(output.satoshis),
  }))

  console.log("utxosArray: ", utxosArray)
  console.log("targets: ", targets)
  console.log("Math.ceil(feeRate): ",  Math.ceil(feeRate))
  console.log("coinselect(utxosArray, targets, Math.ceil(feeRate)): ",  coinselect(utxosArray, targets, Math.ceil(feeRate)))

  // An unspent transaction output (UTXO) selection
  const { inputs, outputs, fee } = coinselect(utxosArray, targets, Math.ceil(feeRate))

  console.log("INSIDE: ", inputs, outputs, fee)

  // TODO: need to process a case, if some of inputs, outputs or fee is undefined... Here or outside
  return { inputs, outputs, fee }
}

export const describeBitcoinTransaction = (tx, options, utxos) => {
  const { to, from, value } = tx
  const { feeRate, blockchain, network } = options
  const bitcoinNetwork = bitcoin.networks[network['Bitcoin']]
  console.log(bitcoinNetwork)
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

export const prepareBitcoinTransaction = ({tx, blockchain, feeRate, network, utxos, feeMultiplier = 1, satPerByte = null}) =>  {
  console.log("tx: ", tx)
  console.log("blockchain: ", blockchain)
  console.log("feeRate: ", feeRate)
  console.log("network: ", network)
  console.log("utxos: ", utxos)
  const tokenRate = (satPerByte || feeRate) * feeMultiplier // TODO: What if satPerByte will be zero (not null)?
  const options = {
    from: tx.from,
    feeRate: new BigNumber(tokenRate),
    blockchain,
    network,
  }
  const prepared = describeBitcoinTransaction(tx, options, utxos)

  return {
    from: tx.from,
    to: tx.to,
    amount: new BigNumber(tx.value),
    fee: new BigNumber(prepared.fee),
    prepared: prepared.tx,
    inputs: prepared.inputs,
    outputs: prepared.outputs,
  }
}
