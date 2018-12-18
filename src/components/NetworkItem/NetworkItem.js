/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './NetworkItemStyles'
import { chevron_right } from '../../images'

export default class NetworkItem extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    onPress: PropTypes.func,
    status: PropTypes.bool,
  }
  render () {
    const {
      name,
      onPress,
      status,
    } = this.props

    const onlineStatusStyle = [
      styles.networkStatus,
      status
        ? styles.networkStatusOnline
        : styles.networkStatusOffline,
    ]

    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.item}
      >
        <View style={onlineStatusStyle} />
        <Text style={styles.itemName}>
          {name}
        </Text>
        <Image source={chevron_right} />
      </TouchableOpacity>
    )
  }
}
