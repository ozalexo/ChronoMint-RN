/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionsTypes from './constants'

export const ethSaveAddress = (address) => ({
  type: ActionsTypes.ETH_SAVE_ADDRESS,
  address,
})
