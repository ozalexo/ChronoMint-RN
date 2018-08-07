/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import createSensitiveStorage from 'redux-persist-sensitive-storage'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import coreReducers from '@chronobank/core/redux/ducks'
import network from '@chronobank/login/redux/network/reducer'
import NetworkService from '@chronobank/login/network/NetworkService'
import ProfileService from '@chronobank/login/network/ProfileService'
import { DUCK_PERSIST_ACCOUNT } from '@chronobank/core/redux/persistAccount/constants'
import { DUCK_WALLETS } from '@chronobank/core/redux/wallets/constants'
import ducks from './ducks'
import { SESSION_DESTROY } from '../utils/globals'

const ServiceMiddleware = (store) => (next) => (action) => {
  if (action.type === '@appinit/INIT_LOGIN_SERVICES') {
    NetworkService.connectStore(store)
    ProfileService.connectStore(store)
  }
  return next(action)
}

const configureStore = () => {
  const initialState = new Immutable.Map()

  const appReducer = combineReducers({
    ...coreReducers,
    ...ducks,
    network
  })

  const composeEnhancers = __DEV__ ? composeWithDevTools({ realtime: true }) : compose
  const middleware = [thunk, ServiceMiddleware]

  // #region Logger

  // Two lines below to avoid strange behaviour, when process.env.NODE_ENV is undefined,
  // but console.log(process.env) displays Object {NODE_ENV: 'development}
  const processEnv = process.env
  const isDevelopmentEnv = processEnv.NODE_ENV

  if (process.env['REDUX_LOGGER'] && isDevelopmentEnv) {
    // Highest priority, IGNORED_ACTIONS and DOMAINS are ignored by WHITE_LIST
    const WHITE_LIST = []
    // The following actions will be ignored if not whitelisted but presents in DOMAINS
    // So, we can enable whole domain, but still exclude aome actions from domain
    const IGNORED_ACTIONS = []
    // All actions like network/* (starts with network)
    const DOMAINS = [
      'ethMultisigWallet/',
      '@@router/'
    ]
    const logger = createLogger({
      collapsed: true,
      // predicate: (getState, action) =>
      //   WHITE_LIST.includes(action.type) ||
      //   (
      //     !IGNORED_ACTIONS.includes(action.type) &&
      //     DOMAINS.some((domain) => action.type.startsWith(domain))
      //   )
    })
    // Note: logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions
    middleware.push(logger)
  }

  // #endregion

  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(...middleware),
    autoRehydrate()
  )(createStore)

  return createStoreWithMiddleware(
    (state, action) =>
      appReducer(action.type === SESSION_DESTROY ? new Immutable.Map() : state, action),
    initialState
  )
}

const store = configureStore()
export default store

persistStore(store,
  {
    storage: createSensitiveStorage({
      keychainService: 'ChronoMint',
      sharedPreferencesName: 'ChronoMint'
    }),
    whitelist: [DUCK_PERSIST_ACCOUNT, DUCK_WALLETS]
  }
)
