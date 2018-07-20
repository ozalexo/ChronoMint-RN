/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

// #region imports
import React from 'react'
import {
  createDrawerNavigator,
  createStackNavigator,
  DrawerActions
} from 'react-navigation'
// #endregion

// #region MainMenu Drawer
import DrawerContainer from '../containers/DrawerContainer'
// #endregion

// #region Wallet imports
import ConfirmSend from '../containers/ConfirmSendContainer'
import SelectToken from '../screens/SelectToken'
import Send from '../containers/SendContainer'
import TransactionDetails from '../screens/TransactionDetails'
import Wallet from '../containers/WalletContainer'
import WalletOwnersTab from '../containers/WalletOwnersTabContainer'
import WalletsList from '../containers/WalletsListContainer'
import WalletTemplatesTab from '../containers/WalletTemplatesTabContainer'
import WalletTokensTab from '../containers/WalletTokensTabContainer'
// #endregion

/**
 * Wallet stack: starts from list of all wallets (WalletsList screen)
*/
const WalletScreensStack = createStackNavigator(
  {
    ConfirmSend,
    SelectToken,
    Send,
    TransactionDetails,
    Wallet,
    WalletOwnersTab,
    WalletsList,
    WalletTemplatesTab,
    WalletTokensTab
  },
  {
    initialRouteName: 'WalletsList'
  }
)

/**
 * Root Wallet stack
*/
const WalletStack = createDrawerNavigator(
  {
    WalletScreensStack
  },
  // $FlowExpectedError getCustomActionCreators does not exist yet in .flow
  {
    drawerPosition: 'left',
    contentComponent: (props) => <DrawerContainer {...props} />,
    getCustomActionCreators: (route, stateKey) => {
      return {
        toggleMainMenuWalletDrawer: () => DrawerActions.toggleDrawer({ key: stateKey })
      }
    },
    navigationOptions: {
      // header: null,
      headerTransparent: true
    }
  }
)

export default WalletStack
