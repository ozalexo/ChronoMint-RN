/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  KeyboardAvoidingView,
  Image,
  View,
  ScrollView,
} from 'react-native'
import styles from './LoginScreenLayoutStyles'
import { background } from '../../images'

export default class LoginScreenLayout extends React.Component {
  static navigatorStyle = {
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 16,
    topBarElevationShadowEnabled: false,
    navBarTransparent: true,
    navBarTranslucent: true,
    drawUnderNavBar: true,
  }

  render () {
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.keyboardView}
        contentContainerStyle={styles.keyboardView}
      >
        <ScrollView style={styles.screenView}>
          <Image
            source={background}
            style={[
              styles.backgroundImage,
              this.props.screenOptions.screen === 'SetAccountPassword' ? styles.backgroundImageFull : {}
            ]}
          />
          <View style={styles.screenContent}>
            {this.props.children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
