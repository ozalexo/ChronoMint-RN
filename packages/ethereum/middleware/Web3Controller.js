/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import Web3 from 'web3'
import { Map } from 'immutable'
import ERC20DAODefaultABI from './abi/ERC20DAODefaultABI'
// import TokenManagementInterfaceABI from 'chronobank-smart-contracts/build/contracts/TokenManagementInterface.json'
import BigNumber from 'bignumber.js'
import web3utils from 'web3/lib/utils/utils'
import * as Utils from './abi/utils'
import ContractList from './abi'
// import * as NodesActions from '../../nodes/actions'
import * as Web3Actions from './actions'
import * as Web3Thunks from './thunks'
import Web3Provider from './Web3Provider'

export default class Web3Controller {
  constructor (
    dispatch,
    host,
    networkId,
    provider
  ) {
    this.dispatch = dispatch
    this.host = host // 'ws://localhost:40510'
    this.provider = provider
    this.web3 = null
    this.syncing = null
    this.requiredTokens = []
    this.contracts = new Map()
    this.networkId = networkId
    this.tokens = new Map()
    this.isReconnectRequired = true
    this.tokenSubscriptions = []
    this.contractSubscriptions = []
    this.syncStatusSubscription = null
  }

  reconnect () {
    this.provider && this.provider.disconnect()
    this.web3 = null
    this.syncing = null
    this.requiredTokens = []
    this.contracts = new Map()
    this.tokens = new Map()
    this.isReconnectRequired = true
    this.tokenSubscriptions = []
    this.contractSubscriptions = []
    this.syncStatusSubscription = null
    return this.initController()
  }

  onErrorHandler = (/*error*/) => {
    // console.log('onErrorHandler error', error)
    // this.dispatch(NodesActions.primaryNodeError(this.host, error))
  }

  onEndHandler = (error) => {
    // console.log('onEndHandler error', error)
    this.dispatch(Web3Actions.connectFailure(error))
    this.provider && this.provider.disconnect()

    if (!this.web3) {
      return
    }

    this.resetTokens()
    this.resetContracts()

    setTimeout(() => {
      this.dispatch(Web3Thunks.reconnect())
    }, 5000)
  }

  initController () {
    return new Promise((resolve, reject) => {
      try {
        this.provider = this.provider || new Web3Provider(this.host)
        // console.log('Provider', this.provider)
        this.provider
          .connect()
          .then(() => {
            // console.log('Connected?')
            this.provider
              .on('error', this.onErrorHandler)
              .on('end', this.onEndHandler)
            // console.log('this.provider.connected', this.provider.connected)
            if (this.provider.connected) {

              this.web3 = new Web3(this.provider)
              // this.dispatch(Web3Actions.connectSuccess(this.host))
              this.web3.eth.net
                .getId()
                .then((netId) => {
                  // console.log('Network id from Eth node:', netId)
                  if (netId === 1 || netId === 4) {
                    this.dispatch(Web3Actions.connectSuccess(this.host))
                    this.checkSyncStatus()
                    this.initContracts()
                    // this.subscribeOnContractsEvents()
                  } else {
                    this.provider.disconnect()
                    this.web3 = null
                    this.provider = null
                    this.dispatch(Web3Actions.incompatibleNetwork(netId))
                  }
                })
                .catch(() => {
                  this.dispatch(Web3Thunks.reconnect())
                })
              return resolve()
            } else {
              // console.log('Not connected.')
              return reject()
            }
          })
          .catch(() => {
            this.dispatch(Web3Thunks.reconnect())
            return reject()
          })
      } catch (error) {
        // console.log('e2', error)
        setTimeout(() => {
          this.dispatch(Web3Thunks.reconnect())
        }, 10000)
        return reject()
      }
    })
  }

  initTokenContract (tokenSymbol, tokenAddress) {
    this.tokens = this.tokens.set(tokenSymbol, new this.web3.eth.Contract(ERC20DAODefaultABI.abi, tokenAddress))
  }

  unsubscribeFromAllEvents () {
    this.tokenSubscriptions && this.tokenSubscriptions.forEach((subscription) => {
      try {
        subscription.removeAllListeners && subscription.removeAllListeners()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error clearing token subscriptions:', error)
      }
    })
    this.contractSubscriptions && this.contractSubscriptions.forEach((subscription) => {
      try {
        subscription.removeAllListeners && subscription.removeAllListeners()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error clearing contract subscriptions:', error)
      }
    })
    this.syncStatusSubscription && this.syncStatusSubscription.removeAllListeners()
    // this.web3.eth.clearSubscriptions()
    this.syncStatusSubscription = null
    this.tokenSubscriptions = []
    this.contractSubscriptions = []
  }

  subscribeOnTokenEvents () {
    this.tokens.forEach((tokenContract, tokenSymbol) => {
      if (!tokenContract.events) {
        return
      }
      this.tokenSubscriptions.push(
        tokenContract.events
          .allEvents({})
          .on('changed', (/*event*/) => {
            //#console.log('Token %s changed event', tokenSymbol, event)
          })
          .on('data', (data) => {
            if (!data || !data.event) {
              return
            }
            const eventType = data.event.toLowerCase()
            switch (eventType) {
            case 'transfer': {
              // eslint-disable-next-line no-console
              console.log('Token %s transfer event \'%s\':', tokenSymbol, eventType, data)
              // if (this.requiredTokens.length === 0 || this.requiredTokens.includes(tokenSymbol)) {
              //   this.dispatch(NodesActions.tokenTransfer(tokenSymbol, data))
              // }
              break
            }
            case 'approval': {
              // eslint-disable-next-line no-console
              console.log('Token %s approval event \'%s\':', tokenSymbol, eventType, data)
              break
            }
            }
          })
          .on('error', (error) => {
            // eslint-disable-next-line no-console
            console.log(`Error of token ${tokenSymbol}\n`, error)
          })
      )
    })
  }

  subscribeOnContractsEvents () {
    this.contracts.forEach((contract, contractName) => {
      // eslint-disable-next-line no-underscore-dangle
      if (!contract.events || !contract._address) {
        return
      }
      this.contractSubscriptions.push(
        contract.events
          .allEvents({})
          .on('data', (data) => {
            if (!data || !data.event) {
              return
            }
            //#console.log('Contract %s event:', contractName, data)
          })
          .on('error', (error) => {
            // eslint-disable-next-line no-console
            console.log('Error of contract %s', contractName, error)
          })
      )
    })
  }

  changeProvider (host, networkId) {
    this.unsubscribeFromAllEvents()
    this.tokens = new Map()
    this.contracts = new Map()
    this.provider.disconnect()
    this.host = host
    this.networkId = networkId
    this.provider = null
    this.web3 = null
    this.initController()
  }

  resetTokens () {
    this.unsubscribeFromAllEvents()
    this.tokens = new Map()
  }

  resetContracts () {
    this.contracts = new Map()
  }

  getContractByName (contractName) {
    return this.contracts[contractName]
  }

  getTokenContractByName (tokenContractName) {
    return this.tokens[tokenContractName]
  }

  async loadTokens () {
    const Erc20Manager = this.contracts.get('ERC20Manager')
    if (Erc20Manager) {
      const res = await Erc20Manager.methods.getTokens([]).call()
      /* eslint-disable no-underscore-dangle */
      const addresses = res._tokensAddresses
      const names = res._names
      const symbols = res._symbols
      const urls = res._urls
      const decimalsArr = res._decimalsArr
      const ipfsHashes = res._ipfsHashes
      /* eslint-enable no-underscore-dangle */
      const gasPrice = await this.web3.eth.getGasPrice()
      const bnGasPrice = new BigNumber(gasPrice)
      addresses.forEach((address, i) => {
        const model = {
          address: address.toLowerCase(),
          name: web3utils.toUtf8(names[i]),
          symbol: web3utils.toUtf8(symbols[i]).toUpperCase(),
          url: web3utils.toUtf8(urls[i]),
          decimals: parseInt(decimalsArr[i]),
          icon: Utils.bytes32ToIPFSHash(ipfsHashes[i]),
          feeRate: {
            wei: bnGasPrice,
            gwei: web3utils.fromWei(bnGasPrice, 'gwei'),
          },
          events: false,
        }
        this.initTokenContract(model.symbol, model.address)
      })
      this.subscribeOnTokenEvents()
    } else {
      // eslint-disable-next-line no-console
      //#console.log('Contract Erc20Manager is not initialized.')
    }
  }

  initContracts () {
    const abstractContracts = [
      'ChronoBankPlatformEmitterABI',
      'FeeInterfaceABI',
      'PlatformTokenExtensionGatewayManagerEmitterABI',
      'PollEmitterABI',
      'PollInterfaceABI',
      'WalletABI',
    ]
    const contractNameList = Object.keys(ContractList)
    contractNameList.forEach((contractObjectName) => {
      const contract = ContractList[contractObjectName]
      const abi = contract.abi
      try {
        const address = Utils.getContractAddressByNetworkId(contract.networks, this.networkId, contractObjectName)
        this.contracts = this.contracts.set(contract.contractName, new this.web3.eth.Contract(abi, address))
        this.dispatch(Web3Actions.appendContract(contractObjectName))
      } catch (error) {
        if (abstractContracts.includes(contractObjectName)) {
          this.contracts.set(contract.contractName, (address) => new this.web3.eth.Contract(abi, address))
          this.dispatch(Web3Actions.appendContract(contractObjectName))
        } else {
          // TODO: to handle possible errors
          // eslint-disable-next-line no-console
          console.log(error.message)
        }
      }
    })
    this.loadTokens()
  }

  getWeb3Instance () {
    return this.web3
  }

  getWeb3CurrentProvider () {
    return this.web3.currentProvider
  }

  // TODO: see https://web3js.readthedocs.io/en/1.0/web3-eth-subscribe.html?highlight=clearSubscriptions#subscribe-syncing
  checkSyncStatus () {
    // TODO: Need to clarify algorythm and what to do in case of errors
    // See https://web3js.readthedocs.io/en/1.0/web3-eth.html#issyncing
    const requestSyncState = () => {
      this.web3.eth.isSyncing()
        .then((syncStatus) => {
          //#console.log('Manual checking node status:', syncStatus)
          if (syncStatus === true) {
            // const syncingComplete = false
            // const progress = 0
            // this.dispatch(NodesActions.primaryNodeSetSyncingStatus(syncingComplete, progress))
          } else {
            if (syncStatus) {
              // const syncingComplete = false
              // const progress = (syncStatus.currentBlock - syncStatus.startingBlock) / (syncStatus.highestBlock - syncStatus.startingBlock)
              // this.dispatch(NodesActions.primaryNodeSetSyncingStatus(syncingComplete, progress))
            } else {
              // const syncingComplete = true
              // const progress = 1
              // this.dispatch(NodesActions.primaryNodeSetSyncingStatus(syncingComplete, progress))
            }
          }
        })
        .catch((error) => {
          // const syncingInProgress = true
          // const progress = 0
          // this.dispatch(NodesActions.primaryNodeSetSyncingStatus(syncingInProgress, progress))
          // eslint-disable-next-line no-console
          console.log('Set SIP, progress 0', error)
        })
    }
    requestSyncState()
    /* eslint-disable no-console */
    this.syncStatusSubscription = this.web3.eth
      .subscribe('syncing')
      .on('data', (data) => { console.log('SYNC data:', data); requestSyncState() })
      .on('changed', (changed) => { console.log('SYNC changed:', changed) })
      .on('error', (error) => { console.log('SYNC error:', error) })
    /* eslint-enable no-console */
  }

}
