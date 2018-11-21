/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

export default {
  selected: {
    address: '',
    parentWalletAddress: '',
    transactions: {},
    balances: {
      'BTC': {}, // BigNumber or Amount
    },
    txPrepare: {
      rawTx: {
        from: '',
        to: '',
        amount: '',
        fee: '',
        txHex: '',
      },
      signedTx: null, // txHex signed
    },
  },
  list: {},
}
