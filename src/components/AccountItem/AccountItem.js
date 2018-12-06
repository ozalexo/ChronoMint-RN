/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Image, TouchableOpacity, Text } from 'react-native'
import {
  profile_circle_small,
  chevron_right,
} from '../../images'
import styles from './AccountItemStyles'

const AccountItem = ({ address, onPress = () => { } }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.item}
  >
    <Image
      source={profile_circle_small}
      style={styles.itemImage}
    />
    <Text style={styles.address}>
      {
        address
      }
    </Text>
    <Image
      source={chevron_right}
      style={styles.chevron}
    />
  </TouchableOpacity>
)

AccountItem.propTypes = {
  address: PropTypes.string,
  onPress: PropTypes.func.isRequired,
}

export default AccountItem
