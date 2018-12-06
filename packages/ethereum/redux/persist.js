/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import storage from 'redux-persist/lib/storage'
import { DUCK_ETHEREUM } from './constants'

const ETHEREUM_PERSIST_CONFIG = {
  key: DUCK_ETHEREUM,
  version: '1.0',
  storage,
  whitelist: ['list'],
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  // See https://github.com/rt2zz/redux-persist/issues/786#issuecomment-421850652
  timeout: null,
}

export default ETHEREUM_PERSIST_CONFIG
