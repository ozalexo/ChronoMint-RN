/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as Keychain from 'react-native-keychain'
import * as apiETH from '../service/api'
import { getBalance } from '../middleware/thunks'
import { encryptWallet, createEthWallet, mnemonicToPrivateKeyAndAddress } from '../utils'
import { amountToBalance } from '../utils/amount'
import * as Actions from './actions'

export const createAccountByMnemonic = (mnemonic, password) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const decryptedWallet = mnemonicToPrivateKeyAndAddress(mnemonic)

      const ethAddress = decryptedWallet.address
      const encryptedWallet = await encryptWallet(decryptedWallet, password)

      if (!ethAddress) {
        return reject('0001: No ETH address!')
      }
      if (!encryptedWallet) {
        return reject('0002: No ETH encrypted wallet!')
      }

      dispatch(Actions.ethereumCreateWallet(ethAddress, encryptedWallet, decryptedWallet.path))
      await Keychain.setInternetCredentials(ethAddress, ethAddress, password)

      return resolve(decryptedWallet)

    } catch (error) {
      return reject(error)
    }
  })
}

export const createAccountByPrivateKey = (privateKey, password) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const decryptedWallet = createEthWallet(privateKey)
      const ethAddress = decryptedWallet.address
      const encryptedWallet = await encryptWallet(decryptedWallet, password)

      if (!ethAddress) {
        return reject('0001: No ETH address!')
      }
      if (!encryptedWallet) {
        return reject('0002: No ETH encrypted wallet!')
      }

      dispatch(Actions.ethereumCreateWallet(ethAddress, encryptedWallet, decryptedWallet.path))
      await Keychain.setInternetCredentials(ethAddress, ethAddress, password)

      return resolve(decryptedWallet.privateKey)
    } catch (error) {
      return reject(error)
    }
  })
}

export const ethereumUpdateBalance = ({ tokenSymbol, address, balance, amount, decimals }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumUpdateBalance({ tokenSymbol, address, balance, amount, decimals }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const selectEthereumWallet = ({ address, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(apiETH.requestEthereumTransactionsHistoryByAddress(address))
        .then((response) => {
          const timestamps = []
          const txList = response.payload.data.map((tx) => {
            timestamps.push(tx.timestamp)
            return {
              balance: amountToBalance(tx.value).toString(),
              blockNumber: tx.blockNumber,
              confirmations: tx.confirmations,
              from: tx.from,
              gas: tx.gas,
              gasPrice: tx.gasPrice,
              hash: tx.hash,
              index: tx.index,
              nonce: tx.nonce,
              timestamp: tx.timestamp,
              to: tx.to,
              value: tx.value,
            }
          })
          dispatch(updateEthereumTxHistory({
            address,
            masterWalletAddress,
            txList,
            latestTxDate: Math.max(...timestamps),
            withReset: true,
          }))
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error)
        })
      dispatch(Actions.selectEthereumWallet({ address }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const dropEthereumSelectedWallet = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.dropEthereumSelectedWallet())
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const createEthereumTxDraft = ({ address, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.createEthereumTxDraft({ address, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const deleteEthereumTxDraft = ({ masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.deleteEthereumTxDraft({ masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftChainIdNonce = ({ chainId, nonce, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftNonce({ nonce, masterWalletAddress }))
      dispatch(Actions.updateEthereumTxDraftChainId({ chainId, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftGasPrice = ({ gasPrice, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftGasPrice({ gasPrice, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftGasLimit = ({ gasLimit, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftGasLimit({ gasLimit, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftTo = ({ to, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftTo({ to, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftValue = ({ value, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftValue({ value, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftData = ({ data, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftData({ data, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxDraftSignedTx = ({ signedTx, masterWalletAddress }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.updateEthereumTxDraftSignedTx({ signedTx, masterWalletAddress }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const updateEthereumTxHistory = ({ latestTxDate, txList, masterWalletAddress, address, withReset = false }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(Actions.ethereumTxUpdateHistory({ latestTxDate, txList, masterWalletAddress, address, withReset }))
      return resolve()
    } catch (e) {
      return reject(e)
    }
  })
}

export const requestAndSubscribeEthereumWallet = (address) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      // Register a wallet on middleware
      dispatch(apiETH.requestEthereumSubscribeWalletByAddress(address))
        .then(() => {
          // Do nothing. Data will be received via WS.
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error registering ETH wallet on middlewre:', error)
        })
      
      // Request ETH balance via middleware
      // dispatch(apiETH.requestEthereumBalanceByAddress(address))
      //   // eslint-disable-next-line no-console
      //   .then(() => {
      //     // TODO: do we need a balance from middleware at all?
      //   })
      //   .catch((error) => {
      //     // eslint-disable-next-line no-console
      //     console.log('Error requesting ETH wallet balance from middleware:', error)
      //   })

      dispatch(getBalance(address))
        .then((amount) => {
          const balance = amountToBalance(amount)
          // TODO: we need to update ERC20 tokens also
          dispatch(ethereumUpdateBalance({ tokenSymbol: 'ETH', address, balance, amount }))
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error requiesting ETH balance via web3', error)
        })
      return resolve()
    } catch (error) {
      return reject(error)
    }
  })
}
