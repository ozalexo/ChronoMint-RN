/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

//#region common imports
import { createDrawerNavigator } from 'react-navigation'
import { Dimensions } from 'react-native'
import React from 'react'
//#endregion

//#region Login imports
import AccountImportMethod from './containers/AccountImportMethodContainer'
import AccountPassword from './containers/AccountPasswordContainer'
import Add2FAWallet from './containers/Add2FAWalletContainer'
import AddAdvancedWallet from './containers/AddAdvancedWalletContainer'
import AddEthereumWallet from './containers/AddEthereumWalletContainer'
import AddMultiSigWallet from './containers/AddMultiSigWalletContainer'
import AddStandardWallet from './containers/AddStandardWalletContainer'
import AddTimeLockedWallet from './containers/AddTimeLockedWalletContainer'
import AddTokenToAdvancedWallet from './containers/AddTokenToAdvancedWalletContainer'
import AddWallet from './containers/AddWalletContainer'
import ConfirmMnemonic from './containers/ConfirmMnemonicContainer'
import Download2FAApp from './containers/Download2FAAppContainer'
import Drawer from './containers/DrawerContainer'
import EnterMnemonic from './containers/EnterMnemonicContainer'
import EnterPin from './containers/EnterPinContainer'
import EnterPrivateKey from './containers/EnterPrivateKeyContainer'
import GenerateMnemonic from './containers/GenerateMnemonicContainer'
import SelectAccount from './containers/SelectAccountContainer'
import SelectLanguage from './containers/SelectLanguageContainer'
import SelectNetwork from './containers/SelectNetworkContainer'
import SetAccountPassword from './containers/SetAccountPasswordContainer'
import WalletBackup from './containers/WalletBackupContainer'

import screenLayout from './utils/screenLayout'
import LoginScreenLayout from './components/LoginScreenLayout'
//#endregion

//#region Wallet imports
import ConfirmSend from './containers/ConfirmSendContainer'
import SelectToken from './screens/SelectToken'
import Send from './containers/SendContainer'
import TransactionDetails from './screens/TransactionDetails'
import Wallet from './containers/WalletContainer'
import WalletOwnersTab from './containers/WalletOwnersTabContainer'
import WalletsList from './containers/WalletsListContainer'
import WalletTemplatesTab from './containers/WalletTemplatesTabContainer'
import WalletTokensTab from './containers/WalletTokensTabContainer'
import TestScreen from './screens/TestScreen'
//#endregion

const MainMenuLeftDrawer = createDrawerNavigator(
  {
    Inbox: {
      screen: WalletTokensTab,
    },
    Drafts: {
      screen: WalletTemplatesTab,
    },
  },
  {
    initialRouteName: 'Drafts',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
)
const SelectLanguageRightDrawer = createDrawerNavigator(
  {
    MainMenuLeftDrawer: {
      screen: MainMenuLeftDrawer,
    },
  },
  {
    initialRouteName: 'MainMenuLeftDrawer',
    navigationOptions: {},
    drawerPosition: 'right',
    drawerWidth: Dimensions.get('window').width,
    contentComponent: SelectLanguage,
    drawerOpenRoute: 'RightSideMenu',
    drawerCloseRoute: 'RightSideMenuClose',
    drawerToggleRoute: 'RightSideMenuToggle',
  }
)

const AuthStack = () => createDrawerNavigator(
  {
    AccountImportMethod: {
      screen: () => screenLayout(LoginScreenLayout)(AccountImportMethod)
    },
    AccountPassword: {
      screen:  () => screenLayout(LoginScreenLayout)(AccountPassword)
    },
    Add2FAWallet: {
      screen: Add2FAWallet
    },
    AddAdvancedWallet: {
      screen: AddAdvancedWallet
    },
    AddEthereumWallet: {
      screen: AddEthereumWallet
    },
    AddMultiSignatureWallet: {
      screen: AddMultiSigWallet
    },
    AddStandardWallet: {
      screen: AddStandardWallet
    },
    AddTimeLockedWallet: {
      screen: AddTimeLockedWallet
    },
    AddTokenToAdvancedWallet: {
      screen: AddTokenToAdvancedWallet
    },
    AddWallet: {
      screen: AddWallet
    },
    ConfirmMnemonic: {
      screen: () => screenLayout(LoginScreenLayout)(ConfirmMnemonic)
    },
    Download2FAApp: {
      screen: Download2FAApp
    },
    Drawer: {
      screen: Drawer
    },
    // LoginWithMnemonic: {
    //   screen: screenLayout(LoginScreenLayout)(LoginWithMnemonic)
    // },
    EnterPin: {
      screen: () => screenLayout(LoginScreenLayout)(EnterPin)
    },
    EnterPrivateKey: {
      screen: () => screenLayout(LoginScreenLayout)(EnterPrivateKey)
    },
    GenerateMnemonic: {
      screen: () => screenLayout(LoginScreenLayout)(GenerateMnemonic)
    },
    SelectAccount: {
      screen: () => screenLayout(LoginScreenLayout)(SelectAccount)
    },
    SelectNetwork: {
      screen: SelectNetwork
    },
    SetAccountPassword: TestScreen,
    WalletBackup: {
      screen: () => screenLayout(LoginScreenLayout)(WalletBackup)
    }
  },
  {
    initialRouteName: 'SetAccountPassword',
  }
)

const WalletStack = () => createDrawerNavigator(
  {
    ConfirmSend: {
      screen: ConfirmSend
    },
    SelectToken: {
      screen: SelectToken
    },
    Send: {
      screen: Send
    },
    TransactionDetails: {
      screen: TransactionDetails
    },
    Wallet: {
      screen: Wallet
    },
    WalletOwnersTab: {
      screen: WalletOwnersTab
    },
    WalletsList: {
      screen: WalletsList
    },
    WalletTemplatesTab: {
      screen: WalletTemplatesTab
    },
    WalletTokensTab: {
      screen: WalletTokensTab
    }
  },
  {
    initialRouteName: 'WalletsList',
  })

export {
  AuthStack,
  WalletStack
}
