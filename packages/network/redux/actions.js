/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionTypes from './constants'

// eslint-disable-next-line import/prefer-default-export
export const networkSelect = (networkIndex) => ({
  type: ActionTypes.NETWORK_SELECT,
  networkIndex,
})
