/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

// #region imports
import React from 'react'
import I18n from 'react-native-i18n'
import {
  createStackNavigator
} from 'react-navigation'
// #endregion

// #region screens' imports
import AccountImportMethodContainer from '../containers/AccountImportMethodContainer'
import AccountPasswordContainer from '../containers/AccountPasswordContainer'
import Add2FAWalletContainer from '../containers/Add2FAWalletContainer'
import AddAdvancedWalletContainer from '../containers/AddAdvancedWalletContainer'
import AddEthereumWalletContainer from '../containers/AddEthereumWalletContainer'
import AddMultiSigWalletContainer from '../containers/AddMultiSigWalletContainer'
import AddStandardWalletContainer from '../containers/AddStandardWalletContainer'
import AddTimeLockedWalletContainer from '../containers/AddTimeLockedWalletContainer'
import AddTokenToAdvancedWalletContainer from '../containers/AddTokenToAdvancedWalletContainer'
import AddWalletContainer from '../containers/AddWalletContainer'
import ConfirmMnemonic from '../containers/ConfirmMnemonicContainer'
import Download2FAAppContainer from '../containers/Download2FAAppContainer'
import EnterMnemonicContainer from '../containers/EnterMnemonicContainer'
import EnterPinContainer from '../containers/EnterPinContainer'
import EnterPrivateKeyContainer from '../containers/EnterPrivateKeyContainer'
import GenerateMnemonicContainer from '../containers/GenerateMnemonicContainer'
import SelectAccountContainer from '../containers/SelectAccountContainer'
import SelectNetworkContainer from '../containers/SelectNetworkContainer'
import SetAccountPasswordContainer from '../containers/SetAccountPasswordContainer'
import StartScreenContainer from '../containers/StartScreenContainer'
import WalletBackup from '../containers/WalletBackupContainer'
import { HL, HR } from '../screens/StartScreen'
// #endregion

/**
 * Authentication stack: all login-related screens and switching to Wallet stack.
*/
const LoginStack = createStackNavigator(
  {
    AccountPasswordContainer,
    Add2FAWalletContainer,
    AddAdvancedWalletContainer,
    AddEthereumWalletContainer,
    AddMultiSigWalletContainer,
    AddStandardWalletContainer,
    AddTimeLockedWalletContainer,
    AddTokenToAdvancedWalletContainer,
    AddWalletContainer,
    Download2FAAppContainer,
    EnterPinContainer,
    GenerateMnemonicContainer,
    SelectNetworkContainer,
    ConfirmMnemonic,
    WalletBackup,
    'AccountImportMethod': {
      navigationOptions: ({ navigation }) => ({
        title: 'Add an existing account'
      }),
      screen: AccountImportMethodContainer
    },
    'EnterMnemonic': {
      navigationOptions: ({ navigation }) => ({
        title: 'Enter mnemonic key'
      }),
      screen: EnterMnemonicContainer
    },
    'EnterPrivateKey': {
      navigationOptions: ({ navigation }) => ({
        title: 'Enter private key'
      }),
      screen: EnterPrivateKeyContainer
    },
    'GenerateMnemonic': {
      navigationOptions: ({ navigation }) => ({
        title:  I18n.t('GenerateMnemonic.title')
      }),
      screen: GenerateMnemonicContainer
    },
    'SetAccountPassword': {
      navigationOptions: ({ navigation }) => ({
        title: 'New password'
      }),
      screen: SetAccountPasswordContainer
    },
    'EnterPin': {
      navigationOptions: ({ navigation }) => ({
        title: 'Enter PIN'
      }),
      screen: EnterPinContainer
    },
    'StartScreen': {
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HL toggleDrawer={navigation.toggleMainMenuDrawer} />,
        headerRight: <HR toggleDrawer={navigation.toggleLanguageDrawer} />,
        headerLeftContainerStyle: { paddingLeft: 20 },
        headerRightContainerStyle: { paddingRight: 20 }
      }),
      screen: StartScreenContainer
    },
    'SelectAccountContainer': {
      navigationOptions: ({ navigation }) => ({
        title: 'My accounts',
        headerBackTitle: null
      }),
      screen: SelectAccountContainer
    }
  },
  {
    initialRouteName: 'StartScreen',
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTransparent: true,
      headerBackTitle: null,
      headerTintColor: 'white'
    })
  }
)

export default LoginStack
