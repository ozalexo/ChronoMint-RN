/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import storage from 'redux-persist/lib/storage'
import { DUCK_BITCOIN } from './constants'

const BITCOIN_PERSIST_CONFIG = {
  key: DUCK_BITCOIN,
  version: '1.0',
  storage,
  whitelist: ['list'],
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  // See https://github.com/rt2zz/redux-persist/issues/786#issuecomment-421850652
  timeout: null,
}

export default BITCOIN_PERSIST_CONFIG
