/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import bs58 from 'bs58'

export const getContractAddressByNetworkId = (networks, networkId, contractName) => {
  if (!networks) {
    throw new Error('No networks specified!')
  }
  if (!networkId) {
    throw new Error('No network ID specified!')
  }
  if (!networks[networkId]) {
    throw new Error(`Contract ${contractName} is not supported in network with ID ${networkId}`)
  }
  return networks[networkId].address
}
export const bytes32ToIPFSHash = (bytes) => {
  if (/^0x0{63}[01]$/.test(`${bytes}`)) {
    return ''
  }
  const str = Buffer.from(bytes.replace(/^0x/, '1220'), 'hex')
  // noinspection JSUnresolvedFunction
  return bs58.encode(str)
}
