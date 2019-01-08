/**
* Copyright 2017–2018, LaborX PTY
* Licensed under the AGPL Version 3 license.
*/

import { createSelector } from 'reselect'
import { DUCK_ETHEREUM } from './constants'
import { BLOCKCHAIN_ETHEREUM } from '../constants'

export const getDuckEthereum = (state) =>
  state[DUCK_ETHEREUM]

export const getEthereumWalletList = createSelector(
  getDuckEthereum,
  (duckEthereum) => duckEthereum && duckEthereum.list
)

export const getCurrentEthWallet = (ethAddress) => createSelector(
  getEthereumWalletList,
  (ethereumList) => {
    return ethereumList[ethAddress]
  }
)

export const getCurrentTokensArray = (ethAddress) => createSelector(
  getCurrentEthWallet(ethAddress),
  (wallet) => {
    const tokens = Object.keys(wallet.tokens)
    return tokens.map((token) => ({
      ...wallet.tokens[token],
      balance: wallet.tokens[token].balance.toNumber(),
      symbol: token,
    })
    ).sort((a,b) => {
      const item1 = b.balance
      const item2 = a.balance
      return item1 >= item2 ? 1 : -1
    })
  }
)

export const getEthereumWalletsForSections = (ethAddress) => createSelector(
  getCurrentEthWallet(ethAddress),
  (ethereumWallet) => {
    return {
      data: [
        {
          address: ethereumWallet.address,
          blockchain: BLOCKCHAIN_ETHEREUM,
        },
      ],
      title: BLOCKCHAIN_ETHEREUM,
    }
  },
)

export const getEthAccountList = createSelector(
  getEthereumWalletList,
  (ethereumList) => {
    const result = Object.keys(ethereumList)
      .map((ethAddress) =>
        ethereumList[ethAddress]
      )
    return result
  }
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
              blockchain: BLOCKCHAIN_ETHEREUM,
            },
          ],
          title: BLOCKCHAIN_ETHEREUM,
        },
      ]
    }

    return ethereumWallets
  }
)
