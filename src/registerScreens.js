/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

//#region common imports
import { Navigation } from 'react-native-navigation'
import { type Provider as TProvider } from 'react-redux'
import { type Store as TStore } from 'redux'
import { type TState } from './redux/ducks'
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
import LoginWithMnemonic from './containers/LoginWithMnemonicContainer'
import EnterPin from './containers/EnterPinContainer'
import EnterPrivateKey from './containers/EnterPrivateKeyContainer'
import GenerateMnemonic from './containers/GenerateMnemonicContainer'
import LoginScreenLayout from './components/LoginScreenLayout'
import screenLayout from './utils/screenLayout'
import SelectAccount from './containers/SelectAccountContainer'
import SelectLanguage from './containers/SelectLanguageContainer'
import SelectNetwork from './containers/SelectNetworkContainer'
import SetAccountPassword from './containers/SetAccountPasswordContainer'
import WalletBackup from './containers/WalletBackupContainer'
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
//#endregion

export default function registerScreens (store: TStore<TState, { type: string }>, Provider: TProvider<TState, { type: string }>) {

  //#region Login screens
  Navigation.registerComponent('AccountImportMethod', () => screenLayout(LoginScreenLayout)(AccountImportMethod), store, Provider)
  Navigation.registerComponent('AccountPassword', () => screenLayout(LoginScreenLayout)(AccountPassword), store, Provider)
  Navigation.registerComponent('Add2FAWallet', () => Add2FAWallet, store, Provider)
  Navigation.registerComponent('AddAdvancedWallet', () => AddAdvancedWallet, store, Provider)
  Navigation.registerComponent('AddEthereumWallet', () => AddEthereumWallet, store, Provider)
  Navigation.registerComponent('AddMultiSignatureWallet', () => AddMultiSigWallet, store, Provider)
  Navigation.registerComponent('AddStandardWallet', () => AddStandardWallet, store, Provider)
  Navigation.registerComponent('AddTimeLockedWallet', () => AddTimeLockedWallet, store, Provider)
  Navigation.registerComponent('AddTokenToAdvancedWallet', () => AddTokenToAdvancedWallet, store, Provider)
  Navigation.registerComponent('AddWallet', () => AddWallet, store, Provider)
  Navigation.registerComponent('ConfirmMnemonic', () => screenLayout(LoginScreenLayout)(ConfirmMnemonic), store, Provider)
  Navigation.registerComponent('Download2FAApp', () => Download2FAApp, store, Provider)
  Navigation.registerComponent('Drawer', () => Drawer, store, Provider)
  Navigation.registerComponent('LoginWithMnemonic', () => screenLayout(LoginScreenLayout)(LoginWithMnemonic), store, Provider)
  Navigation.registerComponent('EnterPin', () => screenLayout(LoginScreenLayout)(EnterPin), store, Provider)
  Navigation.registerComponent('EnterPrivateKey', () => screenLayout(LoginScreenLayout)(EnterPrivateKey), store, Provider)
  Navigation.registerComponent('GenerateMnemonic', () => screenLayout(LoginScreenLayout)(GenerateMnemonic), store, Provider)
  Navigation.registerComponent('SelectAccount', () => screenLayout(LoginScreenLayout)(SelectAccount), store, Provider)
  Navigation.registerComponent('SelectLanguage', () => SelectLanguage, store, Provider)
  Navigation.registerComponent('SelectNetwork', () => SelectNetwork, store, Provider)
  Navigation.registerComponent('SetAccountPassword', () => screenLayout(LoginScreenLayout)(SetAccountPassword), store, Provider)
  //#endregion

  //#region Wallet screens
  Navigation.registerComponent('ConfirmSend', () => ConfirmSend, store, Provider)
  Navigation.registerComponent('SelectToken', () => SelectToken, store, Provider)
  Navigation.registerComponent('Send', () => Send, store, Provider)
  Navigation.registerComponent('TransactionDetails', () => TransactionDetails, store, Provider)
  Navigation.registerComponent('Wallet', () => Wallet, store, Provider)
  Navigation.registerComponent('WalletBackup', () => screenLayout(LoginScreenLayout)(WalletBackup), store, Provider)
  Navigation.registerComponent('WalletOwnersTab', () => WalletOwnersTab, store, Provider)
  Navigation.registerComponent('WalletsList', () => WalletsList, store, Provider)
  Navigation.registerComponent('WalletTemplatesTab', () => WalletTemplatesTab, store, Provider)
  Navigation.registerComponent('WalletTokensTab', () => WalletTokensTab, store, Provider)
  //#endregion

}
