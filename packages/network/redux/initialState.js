/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

/**
 * TODO: To use i18n for sections/networks titles
 */

import { BLOCKCHAIN_BITCOIN, COIN_TYPE_BTC_MAINNET, COIN_TYPE_BTC_TESTNET } from '@chronobank/bitcoin/constants'
// import { BLOCKCHAIN_BITCOINCASH } from '@chronobank/bitcoincash/constants'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'
// import { BLOCKCHAIN_LITECOIN, COIN_TYPE_LTC_MAINNET, COIN_TYPE_LTC_TESTNET } from '@chronobank/litecoin/constants'
// import { BLOCKCHAIN_NEM } from '@chronobank/nem/constants'
// import { BLOCKCHAIN_WAVES } from '@chronobank/waves/constants'

const MAINNET = 'mainnet'
const TESTNET = 'testnet'

/**
 * This is map of axios.clients' names, used by redux-axios-middleware
 * See list of clients in packages/nodes/httpNodes/clients/index.js
 * HTTP API in packages/nodes/httpNodes/api
 * Chronobank Middleware client is choosing automatically by patched redux-axios-middleware by blockchain name
 * See patch at /Users/alexo/projects/ChronoMint/packages/nodes/patches/redux-axios-middleware+4.0.0.patch
 * It gets list of available nodes from Redux store state.nodes.selected.chronobankMiddlewares
 */
const availableChronoBankMiddlewareNodes = {
  [MAINNET]: {
    // [BLOCKCHAIN_BITCOINCASH]: 'middleware_bitcoincash_mainnet_rest',
    [BLOCKCHAIN_BITCOIN]: 'middleware_bitcoin_mainnet_rest',
    [BLOCKCHAIN_ETHEREUM]: 'middleware_ethereum_mainnet_rest',
    // [BLOCKCHAIN_LITECOIN]: 'middleware_litecoin_mainnet_rest',
    // [BLOCKCHAIN_NEM]: 'middleware_nem_mainnet_rest',
    // [BLOCKCHAIN_WAVES]: 'middleware_waves_mainnet_rest',
  },
  [TESTNET]: {
    // [BLOCKCHAIN_BITCOINCASH]: 'middleware_bitcoincash_testnet_rest',
    [BLOCKCHAIN_BITCOIN]: 'middleware_bitcoin_testnet_rest',
    [BLOCKCHAIN_ETHEREUM]: 'middleware_ethereum_testnet_rest',
    // [BLOCKCHAIN_LITECOIN]: 'middleware_litecoin_testnet_rest',
    // [BLOCKCHAIN_NEM]: 'middleware_nem_testnet_rest',
    // [BLOCKCHAIN_WAVES]: 'middleware_waves_testnet_rest',
  },
}

/**
 * This is a list of all available Ethereum nodes
 */
const INFURA_TOKEN = 'PVe9zSjxTKIP3eAuAHFA'
const availableEthereumNodes = {
  [MAINNET]: {
    chronobank: {
      disabled: false,
      host: 'https://mainnet-full-parity-rpc.chronobank.io',
      providerTitle: 'Chronobank',
      isOnline: null,
      isSyncing: true,
      ws: 'wss://mainnet-full-geth-ws.chronobank.io',
    },
    infura: {
      disabled: false,
      host: `https://mainnet.infura.io/${INFURA_TOKEN}`,
      providerTitle: 'Infura',
      isOnline: null,
      isSyncing: true,
      ws: 'wss://mainnet.infura.io/ws',
    },
  },
  [TESTNET]: {
    chronobank: {
      disabled: false,
      host: 'rinkeby-full-geth-rpc.chronobank.io',
      providerTitle: 'Chronobank',
      isOnline: null,
      isSyncing: true,
      ws: 'wss://rinkeby-full-geth-ws.chronobank.io',
    },
    infura: {
      disabled: false,
      host: `https://rinkeby.infura.io/${INFURA_TOKEN}`,
      providerTitle: 'Infura',
      isOnline: null,
      isSyncing: true,
      ws: 'wss://rinkeby.infura.io/ws',
    },
    local: {
      disabled: false,
      host: `https://localhost:8545`,
      providerTitle: 'LocalNode',
      isOnline: null,
      isSyncing: true,
      ws: 'ws://localhost:8540/ws',
    },
  },
  custom: {},
}

const blockchainMainnet ={
  [BLOCKCHAIN_ETHEREUM]: {
    bcNetworkId: 'mainnet',
    blockexplorer: 'https://etherscan.io/tx',
    coinType: null,
    symbol: 'ETH',
    channels: {
      balance: '/exchange/events/mainnet-ethereum-middleware-chronobank-io_balance',
      events: '/exchange/events/mainnet-ethereum-parity-middleware-chronobank-io_chrono_sc',
    },
  },
  // [BLOCKCHAIN_BITCOINCASH]: {
  //   bcNetworkId: 'bitcoin',
  //   blockexplorer: 'https://bcc.blockdozer.com/insight/tx',
  //   coinType: null,
  //   symbol: 'BTC',
  //   channels: {
  //     balance: '/exchange/events/internal-testnet-bitcoin-middleware-chronobank-io_balance',
  //     transaction: '/exchange/events/internal-testnet-bitcoin-middleware-chronobank-io_transaction',
  //     block: '/exchange/events/internal-testnet-bitcoin-middleware-chronobank-io_block',
  //   },
  // },
  [BLOCKCHAIN_BITCOIN]: {
    bcNetworkId: 'bitcoin',
    blockexplorer: 'https://blockexplorer.com/tx',
    coinType: COIN_TYPE_BTC_MAINNET,
    symbol: 'BTC',
    channels: {
      balance: '/exchange/events/mainnet-bitcoin-middleware-chronobank-io_balance',
      block: '/exchange/events/mainnet-bitcoin-middleware-chronobank-io_block',
    },
  },
  // [BLOCKCHAIN_LITECOIN]: {
  //   bcNetworkId: 'litecoin',
  //   blockexplorer: 'https://live.blockcypher.com/ltc/tx',
  //   coinType: COIN_TYPE_LTC_MAINNET,
  //   symbol: 'LTC',
  //   channels: {
  //     balance: '/exchange/events/mainnet-litecoin-middleware-chronobank-io_balance',
  //     block: '/exchange/events/mainnet-litecoin-middleware-chronobank-io_block',
  //   },
  // },
  // [BLOCKCHAIN_NEM]: {
  //   bcNetworkId: 'mainnet',
  //   blockexplorer: null,
  //   coinType: null,
  //   symbol: 'NEM',
  //   channels: {
  //     balance: '/exchange/events/mainnet-nem-middleware-chronobank-io_balance',
  //     transaction: '/exchange/events/mainnet-nem-middleware-chronobank-io_transaction',
  //   },
  // },
  // [BLOCKCHAIN_WAVES]: {
  //   bcNetworkId: 'MAINNET_CONFIG',
  //   blockexplorer: null,
  //   coinType: null,
  //   symbol: 'WAVES',
  //   channels: {
  //     balance: '/exchange/events/mainnet-waves-middleware-chronobank-io_balance',
  //     transaction: '/exchange/events/mainnet-waves-middleware-chronobank-io_transaction',
  //   },
  // },
}

const blockchainTestnet ={
  [BLOCKCHAIN_ETHEREUM]: {
    bcNetworkId: 'rinkeby',
    blockexplorer: 'https://rinkeby.etherscan.io/tx',
    coinType: null,
    symbol: 'ETH',
    channels: {
      balance: '/exchange/events/rinkeby-ethereum-middleware-chronobank-io_balance',
      events: '/exchange/events/rinkeby-ethereum-middleware-chronobank-io_chrono_sc',
    },
  },
  // [BLOCKCHAIN_BITCOINCASH]: {
  //   bcNetworkId: 'testnet',
  //   blockexplorer: 'https://tbcc.blockdozer.com/insight/tx',
  //   coinType: null,
  //   symbol: 'BCC',
  //   channels: {
  //     balance: '/exchange/events/internal-testnet-bitcoin-middleware-chronobank-io_balance',
  //     transaction: '/exchange/events/internal-testnet-bitcoin-middleware-chronobank-io_transaction',
  //     block: '/exchange/events/internal-testnet-bitcoin-middleware-chronobank-io_block',
  //   },
  // },
  [BLOCKCHAIN_BITCOIN]: {
    bcNetworkId: 'testnet',
    blockexplorer: 'https://live.blockcypher.com/btc-testnet/tx',
    coinType: COIN_TYPE_BTC_TESTNET,
    symbol: 'BTC',
    channels: {
      balance: '/exchange/events/internal-testnet-bitcoin-middleware-chronobank-io_balance',
      transaction: '/exchange/events/internal-testnet-bitcoin-middleware-chronobank-io_transaction',
      block: '/exchange/events/internal-testnet-bitcoin-middleware-chronobank-io_block',
    },
  },
  // [BLOCKCHAIN_LITECOIN]: {
  //   bcNetworkId: 'litecoin_testnet',
  //   blockexplorer: 'https://chain.so/tx/LTCTEST',
  //   coinType: COIN_TYPE_LTC_TESTNET,
  //   symbol: 'LTC',
  //   channels: {
  //     balance: '/exchange/events/testnet-litecoin-middleware-chronobank-io_balance',
  //     block: '/exchange/events/testnet-litecoin-middleware-chronobank-io_block',
  //   },
  // },
  // [BLOCKCHAIN_NEM]: {
  //   bcNetworkId: 'testnet',
  //   blockexplorer: '',
  //   coinType: null,
  //   symbol: 'NEM',
  //   channels: {
  //     balance: '/exchange/events/testnet-nem-middleware-chronobank-io_balance',
  //     transaction: '/exchange/events/testnet-nem-middleware-chronobank-io_transaction',
  //   },
  // },
  // [BLOCKCHAIN_WAVES]: {
  //   bcNetworkId: 'TESTNET_CONFIG',
  //   blockexplorer: '',
  //   coinType: null,
  //   symbol: 'WAVES',
  //   channels: {
  //     balance: '/exchange/events/testnet-waves-middleware-chronobank-io_balance',
  //     transaction: '/exchange/events/testnet-waves-middleware-chronobank-io_transaction',
  //   },
  // },
}

export default {
  displaySections: [
    {
      sectionTitle: 'Production Networks',
      sectionDescription: 'Manage your funds',
      networks: [
        {
          networkId: 1,
          networkIndex: 0,
          networkTitle: 'ChronoBank - Mainnet (production)',
        },
        {
          networkId: 1,
          networkIndex: 1,
          networkTitle: 'Infura - Mainnet (production)',
        },
      ],
    },
    {
      sectionTitle: 'Test Networks',
      sectionDescription: 'Test networks with fake funds',
      networks: [
        {
          networkId: 4,
          networkIndex: 2,
          networkTitle: 'ChronoBank - Rinkeby (testnet)',

        },
        {
          networkId: 4,
          networkIndex: 3,
          networkTitle: 'Infura - Rinkeby (testnet)',
        },
        // {
        //   networkId: 4,
        //   networkIndex: 4,
        //   networkTitle: 'Local Node (testnet)',
        // },
      ],
    },
  ],
  availableNetworks: [
    {
      blockchain: blockchainMainnet,
      chronobankMiddlewares: availableChronoBankMiddlewareNodes[MAINNET],
      networkId: 1,
      networkIndex: 0,
      networkTitle: 'ChronoBank - Mainnet (production)',
      networkType: MAINNET,
      primaryNode: availableEthereumNodes[MAINNET].chronobank,
    },
    {
      blockchain: blockchainMainnet,
      chronobankMiddlewares: availableChronoBankMiddlewareNodes[MAINNET],
      networkId: 1,
      networkIndex: 1,
      networkTitle: 'Infura - Mainnet (production)',
      networkType: MAINNET,
      primaryNode: availableEthereumNodes[MAINNET].infura,
    },
    {
      blockchain: blockchainTestnet,
      chronobankMiddlewares: availableChronoBankMiddlewareNodes[TESTNET],
      networkId: 4,
      networkIndex: 2,
      networkTitle: 'ChronoBank - Rinkeby (testnet)',
      networkType: TESTNET,
      primaryNode: availableEthereumNodes[TESTNET].chronobank,
    },
    {
      blockchain: blockchainTestnet,
      chronobankMiddlewares: availableChronoBankMiddlewareNodes[TESTNET],
      networkId: 4,
      networkIndex: 3,
      networkTitle: 'Infura - Rinkeby (testnet)',
      networkType: TESTNET,
      primaryNode: availableEthereumNodes[TESTNET].infura,
    },
    // {
    //   blockchain: blockchainTestnet,
    //   chronobankMiddlewares: availableChronoBankMiddlewareNodes[TESTNET],
    //   networkId: 4,
    //   networkIndex: 4,
    //   networkTitle: 'Local Node (testnet)',
    //   networkType: TESTNET,
    //   primaryNode: availableEthereumNodes[TESTNET].local,
    // },
  ],
  selected: null,
  tokens: {},
  cryptocompare: {
    status: {
      connected: false,
      reconnecting: false,
    },
    subscriptions: [],
  },
}
