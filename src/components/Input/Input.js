/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { Component } from 'react'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'
import colors from '../../common/colors'
import styles from './InputStyles'

export default class Input extends Component {
  refInput = (input) => this.input = input

  input = {}

  focus = () => this.input.focus()

  render () {
    const { error, style, ...restProps } = this.props
    let responseStyles = {}
    if (error === true) {
      responseStyles = styles.error
    } else if (error === false) {
      responseStyles = styles.success
    }
    return (
      <TextInput
        {...restProps}
        style={[
          styles.input,
          responseStyles,
          style,
        ]}
        ref={this.refInput}
        placeholderTextColor={colors.placeHolder}
        underlineColorAndroid={colors.transparent}
        keyboardAppearance='dark'
      />
    )
  }
}

Input.propTypes = {
  error: PropTypes.bool,
}
