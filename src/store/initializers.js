/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// import { nodesInit } from '@chronobank/nodes/redux/nodes/actions'
// import { preselectNetwork } from '@chronobank/nodes/redux/nodes/thunks'
import { startMarket } from '@chronobank/market/middleware/thunks'
// import { initTrezorManager, ethereumGetAddress } from '@chronobank/trezor/middleware/actions'
// import { middlewareConnect } from '@chronobank/nodes/middleware/thunks'
// import { WebSocketService } from '@chronobank/core/services/WebSocketService'
// import { loadI18n } from '../redux/i18n/thunks'

export const initMarket = (store) => {
  store.dispatch(startMarket())
}

// export const initTrezor = (store) => {
//   store.dispatch(initTrezorManager())
//   // TODO: still unclear how to wait for the Trezor device ('connected' event)
//   setTimeout(() => {
//     // store.dispatch(getPublicKey({ path: "m/44'/60'/0'/0" }))
//     // TODO: device can't operate with multiple simultaneous API calls (returns smth like 'device busy')
//     // Need to think how to chain all calls to TrezorConnect.methods or think about other mechanizm
//     store.dispatch(ethereumGetAddress({ path: "m/44'/60'/0'/0/0" }))
//   }, 10000)
//   // store.dispatch(getPublicKey("m/44'/60'/0'/0"))
// }

// eslint-disable-next-line import/prefer-default-export
// export const initPrimaryNodes = async (store) => {
//   const dispatch = store.dispatch
//   dispatch(preselectNetwork()) // Automatic selection of a primary node and network (mainnet/testnet)
//   await dispatch(nodesInit()) // Init Nodes middlware (working with Ehtereum primary nodes via web3)
// }
