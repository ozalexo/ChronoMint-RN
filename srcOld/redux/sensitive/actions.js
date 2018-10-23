/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { type Dispatch } from 'redux'
import { createCipher, createHash } from 'crypto'
import { addError } from '@chronobank/login/redux/network/actions'
import salt from '../../utils/salt'
import { type TStoredAccount } from './reducer'

export const DUCK_SENSITIVE = 'sensitive'

export const types = {
  SET_USE_PIN_PROTECTION: 'sensitive/SET_USE_PIN_PROTECTION',
  SET_PIN: 'sensitive/SET_PIN',
  SET_LAST_ACCOUNT: 'sensitive/SET_LAST_ACCOUNT',
  ADD_ACCOUNT: 'sensitive/ADD_ACCOUNT',
}

export const setUsePinProtection = (payload: boolean) => ({
  type: types.SET_USE_PIN_PROTECTION,
  payload,
})

export const addAccount = ({ address, privateKey }: { address: string, privateKey: string }, password: string, pin?: string) =>
  async (dispatch: Dispatch<{type: string, payload: TStoredAccount }>) => {
    try {
      let passwordHash
      let pinHash
      let encryptedWithPasswordPrivateKey
      let encryptedWithPinPrivateKey

      const hashForPassword = createHash('sha256')
      hashForPassword.update(salt(password))
      passwordHash = hashForPassword.digest('hex')

      const cipherWithPassword = createCipher('aes-256-cbc', password)
      encryptedWithPasswordPrivateKey = cipherWithPassword.update(privateKey, 'utf8', 'hex')
      encryptedWithPasswordPrivateKey += cipherWithPassword.final('hex')

      if (typeof pin !== 'undefined') {
        const hashForPin = createHash('sha256')
        hashForPin.update(salt(pin))
        pinHash = hashForPin.digest('hex')

        const cipherWithPin = createCipher('aes-256-cbc', salt(pin))
        encryptedWithPinPrivateKey = cipherWithPin.update(privateKey, 'utf8', 'hex')
        encryptedWithPinPrivateKey += cipherWithPin.final('hex')
      }

      dispatch({
        type: types.ADD_ACCOUNT,
        payload: {
          address,
          encryptedWithPasswordPrivateKey,
          encryptedWithPinPrivateKey,
          passwordHash,
          pinHash,
        },
      })
    } catch (error) {
      dispatch(addError(error))
    }
  }

export const setLastAccount = (address: string) => ({
  type: types.SET_LAST_ACCOUNT,
  payload: address,
})
