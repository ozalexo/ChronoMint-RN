/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import { Image, TouchableOpacity, StyleSheet, Text } from 'react-native'
import colors from '../utils/colors'

type Props = {
  label: string,
  isDark?: boolean,
  isChecked?: boolean,
  onPress?: () => void
}

const checkboxIcon = (isChecked) => {
  return isChecked
    ? require('../images/checkbox-checked.png')
    : require('../images/checkbox.png')
}

const Checkbox = ({ label, isDark, isChecked, onPress }: Props) => (
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

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    color: colors.foreground
  },
  labelDark: {
    color: colors.backgroundLight
  },
  checkboxContainer: {
    marginRight: 8
  }
})

export default Checkbox
