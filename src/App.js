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
import AppNavigator from './navigation/AppNavigator'
import startPreparations from './init'
import store from './redux/configureStore'

class ChronoMintApp extends React.Component<{}, {}> {
  constructor (props: any) {
    super(props)
    // Prepare everything before hiding SplashScreen
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

export default ChronoMintApp
