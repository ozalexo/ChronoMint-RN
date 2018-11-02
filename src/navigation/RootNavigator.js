/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  createSwitchNavigator,
} from 'react-navigation'
import DrawerLanguageNavigator from './DrawerLanguageNavigator'
import DrawerMainMenuNavigator from './DrawerMainMenuNavigator'

const RootNavigator = createSwitchNavigator(
  {
    'Login': DrawerLanguageNavigator,
    'Wallet': DrawerMainMenuNavigator,
  },
  {
    initialRouteName: 'Login',
  }
)

export default RootNavigator
