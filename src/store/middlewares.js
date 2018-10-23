/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'connected-react-router/immutable'
import thunk from 'redux-thunk'
import axiosMiddleware from '@chronobank/nodes/redux/middlewares/axios'
import web3middleware from '@chronobank/nodes/redux/middlewares/web3'
import rabbitmqMiddleware from '@chronobank/nodes/redux/middlewares/rabbitmq'
import createCryptoCompareMiddleware from '@chronobank/market/middleware'
import createTrezorMiddleware from '@chronobank/trezor/middleware'

export default (history) => {
  const middleware = [
    createCryptoCompareMiddleware(), // this middleware will dispatch thunks, so it MUST be placed before 'thunks'
    createTrezorMiddleware(), // this middleware will dispatch thunks, so it MUST be placed before 'thunks'
    thunk,
    routerMiddleware(history),
    axiosMiddleware,
    web3middleware,
    rabbitmqMiddleware,
  ]
  const isDevelopmentEnv = process.env.NODE_ENV === 'development'
  if (isDevelopmentEnv) {
    const IGNORED_DOMAINS = [
      // 'persist/REHYDRATE',
      '@@i18n/',
      '@@redux-form/',
      '@@router/',
      'MIDDLEWARE_CRYPTOCOMPARE',
      'REQ/GET/CRYPTOCOMPARE',
    ]
    // Note: logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions
    middleware.push(createLogger({
      collapsed: true,
      predicate: (getState, action) => {
        const isIgnoredDomain = IGNORED_DOMAINS.length > 0 && IGNORED_DOMAINS.some((domain) => action.type.startsWith(domain))
        return !isIgnoredDomain
      },
    }))
  }

  return middleware
}
