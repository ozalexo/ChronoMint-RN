/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { I18n, loadTranslations, setLocale } from 'react-redux-i18n'
import moment from 'moment'
import { nodesInit } from '@chronobank/nodes/redux/nodes/actions'
import { preselectNetwork } from '@chronobank/nodes/redux/nodes/thunks'
import translations from '../i18n'
import { startMarket } from '@chronobank/market/middleware/thunks'
import { initTrezorManager, getPublicKey, ethereumGetAddress } from '@chronobank/trezor/middleware/actions'
// import { middlewareConnect } from '@chronobank/nodes/middleware/thunks'
// import { WebSocketService } from '@chronobank/core/services/WebSocketService'
// import { loadI18n } from '../redux/i18n/thunks'

export const initMarket = (store) => {
  store.dispatch(startMarket())
}

export const initTrezor = (store) => {
  store.dispatch(initTrezorManager())
  // TODO: still unclear how to wait for the Trezor device ('connected' event)
  setTimeout(() => {
    // store.dispatch(getPublicKey({ path: "m/44'/60'/0'/0" }))
    // TODO: device can't operate with multiple simultaneous API calls (returns smth like 'device busy')
    // Need to think how to chain all calls to TrezorConnect.methods or think about other mechanizm
    store.dispatch(ethereumGetAddress({ path: "m/44'/60'/0'/0/0" }))
  }, 10000)
  // store.dispatch(getPublicKey("m/44'/60'/0'/0"))
}

const initI18n = (store) => {
  const dispatch = store.dispatch
  const state = store.getState()
  const locale = 'en'
  moment.locale(locale)
  I18n.setTranslationsGetter(() => state.i18n.translations)
  I18n.setLocaleGetter(() => state.i18n.locale)
  store.dispatch(loadTranslations(translations))
  dispatch(setLocale(locale))
}

// eslint-disable-next-line import/prefer-default-export
export const initPrimaryNodes = async (store) => {
  const dispatch = store.dispatch
  dispatch(preselectNetwork()) // Automatic selection of a primary node and network (mainnet/testnet)
  initI18n(store)
  await dispatch(nodesInit()) // Init Nodes middlware (working with Ehtereum primary nodes via web3)
}

// export const initI18N = async (store) => {
//   // Locale init
//   const state = store.getState()
//   I18n.setTranslationsGetter(() => state.i18n.translations)
//   I18n.setLocaleGetter(() => state.i18n.locale)

//   // const locale = localStorage.getLocale()
//   const { locale } = state.accounts.locale
//   // set moment locale
//   moment.locale(locale)

//   store.dispatch(loadTranslations(translations))
//   store.dispatch(setLocale(locale))

//   // load i18n from the public site
//   await store.dispatch(loadI18n(locale))
// }

// export const initChronobankMiddlewares = async (store) => {
//   // // dispatch(preselectNetwork()) // Automatic selection of a primary node and network (mainnet/testnet)
//   store.dispatch(nodesInit()) // Init Nodes middlware (working with Ehtereum primary nodes via web3)
//   store.dispatch(middlewareConnect())
//   // // TODO: WebSocketService we be removed. Let's it be here for now
//   // WebSocketService.initWebSocketService(store)
// }
