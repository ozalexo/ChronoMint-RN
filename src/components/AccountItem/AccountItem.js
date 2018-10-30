/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Image,
  Text,
  TouchableOpacity
} from 'react-native'
import styles from './AccountItemStyles'

export default class AccountItem extends PureComponent {
  render () {
    const {
      address,
      onPress,
    } = this.props

    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.item}
      >
        <Image
          source={require('../../images/profile-circle-small.png')}
          style={styles.itemImage}
        />
        <Text style={styles.address}>
          {
            address
          }
        </Text>
        <Image
          source={require('../../images/chevron-right.png')}
          style={styles.chevron}
        />
      </TouchableOpacity>
    )
  }
}
