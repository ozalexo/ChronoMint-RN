/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import Accounts from 'web3-eth-accounts'
import uuid from 'uuid/v1'
import {
  AccountEntryModel
} from '@chronobank/core/models/wallet/persistAccount'

export const createProfileAccount = (
  name: string = '',
  password: string,
  privateKey: string,
) => {
  const hex = '0x' + privateKey
  const accounts = new Accounts() // creating empty wallet
  const wallet = accounts.wallet.create()

  // try..catch is required here, because privateKeyToAccount method does not verify anything and may occasionally throw an exception
  try {
    const account = accounts.privateKeyToAccount(hex)
    wallet.add(account)
    const encrypted = wallet.encrypt(password)

    return new AccountEntryModel({
      key: uuid(),
      name,
      types: {}, // this is 'types'. But what is it?
      encrypted,
      profile: null,
    })
  } catch (error) {
    console.log('Error creating new eth account:', error)
    return null
  }
}
