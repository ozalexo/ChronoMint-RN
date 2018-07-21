/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

// #region imports
import {
  createSwitchNavigator
} from 'react-navigation'
import WalletStack from './WalletStack'
import DrawerRight from './DrawerRight'
// #endregion

/**
 * Root stack of the application (this is entry point for cold app start).
 * Switch between Login and Wallet stacks.
 * Each stack starts from Drawer's stack which contains stack of screens
 */
const AppNavigator = createSwitchNavigator(
  {
    LoginStack: DrawerRight,
    WalletStack
  },
  {
    initialRouteName: 'LoginStack'
  }
)

export default AppNavigator
