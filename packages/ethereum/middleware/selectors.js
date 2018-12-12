/**
* Copyright 2017–2018, LaborX PTY
* Licensed under the AGPL Version 3 license.
*/

import { createSelector } from 'reselect'
import { DUCK_WEB3_MIDDLEWARE } from './constants'

export const getDuckWeb3Middleware = () => (state) =>
  state[DUCK_WEB3_MIDDLEWARE]

export const getNetworkStatusList = createSelector(
  getDuckWeb3Middleware(),
  (web3middleware) => {
    return web3middleware.map((netStat) => netStat.isConnected)
  }
)

export const getNetworkStatusByNetworkIndex = (networkIndex) => createSelector(
  getDuckWeb3Middleware(),
  (web3middleware) => web3middleware[networkIndex].isConnected
)
