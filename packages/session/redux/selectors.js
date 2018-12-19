
/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */
import { createSelector } from 'reselect'
import { getBitcoinWalletsList } from '@chronobank/bitcoin/redux/selectors'
import { getEthereumWalletList } from '@chronobank/ethereum/redux/selectors'
import { DUCK_SESSION } from './constants'

export const getDuckSession = () => (state) =>
  state[DUCK_SESSION]

export const getCurrentWallet = createSelector(
  getDuckSession(),
  (session) => session.masterWalletAddress
)

export const getSectionedWalletList = createSelector(
  [
    getBitcoinWalletsList,
    getEthereumWalletList,
  ],
  (btcWalletList, ethWalletList) => {

  }
)