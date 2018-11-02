/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, {Component} from 'react'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import {
  StatusBar,
} from 'react-native'
import DefaultImageBackground from './common/ImageBackground'
import RootNavigator from './navigation/RootNavigator'
import store from './store/createStore'

export default class App extends Component {
  componentDidMount () {
    SplashScreen.hide()
  }

  render () {
    return (
      <Provider store={store}>
        <DefaultImageBackground>
          <StatusBar barStyle='light-content' />
          <RootNavigator />
        </DefaultImageBackground>
      </Provider>
    )
  }
}
