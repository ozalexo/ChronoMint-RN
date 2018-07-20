/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React from 'react'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import './utils/i18n'
import './utils/shim'
import * as ducks from './redux/ducks'
import AppNavigator from './navigation/AppNavigator'
import startPreparations from './init'
import store, { injectReducer } from './redux/configureStore'

class App extends React.Component<{}, {}> {
  constructor (props: any) {
    super(props)
    // Prepare everything before hiding SplashScreen
    injectReducer(ducks)
    startPreparations()
  }

  componentDidMount () {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide()
  }

  render () {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}

export default App
