/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Text,
  TouchableOpacity,
  Image,
} from 'react-native'
import styles from './HeaderNetworkSelectStyles'
import { ios_gear_outline } from '../../../../images'

export default class HeaderNetworkSelect extends PureComponent {
  render () {
    return (
      <TouchableOpacity
        onPress={this.props.toggleDrawer}
        style={styles.topBarButton}
      >
        <Image
          source={ios_gear_outline}
          style={styles.topBarButtonImage}
        />
        <Text style={styles.topBarButtonLabel}>
          Production
        </Text>
      </TouchableOpacity>
    )
  }
}
