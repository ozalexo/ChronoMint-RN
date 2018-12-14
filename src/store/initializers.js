/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { autoSelectNetwork } from '@chronobank/network/redux/thunks'
import { init } from '@chronobank/ethereum/middleware/thunks'

// eslint-disable-next-line import/prefer-default-export
export const initWeb3 = (store) => {
  store.dispatch(init())
  store.dispatch(autoSelectNetwork())
}
