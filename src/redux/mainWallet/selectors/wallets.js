/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import {
  createSelector,
  createSelectorCreator,
  defaultMemoize,
} from 'reselect'
import type AddressModel from '@chronobank/core/models/wallet/AddressModel'
import type MainWalletModel from '@chronobank/core/models/wallet/MainWalletModel'
import { mainWalletStore } from './models'

const createSectionsSelector = createSelectorCreator(
  defaultMemoize,
  (a, b) => {
    if (a.length !== b.length) {
      return false
    }
    let compareResult = true
    for (let i = 0; i++; i <= a.length) {
      if (a[i].blockchain !== b[i].blockchain || a[i].address !== b[i].address) {
        compareResult = false
        break
      }
    }
    return compareResult
  }
)

const selectMainWalletsList = createSelector(
  [
    mainWalletStore,
  ],
  (mainWallet: MainWalletModel): any[] =>
    mainWallet
      .addresses()
      .items()
      .filter( (addressModel: AddressModel) =>
        addressModel.id() && addressModel.address()
      )
      .map( (addressModel: AddressModel) => {
        const blockchain: string = addressModel.id()
        const address: ?string = addressModel.address()
        const jsWallet = Object.create(null)
        jsWallet['address'] = address
        jsWallet['blockchain'] = blockchain
        return jsWallet
      })
      .sort( ({ blockchain: a }, { blockchain: b }) =>
        (a > b) - (a < b)
      )
)

/**
 * Provides list of wallets sections
 * Output example:
 * [
 *   {
 *     blockchain: 'Bitcoin',
 *     address: ''
 *   },
 *   {
 *     blockchain: 'Ethereum',
 *     address: ''
 *   }
 * ]
*/
// eslint-disable-next-line import/prefer-default-export
export const sectionsSelector = createSectionsSelector(
  [
    selectMainWalletsList,
  ],
  (
    mainWalletsList,
  ) => {

    const sectionsObject = []

    mainWalletsList
      .forEach( (mainWallet) => {
        const { address, blockchain } = mainWallet
        sectionsObject.push({
          title: blockchain,
          data: [{
            address: address,
            blockchain,
          }],
        })
      })
    return sectionsObject
  }
)

