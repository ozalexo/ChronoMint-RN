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
    const { style, label, ...restProps } = this.props

    return (
      <TouchableOpacity
        style={[
          styles.container,
          style,
        ]}
        {...restProps}
      >
        <Text style={styles.label}>
          {label}
        </Text>
      </TouchableOpacity>
    )
  }
}

PrimaryButton.propTypes = {
  label: PropTypes.string,
};
