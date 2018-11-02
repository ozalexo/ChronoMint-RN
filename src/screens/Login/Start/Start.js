/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Text,
  View,
} from 'react-native'
import styles from './StartStyles'

export default class Start extends PureComponent {
  render () {
    return (
      <View style={styles.container}>
        <Text>
          Start screen
        </Text>
      </View>
    )
  }
}
