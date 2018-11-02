/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { SafeAreaView } from 'react-navigation'
import {
  Text,
} from 'react-native'
import styles from './DrawerLanguageStyles'

class DrawerLanguage extends PureComponent {
  render () {
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{
          top: 'always',
          horizontal: 'never',
        }}
      >
        <Text>
          Language stub
        </Text>
      </SafeAreaView>
    )
  }
}

export default DrawerLanguage
