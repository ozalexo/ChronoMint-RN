/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import styles from './PrimaryButtonStyles'

export default class PrimaryButton extends React.Component {
  render () {
    const { style, label, upperCase = false, ...restProps } = this.props
    const buttonLabel = upperCase
      ? label && label.toUpperCase()
      : label
    return (
      <TouchableOpacity
        style={[
          styles.container,
          style,
        ]}
        {...restProps}
      >
        <Text style={styles.buttonTextLabel}>
          {
            buttonLabel
          }
        </Text>
      </TouchableOpacity>
    )
  }
}

PrimaryButton.propTypes = {
  label: PropTypes.string,
  upperCase: PropTypes.bool,
}
