/**
* Copyright 2017–2018, LaborX PTY
* Licensed under the AGPL Version 3 license.
*/

import { createSelector } from 'reselect'
import { getDuckBitcoin } from '@chronobank/bitcoin/redux/selectors'
import { DUCK_ETHEREUM } from './constants'

export const getDuckEthereum = () => (state) =>
  state[DUCK_ETHEREUM]

const getBitcoinWallets = (bitcoin) => {
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
          title: 'Bitcoin example',
        },
      ]
    }
  }

  return bitcoinWallets
}
const getEthereumWallets = (ethereum) => {
  let ethereumWallets = []
  for (const key in ethereum.list) {
    ethereumWallets = [
      ...ethereumWallets,
      {
        data: [
          {
            address: ethereum.list[key].address,
            blockchain: 'BTC',
          },
        ],
        title: 'Ethereum example',
      },
    ]
  }

  return ethereumWallets
}

export const getSections = createSelector(
  getDuckBitcoin(),
  getDuckEthereum(),
  (bitcoin, ethereum) => {
    const combinedSections = [], walletObj = {}
    let wallets = []
    const bitcoinWallets = getBitcoinWallets(bitcoin)
    const ethereumWallets = getEthereumWallets(ethereum)
    wallets = [...wallets, bitcoinWallets, ethereumWallets].flat()
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
