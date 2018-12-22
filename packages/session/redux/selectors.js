
/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */
import { createSelector } from 'reselect'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'
import { getBitcoinWalletsForSections, getBitcoinListByMasterAddress } from '@chronobank/bitcoin/redux/selectors'
import { getEthereumWallets, getEthereumWalletList } from '@chronobank/ethereum/redux/selectors'
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

export const getWalletByBlockchainAndAddress = (blockchain, address, masterAddress) => createSelector(
  getEthereumWalletList,
  getBitcoinListByMasterAddress(masterAddress),
  (ethereumWallets, bitcoinWallets) => {
    // TODO: to be refactored in the future
    if (blockchain === BLOCKCHAIN_ETHEREUM) {
      return ethereumWallets[address]
    } else {
      return bitcoinWallets[address]
    }
  }
)
