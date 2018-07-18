/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import { Provider } from 'react-redux'
import './utils/i18n'
import './utils/shim'
import store, { injectReducer } from './redux/configureStore'
import {
  AuthStack,
  WalletStack,
} from './registerScreens'
import { createSwitchNavigator } from 'react-navigation'

// Listen for unhandled promise rejections
window.onunhandledrejection = function (promise, reason) {
  // eslint-disable-next-line no-console
  console.log('%c window.onunhandledrejection', 'background: #222; color: red', promise, reason)
}

// injectReducer(require('./redux/ducks'))
// require('./init')

export default createSwitchNavigator(
  {
    Login: AuthStack,
    Wallet: WalletStack
  },
  {
    initialRouteName: 'Login',
  }
);

// export default function startAppRoot (root: string): Promise<void> {
//   if (currentRoot === root) {
//     return
//   }

//   currentRoot = root

//   switch (root) {
//     case 'wallet': {
//       WalletStack()
//       break
//     }
//     case 'login':
//     default: {
//       AuthStack()
//     }
//   }
//   // switch (root) {
//   //   case 'wallet': return Navigation.startSingleScreenApp({
//   //     screen: {
//   //       screen: 'WalletsList',
//   //     },
//   //     appStyle: {
//   //       disabledBackGesture: true,
//   //       hideBackButtonTitle: true,
//   //       navBarBackgroundColor: '#614DBA',
//   //       navBarButtonColor: '#FFFFFF',
//   //       navBarTextColor: '#BDB2FF',
//   //       screenBackgroundColor: '#242045',
//   //       statusBarTextColorScheme: 'light',
//   //     },
//   //     drawer: {
//   //       left: {
//   //         screen: 'Drawer',
//   //       },
//   //       animationType: 'parallax',
//   //       disableOpenGesture: true,
//   //     },
//   //   })
//   //   case 'login':
//   //   default: return Navigation.startSingleScreenApp({
//   //     screen: {
//   //       screen: 'SetAccountPassword',
//   //       navigatorStyle: {
//   //         navBarHidden: true,
//   //       },
//   //     },
//   //     passProps: {
//   //       isCreatingNewWallet: true,
//   //     },
//   //     appStyle: {
//   //       disabledBackGesture: true,
//   //       drawUnderNavBar: true,
//   //       hideBackButtonTitle: true,
//   //       navBarButtonColor: '#FFFFFF',
//   //       navBarNoBorder: true,
//   //       navBarTextColor: '#BDB2FF',
//   //       navBarTextFontSize: 16,
//   //       navBarTranslucent: true,
//   //       navBarTransparent: true,
//   //       screenBackgroundColor: '#242045',
//   //       statusBarTextColorScheme: 'light',
//   //       topBarElevationShadowEnabled: false,
//   //     },
//   //     drawer: {
//   //       left: {
//   //         screen: 'SelectNetwork',
//   //       },
//   //       right: {
//   //         screen: 'SelectLanguage',
//   //       },
//   //       animationType: 'parallax',
//   //       disableOpenGesture: true,
//   //       style: {
//   //         drawerShadow: false,
//   //         leftDrawerWidth: 75,
//   //         rightDrawerWidth: 75,
//   //       },
//   //     },
//   //   })
//   // }
// }

// startAppRoot('login')
//   .then(() => {
//     injectReducer(require('./redux/ducks'))
//     require('./init')
//   })
