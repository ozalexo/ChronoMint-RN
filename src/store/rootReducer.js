/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import { DUCK_BITCOIN } from '@chronobank/bitcoin/redux/constants'
import { DUCK_ETHEREUM } from '@chronobank/ethereum/redux/constants'
import { DUCK_MARKET } from '@chronobank/market/redux/constants'
import { DUCK_NETWORK } from '@chronobank/network/redux/constants'
import { DUCK_RMQ_MIDDLEWARE } from '@chronobank/network/middlewares/rabbitmq/constants'
import { DUCK_SESSION } from '@chronobank/session/redux/constants'
import { DUCK_WEB3_MIDDLEWARE } from '@chronobank/ethereum/middleware/constants'

import bitcoin from '@chronobank/bitcoin/redux/reducers'
import ethereum from '@chronobank/ethereum/redux/reducers'
import market from '@chronobank/market/redux/reducers'
import network from '@chronobank/network/redux/reducers'
import rmqMiddleware from '@chronobank/network/middlewares/rabbitmq/reducers'
import session from '@chronobank/session/redux/reducers'
import web3middleware from '@chronobank/ethereum/middleware/reducers'

import ETHEREUM_PERSIST_CONFIG from '@chronobank/ethereum/redux/persist'
import BITCOIN_PERSIST_CONFIG from '@chronobank/bitcoin/redux/persist'

export default combineReducers({
  [DUCK_BITCOIN]: persistReducer(BITCOIN_PERSIST_CONFIG, bitcoin),
  [DUCK_ETHEREUM]: persistReducer(ETHEREUM_PERSIST_CONFIG, ethereum),
  [DUCK_MARKET]: market,
  [DUCK_NETWORK]: network,
  [DUCK_RMQ_MIDDLEWARE]: rmqMiddleware,
  [DUCK_SESSION]: session,
  [DUCK_WEB3_MIDDLEWARE]: web3middleware,
})
