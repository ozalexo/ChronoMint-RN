/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

/* eslint-disable import/prefer-default-export */
import * as Immutable from 'immutable'
import { types } from './actions'

export type TStoredAccount = {
  address: string,
} & (
  {
    encryptedWithPasswordPrivateKey: string,
    passwordHash: string,
  } |
  {
    encryptedWithPinPrivateKey: string,
    pinHash: string,
  }
)

export type TStateSensitive = {
  usePinProtection: boolean,
  accounts: Immutable.Map<string, TStoredAccount>,
}

type TActionSensitive = {
  type: $Keys<typeof types>,
  payload: any,
}

const initialState: TStateSensitive = {
  usePinProtection: true,
  accounts: Immutable.Map(),
}

export const sensitive = (state: TStateSensitive = initialState, { type, payload }: TActionSensitive) => {
  switch (type) {
    case types.SET_USE_PIN_PROTECTION: return {
      ...state,
      usePinProtection: payload,
    }
    case types.SET_PIN: return {
      ...state,
      pinHash: payload,
    }
    case types.ADD_ACCOUNT: {
      const { accounts, ...restState } = state

      return {
        ...restState,
        accounts: (accounts || Immutable.Map()).set(payload.address, payload),
      }
    }
    case types.SET_LAST_ACCOUNT: return {
      ...state,
      lastAccount: state.accounts.get(payload) || {},
    }
    default:
      return state
  }
}
