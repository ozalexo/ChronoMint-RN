/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

export const BLOCKCHAIN_ETHEREUM = 'Ethereum'
export const ETH_PRIMARY_TOKEN = 'ETH'
export const DECIMALS = 18

/**
 * See all available coin types here:
 * https://github.com/satoshilabs/docs/blob/bdd9fd92386827bfa031a88c10e3e6fd834d56e3/slips/slip-0044.rst
 */

export const COIN_TYPE_ETH = 60

/**
 * Path structure: m / purpose' / coin_type' / account' / chain / address_index
 *
 * Default Ethereum path m/44'/60'/0'/0 deconstruction:
 * 44 - BIP 44 Purpose
 * 60 - Ethereum’s coin type
 * 0  - Account 0
 * 0  - Chain 0
 *
 * See additional info here:
 * https://medium.com/bitcraft/hd-wallets-explained-from-high-level-to-nuts-and-bolts-9a41545f5b0
 * https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
 */

export const WALLET_HD_PATH = `m/44'/${COIN_TYPE_ETH}'/0'/0/0`
