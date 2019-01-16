/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import bitcoin, { networks } from 'bitcoinjs-lib'
import { checkPrivateKey } from '@chronobank/ethereum/utils'
import coinselect from 'coinselect'
import BigNumber from 'bignumber.js'
import { convertSatoshiToBTC } from './amount'

// TODO: this info may be obtained from Redux store (see network)
export const convertToBlockchainNet = (networkType) => {
  if (networkType === 'mainet') {
    return 'bitcoin'
  } else {
    return 'testnet'
  }
}

export const getAddress = (privateKey, network) => {
  const key = checkPrivateKey(privateKey)
  const newNetwork = networks[convertToBlockchainNet(network)]

  const keyPair = getKeyPair(key, newNetwork)
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: newNetwork })
  return address
}

const getKeyPair = (privateKey, network) => {
  return new bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'), { network })
}

export const selectCoins = (to, amount, feeRate, utxos) => {
  const targets = [
    {
      address: to,
      value: parseFloat(amount),
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
  const newNetwork = networks[convertToBlockchainNet(network)]
  const tokenRate = (satPerByte || feeRate) * feeMultiplier // TODO: What if satPerByte will be zero (not null)?
  const options = {
    from: tx.from,
    feeRate: new BigNumber(tokenRate),
    blockchain,
    network: newNetwork,
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
  const newNetwork = networks[convertToBlockchainNet(network)]
  const txb = new bitcoin.TransactionBuilder
    .fromTransaction(bitcoin.Transaction.fromHex(unsignedTxHex), newNetwork)
  const key = checkPrivateKey(privateKey)
  const keyPair = getKeyPair(key, newNetwork)

  // eslint-disable-next-line no-underscore-dangle
  for (let i = 0; i < txb.__inputs.length; i++) {
    txb.sign(i, keyPair)
  }

  return txb.build().toHex()
}

export const processBalanceUpdateResponseBody = (body, address, masterWalletAddress) => {
  if (!body || !address || !masterWalletAddress) {
    throw new Error('Error BTCU005: processBalanceUpdateResponseBody, incorrect arguments')
  }

  const data = JSON.parse(body)
  const confirmations0 = data.balances.confirmations0
  const confirmations6 = data.balances.confirmations6
  const balance0 = convertSatoshiToBTC(confirmations0)
  const balance6 = convertSatoshiToBTC(confirmations6)
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
    throw new Error('Error BTCU006: processTransactionUpdateResponseBody, incorrect arguments')
  }
  const data = JSON.parse(body)
  const txList = [
    {
      from: data.inputs[0].address,
      to: data.outputs[0].address,
      amount: data.outputs[0].value,
      balance: convertSatoshiToBTC(data.outputs[0].value),
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

export const parallelPromises = (promises) => {
  const errorIgnoringPromises = promises
    .map((p) => {
      if (typeof p !== 'function') {
        throw new Error('parallelPromises: Not a function 1')
      }
      return p().catch((error) => {
        // eslint-disable-next-line no-console
        console.log('Error ignored:', error)
      })
    })

  return Promise.all(errorIgnoringPromises)
}