/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Text,
  TouchableOpacity,
} from 'react-native'
import styles from './HeaderLanguageSelectStyles'

export default class  extends PureComponent {
  render () {
    console.log('HeaderLanguageSelect:')
    console.log(this.props)
    return (
      <TouchableOpacity
        onPress={this.props.toggleDrawer}
        style={styles.topBarButton}
      >
        <Text style={styles.topBarButtonLabel}>
          EN-US
        </Text>
      </TouchableOpacity>
    )
  }
}
