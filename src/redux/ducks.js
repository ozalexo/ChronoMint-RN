/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import * as assetsHolder from '@chronobank/core/redux/assetsHolder'
import * as assetsManager from '@chronobank/core/redux/assetsManager'
import * as exchange from '@chronobank/core/redux/exchange'
import * as locs from '@chronobank/core/redux/locs'
import * as mainWallet from '@chronobank/core/redux/mainWallet'
import * as market from '@chronobank/core/redux/market'
import * as multisigWallet from '@chronobank/core/redux/multisigWallet'
import * as notifier from '@chronobank/core/redux/notifier'
import * as operations from '@chronobank/core/redux/operations'
import * as persistAccount from '@chronobank/core/redux/persistAccount'
import * as rewards from '@chronobank/core/redux/rewards'
import * as session from '@chronobank/core/redux/session'
import * as settings from '@chronobank/core/redux/settings'
import * as tokens from '@chronobank/core/redux/tokens'
import * as voting from '@chronobank/core/redux/voting'
import * as wallet from '@chronobank/core/redux/wallet'
import * as watcher from '@chronobank/core/redux/watcher'
import * as network from '@chronobank/login/redux/network/'
import * as sensitive from './sensitive'

import { type TStateSensitive } from './sensitive/reducer'

export {
  assetsHolder,
  assetsManager,
  exchange,
  locs,
  mainWallet,
  market,
  multisigWallet,
  network,
  notifier,
  operations,
  persistAccount,
  rewards,
  sensitive,
  session,
  settings,
  tokens,
  voting,
  wallet,
  watcher
}

export type TState = {} | {
  sensitive: TStateSensitive
}
