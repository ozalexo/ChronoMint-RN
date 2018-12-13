/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import axiosMiddleware from '@chronobank/network/middlewares/axios'
import web3middleware from '@chronobank/ethereum/middleware'
import createRmqMiddleware from '@chronobank/network/middlewares/rabbitmq'
import createCryptoCompareMiddleware from '@chronobank/market/middleware'

export default () => {
  const middleware = [
    createCryptoCompareMiddleware(), // this middleware will dispatch thunks, so it MUST be placed before 'thunks'
    thunk,
    axiosMiddleware,
    web3middleware, // This middleware MUST be before createRmqMiddleware
    createRmqMiddleware(), // This middleware MUST be after web3middleware
  ]
  const isDevelopmentEnv = process.env.NODE_ENV === 'development'
  if (isDevelopmentEnv) {
    const IGNORED_DOMAINS = [
      'persist/REHYDRATE',
      'MIDDLEWARE/CRYPTOCOMPARE',
      'REQ/GET/CRYPTOCOMPARE',
      'WEB3/LISTENER/APPEND_CONTRACT',
      'MIDDLEWARE_CRYPTOCOMPARE',
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
