/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import * as Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'
import { createStore, applyMiddleware, compose, type Store } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import createSensitiveStorage from 'redux-persist-sensitive-storage'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger as rCreateLogger } from 'redux-logger'
import { reducer as formReducer } from 'redux-form/immutable'
import { SESSION_DESTROY } from '../utils/globals'
import { type TState } from '../redux/ducks'

const getNestedReducers = (ducks) => {
  let reducers = {}

  Object.keys(ducks).forEach((r) => {
    // eslint-disable-next-line import/namespace
    reducers = { ...reducers, ...(typeof (ducks[r]) === 'function' ? { [r]: ducks[r] } : getNestedReducers(ducks[r])) }
  })
  return reducers
}

const appReducer = (reducers) => combineReducers({
  ...getNestedReducers(reducers)
})

const configureStore = (): Store<TState, { type: string }> => {
  const initialState = new Immutable.Map()

  const rootReducer = (state = {}, action) => {
    let newState = state

    if (action.type === SESSION_DESTROY) {
      newState = new Immutable.Map()
    }

    return newState
  }

  const composeEnhancers = __DEV__ ? composeWithDevTools({ realtime: true }) : compose

  const middleware = [thunk]

  // #region Logger
  // Two lines below to avoid strange behaviour, when process.env.NODE_ENV is undefined,
  // but console.log(process.env) displays Object {NODE_ENV: 'development}
  const processEnv = process.env
  const isDevelopmentEnv = processEnv.NODE_ENV

  if (process.env['REDUX_LOGGER'] && isDevelopmentEnv === 'development') {
    const IGNORED_ACTIONS = [
      'mainWallet/TOKEN_BALANCE',
      'market/UPDATE_LAST_MARKET',
      'market/UPDATE_PRICES',
      'market/UPDATE_RATES',
      'tokens/fetched'
    ]
    const rLogger = rCreateLogger({
      collapsed: true,
      predicate: (getState, action) => !IGNORED_ACTIONS.includes(action.type)
    })
    middleware.push(rLogger)
  }
  // #endregion

  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(...middleware),
    autoRehydrate()
  )(createStore)

  return createStoreWithMiddleware(
    rootReducer,
    initialState
  )
}

const store = configureStore()
export default store

export const injectReducer = (ducks: {}) => {
  store.replaceReducer(appReducer(ducks))
}

persistStore(store,
  {
    storage: createSensitiveStorage({
      keychainService: 'ChronoMint',
      sharedPreferencesName: 'ChronoMint'
    }),
    whitelist: ['sensitive']
  }
)
