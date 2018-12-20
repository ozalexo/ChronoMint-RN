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
        from: '',
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

const selectEthereumWallet = (state, { address }) => ({
  ...state,
  selected: address,
})

const mutations = {

  [REHYDRATE]: ethereumRehydrate,
  [ActionsTypes.ETHEREUM_CREATE_DERIVED_WALLET]: ethereumCreateDerivedWallet,
  [ActionsTypes.ETHEREUM_CREATE_WALLET]: ethereumCreateWallet,
  [ActionsTypes.ETHEREUM_SELECT_WALLET]: selectEthereumWallet,
  [ActionsTypes.ETHEREUM_UPDATE_BALANCE]: updateEthereumBalance,
  [ActionsTypes.ETHEREUM_CREATE_TX_DRAFT]: ethereumCreateTxDraft,
}

export default (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}
