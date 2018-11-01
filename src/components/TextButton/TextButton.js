/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import styles from './TextButtonStyles'

export default class TextButton extends React.Component {
  render () {
    const { label, onPress, style, ...restProps } = this.props

    return (
      <TouchableOpacity
        style={[
          styles.container,
          style,
        ]}
        onPress={onPress}
        {...restProps}
      >
        <Text style={styles.label}>
          {label}
        </Text>
      </TouchableOpacity>
    )
  }
}

TextButton.propTypes ={
  onPress: PropTypes.func,
  label: PropTypes.string,
};