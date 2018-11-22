/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionsTypes from './constants'

export const ethereumCreateWallet = (address) => ({
  type: ActionsTypes.ETHEREUM_CREATE_WALLET,
  address,
})
