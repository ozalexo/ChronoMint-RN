/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { combineReducers } from 'redux'

import { DUCK_BITCOIN } from '@chronobank/bitcoin/redux/constants'
import { DUCK_ETHEREUM } from '@chronobank/ethereum/redux/constants'
import { DUCK_MARKET } from '@chronobank/market/redux/constants'
import { DUCK_NETWORK } from '@chronobank/network/redux/constants'
import { DUCK_SESSION } from '@chronobank/session/redux/constants'
import bitcoin from '@chronobank/bitcoin/redux/reducers'
import ethereum from '@chronobank/ethereum/redux/reducers'
import market from '@chronobank/market/redux/reducers'
import network from '@chronobank/network/redux/reducers'
import session from '@chronobank/session/redux/reducers'

export default combineReducers({
  [DUCK_BITCOIN]: bitcoin,
  [DUCK_ETHEREUM]: ethereum,
  [DUCK_MARKET]: market,
  [DUCK_NETWORK]: network,
  [DUCK_SESSION]: session,
})
