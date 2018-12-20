/**
* Copyright 2017–2018, LaborX PTY
* Licensed under the AGPL Version 3 license.
*/

import { createSelector } from 'reselect'
import { DUCK_ETHEREUM } from './constants'
import { BLOCKCHAIN_ETHEREUM  } from '../constants'

export const getDuckEthereum = (state) =>
  state[DUCK_ETHEREUM]

export const getCurrentEthWallet = (ethAddress) => createSelector(
  getDuckEthereum,
  (ethereum) => ethereum.list[ethAddress]
)
export const getEthAccountList = createSelector(
  getDuckEthereum,
  (ethereum) => {
    const accounts = []
    for (const key in ethereum.list) {
      accounts.push(ethereum.list[key])
    }
    return accounts
  }
)

export const getEthereumWalletList = createSelector(
  getDuckEthereum,
  (ethereum) => ethereum && ethereum.list
)

export const getEthereumWallets = createSelector(
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
