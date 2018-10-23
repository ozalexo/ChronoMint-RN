/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { combineReducers } from 'redux'

import { DUCK_MARKET } from '@chronobank/market/redux/constants'
import marketReducer from '@chronobank/market/redux/reducers'
import coreReducers from '@chronobank/core/redux/reducers'

export default combineReducers({
  [DUCK_MARKET]: marketReducer,
  ...coreReducers
})
