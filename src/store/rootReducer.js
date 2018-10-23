/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { combineReducers } from 'redux'
import { i18nReducer } from 'react-redux-i18n'
import { reducer as formReducer } from 'redux-form'

import { DUCK_MARKET } from '@chronobank/market/redux/constants'
import { DUCK_MODALS } from '../redux/modals/constants'
import { DUCK_NOTIFIER } from '../redux/notifier/constants'
import { DUCK_SIDES } from '../redux/sides/constants'
import coreReducers from '@chronobank/core/redux/reducers'
import market from '@chronobank/market/redux/reducers'
import modals from '../redux/modals/reducer'
import notifier from '../redux/notifier/reducer'
import sides from '../redux/sides/reducer'

export default combineReducers({
  ...coreReducers,
  [DUCK_MARKET]: market,
  [DUCK_MODALS]: modals,
  [DUCK_NOTIFIER]: notifier,
  [DUCK_SIDES]: sides,
  form: formReducer,
  i18n: i18nReducer,
})
