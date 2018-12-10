/**
* Copyright 2017–2018, LaborX PTY
* Licensed under the AGPL Version 3 license.
*/

import { createSelector } from 'reselect'
import { getBitcoinWalletsForSections } from '@chronobank/bitcoin/redux/selectors'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { DUCK_ETHEREUM } from './constants'

const flatten = (list) => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
)

export const getDuckEthereum = () => (state) =>
  state[DUCK_ETHEREUM]

export const getEthAccountList = createSelector(
  getDuckEthereum(),
  (ethereum) => {
    const accounts = []
    for (const key in ethereum.list) {
      accounts.push(ethereum.list[key])
    }
    return accounts
  }
)
export const getDerivedEthWallets = createSelector(
  getDuckEthereum(),
  getCurrentWallet,
  (ethereum, ethAddress) => {
    if (ethereum.list[ethAddress] && ethereum.list[ethAddress].deriveds) {
      return Object.keys(ethereum.list[ethAddress].deriveds)
    }
    return []
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
              blockchain: DUCK_ETHEREUM,
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
  getBitcoinWalletsForSections,
  getEthereumWallets(),
  (bitWallets, ethWallets) => {
    const combinedSections = [], walletObj = {}
    let wallets = []
    wallets = [...wallets, bitWallets, ethWallets]
    flatten(wallets).forEach((wallet) => {
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
