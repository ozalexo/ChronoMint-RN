/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'

export const networkSelect = (networkIndex) => ({
  type: ActionTypes.NETWORK_SELECT,
  networkIndex,
})
