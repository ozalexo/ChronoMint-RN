
/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Image, TouchableOpacity, Text } from 'react-native'
import styles from './CheckboxStyles'
import { checkbox_checked, checkbox } from '../../images'

const checkboxIcon = (isChecked) => {
  return isChecked
    ? checkbox_checked
    : checkbox
}

const Checkbox = ({ label, isDark, isChecked, onPress }) => (
  <TouchableOpacity
    style={styles.container}
    activeOpacity={1}
    onPress={onPress}
  >
    <Image
      source={checkboxIcon(isChecked)}
      style={styles.checkboxContainer}
    />
    <Text
      style={isDark ? styles.labelDark : styles.label}
    >
      {label}
    </Text>
  </TouchableOpacity>
)

Checkbox.propTypes = {
  label: PropTypes.string,
  isDark: PropTypes.bool,
  isChecked: PropTypes.bool,
  onPress: PropTypes.func,
}

export default Checkbox
