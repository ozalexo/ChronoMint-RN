
/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */
import { createSelector } from 'reselect'
import { getBitcoinWalletsForSections } from '@chronobank/bitcoin/redux/selectors'
import { getEthereumWallets } from '@chronobank/ethereum/redux/selectors'
import { DUCK_SESSION } from './constants'

export const getDuckSession = (state) =>
  state[DUCK_SESSION]

export const getCurrentWallet = createSelector(
  getDuckSession,
  (session) => session.masterWalletAddress
)

export const getSections = (masterWalletAddress) => createSelector(
  getBitcoinWalletsForSections(masterWalletAddress),
  getEthereumWallets,
  (bitWallets, ethWallets) => {
    return [...ethWallets, ...bitWallets]
  }
)
