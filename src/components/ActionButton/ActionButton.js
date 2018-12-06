/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './ActionButtonStyles'

const ActionButton = ({ title, image, onPress = () => { } }) => (
  <TouchableOpacity
    style={styles.actionButton}
    onPress={onPress}
  >
    <Image
      source={image}
      style={styles.actionIcon}
    />
    <Text style={styles.actionTitle}>
      {title}
    </Text>
  </TouchableOpacity>
)

ActionButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
}

export default ActionButton
