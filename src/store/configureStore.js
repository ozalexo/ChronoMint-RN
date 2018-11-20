/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnly'
// import { persistStore } from 'redux-persist'
import getMiddlewares from './middlewares'
import rootReducer from './rootReducer'

const initialState = {}

const configureStore = () => {
  const isDevelopmentEnv = process.env.NODE_ENV === 'development'
  const composeEnhancers = isDevelopmentEnv
    ? composeWithDevTools({ realtime: true })
    : compose

  const middleware = getMiddlewares()

  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(...middleware)
  )(createStore)

  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
  )

  // const persistor = persistStore(store)

  // store.persistor = persistor
  // return { store, persistor }
  return { store }
}

export default configureStore
