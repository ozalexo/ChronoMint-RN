/**
* Copyright 2017–2018, LaborX PTY
* Licensed under the AGPL Version 3 license.
*/

import { createSelector } from 'reselect'
import { getBitcoinWalletsForSections } from '@chronobank/bitcoin/redux/selectors'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { DUCK_ETHEREUM } from './constants'
import { BLOCKCHAIN_ETHEREUM  } from '../constants'

export const getDuckEthereum = () => (state) =>
  state[DUCK_ETHEREUM]


export const getCurrentEthWallet = createSelector(
  getDuckEthereum(),
  getCurrentWallet,
  (ethereum, ethAddress) => ethereum.list[ethAddress]
)
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

export const getEthereumWalletList = createSelector(
  getDuckEthereum(),
  (ethereum) => ethereum && ethereum.list
)

const getEthereumWallets = createSelector(
  getEthereumWalletList,
  (ethereumList) => {
    let ethereumWallets = []
    for (const key in ethereumList) {
      ethereumWallets = [
        ...ethereumWallets,
        {
          data: [
            {
              address: ethereumList[key].address,
              blockchain: BLOCKCHAIN_ETHEREUM ,
            },
          ],
          title: BLOCKCHAIN_ETHEREUM,
        },
      ]
    }

    return ethereumWallets
  }
)

export const getSections = createSelector(
  getBitcoinWalletsForSections,
  getEthereumWallets,
  (bitWallets, ethWallets) => {
    return [...ethWallets, ...bitWallets]
  }
)
