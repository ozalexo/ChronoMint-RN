/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { bootstrap } from '@chronobank/core/redux/session/actions'
import store from './redux/configureStore'

const startPreparations = () => {
  store
    .dispatch((dispatch, getState) => {
      dispatch({ type: '@appinit/INIT_LOGIN_SERVICES' })
      return Promise.resolve(dispatch)
    })
    .then((dispatch) => {
      // Now action bootstrap returns networkService instance. We do not need to import it here in this module
      return Promise.resolve(dispatch(bootstrap(false, false, false)))
    })
    .then((networkService) => {
      networkService.selectProvider(2)
      networkService.selectNetwork(4)
    })
}

export default startPreparations
