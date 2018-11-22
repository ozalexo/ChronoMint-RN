/**
* Copyright 2017–2018, LaborX PTY
* Licensed under the AGPL Version 3 license.
*/

import { createSelector } from 'reselect'
import { DUCK_BITCOIN } from '@chronobank/bitcoin/redux/constants'
import { DUCK_ETHEREUM } from '@chronobank/ethereum/redux/constants'

const getBitDuck = (state) => state[DUCK_BITCOIN]
const getEthDuck = (state) => state[DUCK_ETHEREUM]

export const getSections = createSelector(
  getBitDuck,
  getEthDuck,
  (bitcoin, ethereum) => [
    {
      data: [
        {
          address: bitcoin.list.address,
          blockchain: 'BTC',
        },
      ],
      title: 'Bitcoin Test',
    },
    {
      data: [
        {
          address: ethereum.list.address,
          blockchain: 'ETH',
        },
      ],
      title: 'Etereum',
    },
  ]
)
