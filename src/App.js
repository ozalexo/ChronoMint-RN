/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import SplashScreen from 'react-native-splash-screen'
import {
  StatusBar,
} from 'react-native'
import DefaultImageBackground from './common/ImageBackground'
import * as Initializers from './store/initializers'
import RootNavigator from './navigation/RootNavigator'
import configureStore from './store/configureStore'
import styles from './AppStyles'

const { store, persistor } = configureStore()

const initAfterRehydration = () => {
  // Initializers.initI18N(store)
  try {
    Initializers.initMarket(store)
    Initializers.initWeb3(store)
  } catch (error) {
    // TODO: Q: automatic switch to another available node? But what if user tried to connect to custom node?
    // eslint-disable-next-line no-console
    console.log('Error during App initialization:', error)
  }
}

export default class App extends Component {
  componentDidMount () {
    SplashScreen.hide()
  }

  render () {
    return (
      <Provider store={store}>
        <PersistGate
          loader={null}
          persistor={persistor}
          onBeforeLift={initAfterRehydration}
        >
          <SafeAreaView style={styles.safeArea}>
            <DefaultImageBackground>
              <StatusBar barStyle='light-content' />
              <RootNavigator />
            </DefaultImageBackground>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    )
  }
}
