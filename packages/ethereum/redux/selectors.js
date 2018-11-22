/**
* Copyright 2017–2018, LaborX PTY
* Licensed under the AGPL Version 3 license.
*/

import { createSelector } from 'reselect'
import { getDuckBitcoin } from '@chronobank/bitcoin/redux/selectors'
import { DUCK_ETHEREUM } from './constants'

export const getDuckEthereum = () => (state) =>
  state[DUCK_ETHEREUM]


export const getSections = createSelector(
  getDuckBitcoin(),
  getDuckEthereum(),
  (bitcoin, ethereum) => [
    {
      data: Object.keys(bitcoin.list).map((wallet) => ({
        address: wallet.address,
        blockchain: 'BTC',
      })),
      title: 'Bitcoin Test',
    },
    {
      data: Object.keys(ethereum.list).map((wallet) => ({
        address: wallet.address,
        blockchain: 'ETH',
      })),
      title: 'Etereum',
    },
  ]
)
