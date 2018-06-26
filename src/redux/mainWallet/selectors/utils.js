/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import {
  BLOCKCHAIN_BITCOIN_CASH,
  BLOCKCHAIN_BITCOIN_GOLD,
  BLOCKCHAIN_BITCOIN,
  BLOCKCHAIN_LITECOIN,
} from '@chronobank/login/network/BitcoinProvider'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/core/dao/EthereumDAO'

const BLOCKCHAIN_NEM = 'NEM' // TODO: replace it to "import { BLOCKCHAIN_NEM } from 'dao/NemDAO" after ChronoMint depency upgrade

// eslint-disable-next-line import/prefer-default-export
export const getPrimaryToken = (blockchain: string): string => {
  let walletPrimaryToken: string = '---'
  switch (blockchain) {
    case BLOCKCHAIN_BITCOIN_CASH: {
      walletPrimaryToken = 'BCC'
      break
    }
    case BLOCKCHAIN_BITCOIN_GOLD: {
      walletPrimaryToken = 'BTG'
      break
    }
    case BLOCKCHAIN_BITCOIN: {
      walletPrimaryToken = 'BTC'
      break
    }
    case BLOCKCHAIN_LITECOIN: {
      walletPrimaryToken = 'LTC'
      break
    }
    case BLOCKCHAIN_NEM: {
      walletPrimaryToken = 'XEM'
      break
    }
    case BLOCKCHAIN_ETHEREUM: {
      walletPrimaryToken = 'ETH'
      break
    }
  }
  return walletPrimaryToken
}
