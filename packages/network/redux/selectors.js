/**
* Copyright 2017–2018, LaborX PTY
* Licensed under the AGPL Version 3 license.
*/

import { createSelector } from 'reselect'
import { DUCK_NETWORK } from './constants'

const flatten = (list) => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
)

/**
 * get network
 * @param {object} state
 */
export const getDuckNetwork = (state) =>
  state[DUCK_NETWORK]

/**
 * get network.selected
 * @param {object} state
 */
export const getCurrentNetwork = createSelector(
  getDuckNetwork,
  (network) => network.selected
)

export const getCurrentNetworkBlockchains = createSelector(
  getCurrentNetwork,
  (selected) => selected.blockchain
)

export const getCurrentNetworkRmqbaseUrl = createSelector(
  getCurrentNetwork,
  (selected) => selected.rabbitMqBaseUrl
)

export const getCurrentNetworkBlockchainChannels = (blockchain) => createSelector(
  getCurrentNetworkBlockchains,
  (blockchains) => blockchains[blockchain].channels
)

/**
 * get network.availableNetworks
 * @param {object} state
 */
export const getAvailableNetworks = createSelector(
  getDuckNetwork,
  (network) => network.availableNetworks
)

/**
 * get network.selected
 * @param {object} state
 */
export const getNetworkByIndex = (networkIndex) => createSelector(
  getAvailableNetworks,
  (availableNetworks) => availableNetworks[networkIndex]
)

/**
 * get flattened network.displaySections.%section%.networks
 * @param {object} state
 */
export const getAvailableNetworkList = createSelector(
  getDuckNetwork,
  (network) => {
    const list = network.displaySections
      .map((item) => item.networks)
    return flatten(list)
  }
)

/**
 * get count of flattened network.displaySections.%section%.networks
 * @param {object} state
 */
export const getAvailableNetworkCount = createSelector(
  getAvailableNetworks,
  (availableNetworks) => availableNetworks && availableNetworks.length
)
