/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { Component } from 'react'
import { TextInput } from 'react-native'
import colors from '../../common/colors'
import styles from './InputStyles'

export default class Input extends Component {
  refInput = (input) => this.input = input

  input = {}

  focus = () => this.input.focus()

  render () {
    const { style, ...restProps } = this.props

    return (
      <TextInput
        {...restProps}
        style={[
          styles.input,
          style,
        ]}
        ref={this.refInput}
        placeholderTextColor='#9997b2'
        underlineColorAndroid={colors.transparent}
        keyboardAppearance='dark'
      />
    )
  }
}
