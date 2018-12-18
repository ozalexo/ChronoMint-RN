/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { createBitcoinWallet } from '@chronobank/bitcoin/redux/thunks'
import {
  login,
  logout,
} from './actions'
import {
  startMarket,
  stopMarket,
} from '@chronobank/market/middleware/thunks'
import {
  rmqConnect,
  rmqDisconnect,
} from '@chronobank/network/redux/thunks'

export const loginThunk = (ethAddress, privateKey) => (dispatch) => {
  return new Promise((resolve, reject) => {
    if (!ethAddress || !privateKey) {
      return reject('0003: No ETH address or privateKey provided!')
    }

    try {
      dispatch(startMarket())
      dispatch(rmqConnect())
        .then(() => {
          dispatch(createBitcoinWallet(privateKey, ethAddress))
            .then(() => {
              dispatch(login(ethAddress))
              return resolve()
            })
            .catch((error) => {
              return reject(error)
            })
        })
        .catch((error) => {
          return reject(error)
        })
    } catch (error) {
      return reject(error)
    }
  })
}

export const logoutThunk = () => (dispatch) => {
  try {
    dispatch(rmqDisconnect())
    dispatch(stopMarket())
    return dispatch(logout())
  } catch (error) {
    return Promise.reject(error)
  }
}
