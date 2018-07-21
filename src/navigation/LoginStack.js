/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

// #region imports
import React from 'react'
import {
  // createDrawerNavigator,
  createStackNavigator,
  // DrawerActions
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
import ConfirmMnemonicContainer from '../containers/ConfirmMnemonicContainer'
import Download2FAAppContainer from '../containers/Download2FAAppContainer'
import EnterMnemonicContainer from '../containers/EnterMnemonicContainer'
import EnterPinContainer from '../containers/EnterPinContainer'
import EnterPrivateKeyContainer from '../containers/EnterPrivateKeyContainer'
import GenerateMnemonicContainer from '../containers/GenerateMnemonicContainer'
import SelectAccountContainer from '../containers/SelectAccountContainer'
// import SelectLanguageContainer from '../containers/SelectLanguageContainer'
import SelectNetworkContainer from '../containers/SelectNetworkContainer'
import SetAccountPasswordContainer from '../containers/SetAccountPasswordContainer'
import { HL, HR } from '../screens/SetAccountPassword'
import WalletBackupContainer from '../containers/WalletBackupContainer'
// #endregion

// #region MainMenu Drawer
// import DrawerContainer from '../containers/DrawerContainer'
// #endregion

// #region additional imports
import LoginScreenLayout from '../components/LoginScreenLayout'
import screenLayout from '../utils/screenLayout'
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

// #region Login-only utils
const getLayoutedScreen = (component, extraProps) => {
  const LayoutedScreen = screenLayout(LoginScreenLayout)(component)
  const componentProps = {...component.props, ...extraProps}
  return <LayoutedScreen {...componentProps} />
}
// #endregion

/**
 * Authentication stack: all login-related screens and switching to Wallet stack.
*/
const LoginStack = createStackNavigator(
  {
    AccountImportMethodContainer,
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
    EnterMnemonicContainer,
    EnterPinContainer,
    EnterPrivateKeyContainer,
    GenerateMnemonicContainer,
    SelectNetworkContainer,
    WalletBackupContainer,
    '/login/confirm-mnemonic': {
      screen: (props) => {
        return getLayoutedScreen(ConfirmMnemonicContainer, { ...props })
      }
    },
    SetAccountPasswordContainer: {
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HL toggleDrawer={navigation.toggleMainMenuDrawer} />,
        headerRight: <HR toggleDrawer={navigation.toggleLanguageDrawer} />,
        headerLeftContainerStyle: { paddingLeft: 20 },
        headerRightContainerStyle: { paddingRight: 20 }
      }),
      screen: (props) => {
        return getLayoutedScreen(SetAccountPasswordContainer, { ...props, isCreatingNewWallet: true })
      }
    },
    SelectAccountContainer: {
      navigationOptions: () => ({
        // title: 'Screen2',
        // headerTransparent: true
      }),
      screen: (props) => {
        return getLayoutedScreen(SelectAccountContainer, { ...props })
      }
    }
  },
  {
    initialRouteName: 'SetAccountPasswordContainer',
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTransparent: true,
      headerTintColor: 'white'
    })
    // navigationOptions: () => ({
    //   headerMode: 'screen',
    //   // headerTransparent: true
    // })
  }
)

// /**
//  * MainMenu (left drawer)
// */
// const MainMenuDrawer = createDrawerNavigator(
//   {
//     AuthStack
//   },
//   // $FlowExpectedError getCustomActionCreators does not exist yet in .flow
//   {
//     drawerPosition: 'left',
//     contentComponent: (props) => <DrawerContainer {...props} />,
//     getCustomActionCreators: (route, stateKey) => {
//       return {
//         toggleMainMenuDrawer: () => {
//           console.log('### MAIN DRAWER', route, stateKey)
//           DrawerActions.toggleDrawer({ key: stateKey })
//         }
//       }
//     },
//     navigationOptions: () => ({
//       headerTransparent: true
//     })
//   }
// )

// /**
//  * Root Login stack
// */
// const LoginStack = createDrawerNavigator(
//   {
//     MainMenuDrawer
//   },
//   // $FlowExpectedError getCustomActionCreators does not exist yet in .flow
//   {
//     drawerPosition: 'right',
//     // drawerWidth: Dimensions.get('window').width,
//     contentComponent: (props) => <SelectLanguageContainer {...props} />,
//     getCustomActionCreators: (route, stateKey) => {
//       return {
//         toggleLanguageDrawer: () => {
//           console.log('### LANG DRAWER')
//           DrawerActions.toggleDrawer({ key: stateKey })
//         }
//       }
//     },
//     navigationOptions: {
//       headerTransparent: true
//     }
//   }
// )

export default LoginStack
