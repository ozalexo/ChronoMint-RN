/**
* Copyright 2017–2018, LaborX PTY
* Licensed under the AGPL Version 3 license.
*/

import { createSelector } from 'reselect'
import { getDuckBitcoin } from '@chronobank/bitcoin/redux/selectors'
import { DUCK_ETHEREUM } from './constants'

export const getDuckEthereum = () => (state) =>
  state[DUCK_ETHEREUM]

const getBitcoinWallets = () => createSelector(
  getDuckBitcoin(),
  (bitcoin) => {
    let bitcoinWallets = []
    for (const key in bitcoin.list) {
      for (const secKey in bitcoin.list[key]) {
        bitcoinWallets = [
          ...bitcoinWallets,
          {
            data: [
              {
                address: bitcoin.list[key][secKey].address,
                blockchain: 'BTC',
              },
            ],
            title: key,
          },
        ]
      }
    }

    return bitcoinWallets
  }
)

const getEthereumWallets = () => createSelector(
  getDuckEthereum(),
  (ethereum) => {
    let ethereumWallets = []
    for (const key in ethereum.list) {
      ethereumWallets = [
        ...ethereumWallets,
        {
          data: [
            {
              address: ethereum.list[key].address,
              blockchain: 'ETH',
            },
          ],
          title: key,
        },
      ]
    }

    return ethereumWallets
  }
)

export const getSections = createSelector(
  getBitcoinWallets(),
  getEthereumWallets(),
  (bitWallets, ethWallets) => {
    const combinedSections = [], walletObj = {}
    let wallets = []
    wallets = [...wallets, bitWallets, ethWallets].flat()
    wallets.forEach((wallet) => {
      if (!walletObj[wallet.title]) {
        walletObj[wallet.title] = wallet.data
      } else {
        walletObj[wallet.title] = walletObj[wallet.title].concat(wallet.data)
      }
    })
    for (const key in walletObj) {
      combinedSections.push({
        data: walletObj[key],
        title: key,
      })
    }
    return combinedSections
  }
)
