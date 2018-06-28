/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  View,
  ScrollView
} from 'react-native'

export default class LoginScreenLayout extends React.Component {
  static navigatorStyle = {
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 16,
    topBarElevationShadowEnabled: false,
    navBarTransparent: true,
    navBarTranslucent: true,
    drawUnderNavBar: true
  }

  render () {
    return (
      <KeyboardAvoidingView
        behavior='position'
        style={styles.keyboardView}
        contentContainerStyle={styles.keyboardView}
      >
        <ScrollView style={styles.screenView}>
          <Image
            source={require('../images/background.jpg')}
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

const styles = StyleSheet.create({
  keyboardView: {
    flexGrow: 1,
  },
  screenView: {
    backgroundColor: '#242045'
  },
  screenContent: {
    paddingTop: 64,
    paddingBottom: 30
  },
  backgroundImage: {
    resizeMode: 'contain',
    position: 'absolute',
    top: -140
  },
  backgroundImageFull: {
    top: 0
  }
})
