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
import LoginWithOptionsContainer from '../containers/LoginWithOptionsContainer'
import LoginFormContainer from '../containers/LoginFormContainer'
import Add2FAWalletContainer from '../containers/Add2FAWalletContainer'
import AddAdvancedWalletContainer from '../containers/AddAdvancedWalletContainer'
import AddEthereumWalletContainer from '../containers/AddEthereumWalletContainer'
import AddMultiSigWalletContainer from '../containers/AddMultiSigWalletContainer'
import AddStandardWalletContainer from '../containers/AddStandardWalletContainer'
import AddTimeLockedWalletContainer from '../containers/AddTimeLockedWalletContainer'
import AddTokenToAdvancedWalletContainer from '../containers/AddTokenToAdvancedWalletContainer'
import AddWalletContainer from '../containers/AddWalletContainer'
import ConfirmMnemonicContainer from '../containers/ConfirmMnemonicContainer'
import Download2FAAppContainer from '../containers/Download2FAAppContainer'
import LoginWithMnemonicContainer from '../containers/LoginWithMnemonicContainer'
import EnterPinContainer from '../containers/EnterPinContainer'
import EnterPrivateKeyContainer from '../containers/EnterPrivateKeyContainer'
import GenerateMnemonicContainer from '../containers/GenerateMnemonicContainer'
import SelectAccountContainer from '../containers/SelectAccountContainer'
import SelectNetworkContainer from '../containers/SelectNetworkContainer'
import CreateAccountContainer from '../containers/CreateAccountContainer'
import StartScreenContainer from '../containers/StartScreenContainer'
import WalletBackupContainer from '../containers/WalletBackupContainer'
import { HL, HR } from '../screens/StartScreen'
// #endregion

// Navigation.registerComponent('/login/confirm-mnemonic', () => screenLayout(LoginScreenLayout)(ConfirmMnemonic), store, Provider)
// Navigation.registerComponent('/login/create-account', () => screenLayout(LoginScreenLayout)(CreateAccount), store, Provider)
// Navigation.registerComponent('/login/import-methods', () => screenLayout(LoginScreenLayout)(LoginWithOpions), store, Provider)
// Navigation.registerComponent('/login/mnemonic-login', () => screenLayout(LoginScreenLayout)(LoginWithMnemonic), store, Provider)
// Navigation.registerComponent('/login/select-account', () => screenLayout(LoginScreenLayout)(SelectAccount), store, Provider)
// Navigation.registerComponent('/login/download-wallet', () => screenLayout(LoginScreenLayout)(GenerateWallet), store, Provider)
// Navigation.registerComponent('/login', () => screenLayout(LoginScreenLayout)(LoginForm), store, Provider)
// Navigation.registerComponent('Add2FAWallet', () => Add2FAWallet, store, Provider)
// Navigation.registerComponent('AddAdvancedWallet', () => AddAdvancedWallet, store, Provider)
// Navigation.registerComponent('AddEthereumWallet', () => AddEthereumWallet, store, Provider)
// Navigation.registerComponent('AddMultiSignatureWallet', () => AddMultiSigWallet, store, Provider)
// Navigation.registerComponent('AddStandardWallet', () => AddStandardWallet, store, Provider)
// Navigation.registerComponent('AddTimeLockedWallet', () => AddTimeLockedWallet, store, Provider)
// Navigation.registerComponent('AddTokenToAdvancedWallet', () => AddTokenToAdvancedWallet, store, Provider)
// Navigation.registerComponent('AddWallet', () => AddWallet, store, Provider)
// Navigation.registerComponent('Download2FAApp', () => Download2FAApp, store, Provider)
// Navigation.registerComponent('Drawer', () => Drawer, store, Provider)
// Navigation.registerComponent('EnterPin', () => screenLayout(LoginScreenLayout)(EnterPin), store, Provider)
// Navigation.registerComponent('EnterPrivateKey', () => screenLayout(LoginScreenLayout)(EnterPrivateKey), store, Provider)
// Navigation.registerComponent('GenerateMnemonic', () => screenLayout(LoginScreenLayout)(GenerateMnemonic), store, Provider)
// Navigation.registerComponent('SelectLanguage', () => SelectLanguage, store, Provider)
// Navigation.registerComponent('SelectNetwork', () => SelectNetwork, store, Provider)

/**
 * Authentication stack: all login-related screens and switching to Wallet stack.
*/
const LoginStack = createStackNavigator(
  {
    LoginFormContainer,
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
    '/login/confirm-mnemonic': {
      screen: (props) => {
        return getLayoutedScreen(ConfirmMnemonicContainer, { ...props })
      }
    },
    'WalletBackup': {
      screen: (props) => {
        return getLayoutedScreen(WalletBackupContainer, { ...props })
      }
    },
    'AccountImportMethod': {
      navigationOptions: ({ navigation }) => ({
        title: 'Add an existing account'
      }),
      screen: (props) => {
        return getLayoutedScreen(LoginWithOptionsContainer, { ...props })
      }
    },
    'EnterMnemonic': {
      navigationOptions: ({ navigation }) => ({
        title: 'Enter mnemonic key'
      }),
      screen: (props) => {
        return getLayoutedScreen(LoginWithMnemonicContainer, { ...props })
      }
    },
    'EnterPrivateKey': {
      navigationOptions: ({ navigation }) => ({
        title: 'Enter private key'
      }),
      screen: (props) => {
        return getLayoutedScreen(EnterPrivateKeyContainer, { ...props })
      }
    },
    'GenerateMnemonic': {
      navigationOptions: ({ navigation }) => ({
        title:  I18n.t('GenerateMnemonic.title')
      }),
      screen: (props) => {
        return getLayoutedScreen(GenerateMnemonicContainer, { ...props })
      }
    },
    'SetAccountPassword': {
      navigationOptions: ({ navigation }) => ({
        title: 'New password'
      }),
      screen: (props) => {
        return getLayoutedScreen(CreateAccountContainer, { ...props })
      }
    },
    'EnterPin': {
      navigationOptions: ({ navigation }) => ({
        title: 'Enter PIN'
      }),
      screen: (props) => {
        return getLayoutedScreen(EnterPinContainer, { ...props })
      }
    },
    'StartScreen': {
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HL toggleDrawer={navigation.toggleMainMenuDrawer} />,
        headerRight: <HR toggleDrawer={navigation.toggleLanguageDrawer} />,
        headerLeftContainerStyle: { paddingLeft: 20 },
        headerRightContainerStyle: { paddingRight: 20 }
      }),
      screen: (props) => {
        return getLayoutedScreen(StartScreenContainer, { ...props })
      }
    },
    'SelectAccountContainer': {
      navigationOptions: ({ navigation }) => ({
        title: 'My accounts',
        headerBackTitle: null
      }),
      screen: (props) => {
        return getLayoutedScreen(SelectAccountContainer, { ...props })
      }
    }
  },
  {
    initialRouteName: 'LoginFormContainer',
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTransparent: true,
      headerBackTitle: null,
      headerTintColor: 'white'
    })
  }
)

export default LoginStack
