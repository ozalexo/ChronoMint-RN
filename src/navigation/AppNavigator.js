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
import LoginStack from './LoginStack'
// #endregion

/**
 * Root stack of the application.
 * Switch between Login and Wallet stacks.
 */
const AppNavigator = createSwitchNavigator(
  {
    LoginStack,
    WalletStack
  },
  {
    initialRouteName: 'LoginStack',
    navigationOptions: {
      headerTransparent: true
    }
  }
)

export default AppNavigator
