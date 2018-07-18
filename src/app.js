/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React from 'react';
import './utils/i18n'
import './utils/shim'
// import { Provider, connect } from 'react-redux'
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
// import {
//   reduxifyNavigator,
//   createReactNavigationReduxMiddleware,
// } from 'react-navigation-redux-helpers';
import {
  AuthStack,
  // WalletStack,
} from './registerScreens'
import store, { injectReducer } from './redux/configureStore'

injectReducer(require('./redux/ducks'))
require('./init')

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStackExm = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStackExm = createStackNavigator({ SignIn: SignInScreen });

const AppNavigator =  createSwitchNavigator(
  {
    App: AppStackExm,
    Auth: AuthStackExm,
    Login: AuthStack
  },
  {
    initialRouteName: 'Login',
  }
);

export default AppNavigator

// const middleware = createReactNavigationReduxMiddleware(
//   'root',
//   state => state.nav
// );

// const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

// const mapStateToProps = state => ({
//   state: state.nav,
// });

// const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

// export default class App extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <AppNavigator />
//       </Provider>
//     );
//   }
// }

// // import { Provider } from 'react-redux'
// import './utils/i18n'
// import './utils/shim'
// // import store, { injectReducer } from './redux/configureStore'
// import {
//   AuthStack,
//   WalletStack,
// } from './registerScreens'
// import { createSwitchNavigator } from 'react-navigation'

// // injectReducer(require('./redux/ducks'))
// // require('./init')

// class SignInScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Please sign in',
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Sign in!" onPress={this._signInAsync} />
//       </View>
//     );
//   }

//   _signInAsync = async () => {
//     await AsyncStorage.setItem('userToken', 'abc');
//     this.props.navigation.navigate('App');
//   };
// }

// export default createSwitchNavigator(
//   {
//     Login: AuthStack,
//     // Wallet: WalletStack
//   },
//   {
//     initialRouteName: 'Login',
//   }
// );

// // export default function startAppRoot (root: string): Promise<void> {
// //   if (currentRoot === root) {
// //     return
// //   }

// //   currentRoot = root

// //   switch (root) {
// //     case 'wallet': {
// //       WalletStack()
// //       break
// //     }
// //     case 'login':
// //     default: {
// //       AuthStack()
// //     }
// //   }
// //   // switch (root) {
// //   //   case 'wallet': return Navigation.startSingleScreenApp({
// //   //     screen: {
// //   //       screen: 'WalletsList',
// //   //     },
// //   //     appStyle: {
// //   //       disabledBackGesture: true,
// //   //       hideBackButtonTitle: true,
// //   //       navBarBackgroundColor: '#614DBA',
// //   //       navBarButtonColor: '#FFFFFF',
// //   //       navBarTextColor: '#BDB2FF',
// //   //       screenBackgroundColor: '#242045',
// //   //       statusBarTextColorScheme: 'light',
// //   //     },
// //   //     drawer: {
// //   //       left: {
// //   //         screen: 'Drawer',
// //   //       },
// //   //       animationType: 'parallax',
// //   //       disableOpenGesture: true,
// //   //     },
// //   //   })
// //   //   case 'login':
// //   //   default: return Navigation.startSingleScreenApp({
// //   //     screen: {
// //   //       screen: 'SetAccountPassword',
// //   //       navigatorStyle: {
// //   //         navBarHidden: true,
// //   //       },
// //   //     },
// //   //     passProps: {
// //   //       isCreatingNewWallet: true,
// //   //     },
// //   //     appStyle: {
// //   //       disabledBackGesture: true,
// //   //       drawUnderNavBar: true,
// //   //       hideBackButtonTitle: true,
// //   //       navBarButtonColor: '#FFFFFF',
// //   //       navBarNoBorder: true,
// //   //       navBarTextColor: '#BDB2FF',
// //   //       navBarTextFontSize: 16,
// //   //       navBarTranslucent: true,
// //   //       navBarTransparent: true,
// //   //       screenBackgroundColor: '#242045',
// //   //       statusBarTextColorScheme: 'light',
// //   //       topBarElevationShadowEnabled: false,
// //   //     },
// //   //     drawer: {
// //   //       left: {
// //   //         screen: 'SelectNetwork',
// //   //       },
// //   //       right: {
// //   //         screen: 'SelectLanguage',
// //   //       },
// //   //       animationType: 'parallax',
// //   //       disableOpenGesture: true,
// //   //       style: {
// //   //         drawerShadow: false,
// //   //         leftDrawerWidth: 75,
// //   //         rightDrawerWidth: 75,
// //   //       },
// //   //     },
// //   //   })
// //   // }
// // }

// // startAppRoot('login')
// //   .then(() => {
// //     injectReducer(require('./redux/ducks'))
// //     require('./init')
// //   })
