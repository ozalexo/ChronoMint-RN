/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import Web3 from 'web3'
import { bootstrap } from '@chronobank/core/redux/session/actions'
import networkService from '@chronobank/login/network/NetworkService'
import web3Utils from '@chronobank/login/network/Web3Utils'
import web3Provider from '@chronobank/login/network/Web3Provider'
import store from './redux/configureStore'
window.web3 = Web3

networkService.connectStore(store)

store.dispatch(bootstrap()).then(() => {
  networkService.selectProvider(2)
  networkService.selectNetwork(4)
  const web3 = new Web3()
  web3Provider.setWeb3(web3)
  const providerUrl = networkService.getProviderURL()
  const statusEngine = web3Utils.createStatusEngine(providerUrl)
  web3Provider.setProvider(statusEngine)
  web3Provider.resolve()
})
