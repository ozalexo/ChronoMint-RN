/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

//#region common imports
import {
  createDrawerNavigator,
  createStackNavigator,
  DrawerActions
} from 'react-navigation'
import { Dimensions } from 'react-native'
import { Provider, connect } from 'react-redux'
import React from 'react'
//#endregion

// //#region Login imports
// import AccountImportMethod from './containers/AccountImportMethodContainer'
// // import AccountPassword from './containers/AccountPasswordContainer'
// import Add2FAWallet from './containers/Add2FAWalletContainer'
// import AddAdvancedWallet from './containers/AddAdvancedWalletContainer'
// import AddEthereumWallet from './containers/AddEthereumWalletContainer'
// import AddMultiSigWallet from './containers/AddMultiSigWalletContainer'
// import AddStandardWallet from './containers/AddStandardWalletContainer'
// import AddTimeLockedWallet from './containers/AddTimeLockedWalletContainer'
// import AddTokenToAdvancedWallet from './containers/AddTokenToAdvancedWalletContainer'
// import AddWallet from './containers/AddWalletContainer'
// import ConfirmMnemonic from './containers/ConfirmMnemonicContainer'
// import Download2FAApp from './containers/Download2FAAppContainer'
import DrawerContainer from './containers/DrawerContainer'
// import EnterMnemonic from './containers/EnterMnemonicContainer'
// import EnterPin from './containers/EnterPinContainer'
// import EnterPrivateKey from './containers/EnterPrivateKeyContainer'
// import GenerateMnemonic from './containers/GenerateMnemonicContainer'
import SelectAccountContainer from './containers/SelectAccountContainer'
import SelectLanguageContainer from './containers/SelectLanguageContainer'
// import SelectNetwork from './containers/SelectNetworkContainer'
import SetAccountPasswordContainer from './containers/SetAccountPasswordContainer'
// import WalletBackup from './containers/WalletBackupContainer'

import screenLayout from './utils/screenLayout'
import LoginScreenLayout from './components/LoginScreenLayout'
// //#endregion

// //#region Wallet imports
// import ConfirmSend from './containers/ConfirmSendContainer'
// import SelectToken from './screens/SelectToken'
// import Send from './containers/SendContainer'
// import TransactionDetails from './screens/TransactionDetails'
// import Wallet from './containers/WalletContainer'
// import WalletOwnersTab from './containers/WalletOwnersTabContainer'
import WalletsList from './containers/WalletsListContainer'
// import WalletTemplatesTab from './containers/WalletTemplatesTabContainer'
// import WalletTokensTab from './containers/WalletTokensTabContainer'
//#endregion

// const MainMenuLeftDrawer = createDrawerNavigator(
//   {
//     Inbox: {
//       screen: WalletTokensTab,
//     },
//     Drafts: {
//       screen: WalletTemplatesTab,
//     },
//   },
//   {
//     initialRouteName: 'Drafts',
//     contentOptions: {
//       activeTintColor: '#e91e63',
//     },
//   }
// )
// const SelectLanguageRightDrawer = createDrawerNavigator(
//   {
//     MainMenuLeftDrawer: {
//       screen: MainMenuLeftDrawer,
//     },
//   },
//   {
//     initialRouteName: 'MainMenuLeftDrawer',
//     navigationOptions: {},
//     drawerPosition: 'right',
//     drawerWidth: Dimensions.get('window').width,
//     contentComponent: SelectLanguage,
//     drawerOpenRoute: 'RightSideMenu',
//     drawerCloseRoute: 'RightSideMenuClose',
//     drawerToggleRoute: 'RightSideMenuToggle',
//   }
// )

const AuthStack = createStackNavigator(
  {
    SetAccountPasswordContainer: {
      navigationOptions: () => ({
        header: null
      }),
      screen: (props) => {
        const LayoutedScreen = screenLayout(LoginScreenLayout)(SetAccountPasswordContainer)
        return (
          <LayoutedScreen {...props} isCreatingNewWallet={true} />
        )
      }
    },
    SelectAccountContainer: {
      navigationOptions: () => ({
        title: 'Screen',
        headerBackTitle: 'BackBu',
        headerTransparent: true,
      }),
      screen: () => {
        const LayoutedScreen = screenLayout(LoginScreenLayout)(SelectAccountContainer)
        return (
          <LayoutedScreen />
        )
      }
    }
  },
  {
    initialRouteName: 'SetAccountPasswordContainer',
    // headerMode: 'screen'
  }
)

const WalletStack = () => createDrawerNavigator(
  {
    WalletsList
  },
  {
    initialRouteName: 'WalletsList',
  }
)

const MainMenuDrawer = createDrawerNavigator(
  {
    AuthStack
  },
  {
    getCustomActionCreators: (route, stateKey) => {
      // console.log('inner: ' + stateKey);
      return {
        toggleMainMenuDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
      };
    },
    drawerPosition: 'left',
    contentComponent: (props) => (<DrawerContainer {...props} />)
  }
)

const LanguageDrawer = createDrawerNavigator(
  {
    MainMenuDrawer
  },
  {
    getCustomActionCreators: (route, stateKey) => {
      return {
        toggleLanguageDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
      };
    },
    drawerPosition: 'right',
    // drawerWidth: Dimensions.get('window').width,
    contentComponent: (props) => <SelectLanguageContainer {...props} />
  }
)

export {
  AuthStack,
  LanguageDrawer,
  WalletStack
}
