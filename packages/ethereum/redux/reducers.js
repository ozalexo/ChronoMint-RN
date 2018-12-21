/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { REHYDRATE } from 'redux-persist'
import { ETH_PRIMARY_TOKEN, DECIMALS } from '../constants'
import * as ActionsTypes from './constants'
import initialState from './initialState'

const ethereumRehydrate = (state, payload) => {
  // action.payload is undefined if LocalStorage is empty
  // See https://github.com/rt2zz/redux-persist/issues/719
  if (!payload.payload || payload.key !== ActionsTypes.DUCK_ETHEREUM) {
    return state
  }
  return {
    ...state,
    list: payload.payload.list,
  }
}

const ethereumCreateWallet = (state, { address, encrypted, path }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [address]: {
      address,
      path,
      tokens: {
        [ETH_PRIMARY_TOKEN]: {
          balance: null,
          amount: null,
          symbol: ETH_PRIMARY_TOKEN,
          decimals: DECIMALS,
        },
      },
      encrypted,
      transactions: {
        latestTxDate: null,
        txList: [],
      },
    },
  }
  return {
    ...state,
    list,
  }
}

const ethereumCreateDerivedWallet = (state, { masterWalletAddress, address }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [masterWalletAddress]: {
      ...list[masterWalletAddress],
      deriveds: {
        ...list[masterWalletAddress].deriveds,
        [address]: { address },
      },
    },
  }
  return {
    ...state,
    list,
  }
}

const updateEthereumBalance = (state, { tokenSymbol, address, balance, amount }) => {
  return {
    ...state,
    list: {
      ...state.list,
      [address]: {
        ...state.list[address],
        tokens: {
          ...state.list[address].tokens,
          [tokenSymbol]: {
            ...state.list[address].tokens[tokenSymbol],
            balance,
            amount,
          },
        },
      },
    },
  }
}

const ethereumCreateTxDraft = (state, { masterWalletAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [masterWalletAddress]: {
      ...list[masterWalletAddress],
      txDraft: {
        nonce: null,
        gasLimit: null,
        gasPrice: null,
        chainId: null,
        to: '',
        from: masterWalletAddress,
        value: null,
        data: '',
        unsignedTx: null,
        signedTx: null,
      },
    },
  }

  return {
    ...state,
    list,
  }
}

const ethereumDeleteTxDraft = (state, { masterWalletAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [masterWalletAddress]: {
      ...list[masterWalletAddress],
    },
  }

  return {
    ...state,
    list,
  }
}

const ethereumTxUpdateNonce = (state, { nonce, masterWalletAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [masterWalletAddress]: {
      ...list[masterWalletAddress],
      txDraft: {
        ...list[masterWalletAddress].txDraft,
        nonce,
      },
    },
  }

  return {
    ...state,
    list,
  }
}

const ethereumTxUpdateGasLimit = (state, { gasLimit, masterWalletAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [masterWalletAddress]: {
      ...list[masterWalletAddress],
      txDraft: {
        ...list[masterWalletAddress].txDraft,
        gasLimit,
      },
    },
  }

  return {
    ...state,
    list,
  }
}

const ethereumTxUpdateGasPrice = (state, { gasPrice, masterWalletAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [masterWalletAddress]: {
      ...list[masterWalletAddress],
      txDraft: {
        ...list[masterWalletAddress].txDraft,
        gasPrice,
      },
    },
  }

  return {
    ...state,
    list,
  }
}

const ethereumTxUpdateChainId = (state, { chainId, masterWalletAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [masterWalletAddress]: {
      ...list[masterWalletAddress],
      txDraft: {
        ...list[masterWalletAddress].txDraft,
        chainId,
      },
    },
  }

  return {
    ...state,
    list,
  }
}

const ethereumTxUpdateTo = (state, { to, masterWalletAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [masterWalletAddress]: {
      ...list[masterWalletAddress],
      txDraft: {
        ...list[masterWalletAddress].txDraft,
        to,
      },
    },
  }

  return {
    ...state,
    list,
  }
}

const ethereumTxUpdateValue = (state, { value, masterWalletAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [masterWalletAddress]: {
      ...list[masterWalletAddress],
      txDraft: {
        ...list[masterWalletAddress].txDraft,
        value,
      },
    },
  }

  return {
    ...state,
    list,
  }
}

const ethereumTxUpdateData = (state, { data, masterWalletAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [masterWalletAddress]: {
      ...list[masterWalletAddress],
      txDraft: {
        ...list[masterWalletAddress].txDraft,
        data,
      },
    },
  }

  return {
    ...state,
    list,
  }
}

const ethereumTxUpdateSignedTx = (state, { signedTx, masterWalletAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [masterWalletAddress]: {
      ...list[masterWalletAddress],
      txDraft: {
        ...list[masterWalletAddress].txDraft,
        signedTx,
      },
    },
  }

  return {
    ...state,
    list,
  }
}

const selectEthereumWallet = (state, { address }) => ({
  ...state,
  selected: address,
})

const ethereumTxUpdateHistory = (state, { latestTxDate, txList, address, masterWalletAddress }) => {
  let list = Object.assign({}, state.list)
  list = {
    ...list,
    [masterWalletAddress]: {
      ...list[masterWalletAddress],
      transactions: {
        ...list[masterWalletAddress].transactions,
        latestTxDate,
        txList: [
          ...list[masterWalletAddress].transactions.txList,
          ...txList,
        ],
      },
    },
  }

  return {
    ...state,
    list,
  }
}

const dropEthereumSelectedWallet = (state) => {
  return {
    ...state,
    selected: null,
  }
}

const mutations = {

  [REHYDRATE]: ethereumRehydrate,
  [ActionsTypes.ETHEREUM_CREATE_DERIVED_WALLET]: ethereumCreateDerivedWallet,
  [ActionsTypes.ETHEREUM_CREATE_WALLET]: ethereumCreateWallet,
  [ActionsTypes.ETHEREUM_SELECT_WALLET]: selectEthereumWallet,
  [ActionsTypes.ETHEREUM_DROP_SELECTED_WALLET]: dropEthereumSelectedWallet,
  [ActionsTypes.ETHEREUM_UPDATE_BALANCE]: updateEthereumBalance,
  [ActionsTypes.ETHEREUM_CREATE_TX_DRAFT]: ethereumCreateTxDraft,
  [ActionsTypes.ETHEREUM_DELETE_TX_DRAFT]: ethereumDeleteTxDraft,
  [ActionsTypes.ETHEREUM_UPDATE_TX_DRAFT_NONCE]: ethereumTxUpdateNonce,
  [ActionsTypes.ETHEREUM_UPDATE_TX_DRAFT_GAS_LIMIT]: ethereumTxUpdateGasLimit,
  [ActionsTypes.ETHEREUM_UPDATE_TX_DRAFT_GAS_PRICE]: ethereumTxUpdateGasPrice,
  [ActionsTypes.ETHEREUM_UPDATE_TX_DRAFT_CHAIN_ID]: ethereumTxUpdateChainId,
  [ActionsTypes.ETHEREUM_UPDATE_TX_DRAFT_TO]: ethereumTxUpdateTo,
  [ActionsTypes.ETHEREUM_UPDATE_TX_DRAFT_VALUE]: ethereumTxUpdateValue,
  [ActionsTypes.ETHEREUM_UPDATE_TX_DRAFT_DATA]: ethereumTxUpdateData,
  [ActionsTypes.ETHEREUM_UPDATE_TX_DRAFT_SIGNED_TX]: ethereumTxUpdateSignedTx,
  [ActionsTypes.ETHEREUM_TX_UPDATE_HISTORY]: ethereumTxUpdateHistory,
}

export default (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}
