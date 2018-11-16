/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { Component } from 'react'
import {
  Text,
  TextInput,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import colors from '../../common/colors'
import styles from './InputStyles'

export default class Input extends Component {
  refInput = (input) => this.input = input

  input = {}

  focus = () => this.input.focus()

  handleChange = (value) => {
    const {
      onChange = () => { },
      name,
    } = this.props
    onChange(name, value)
  }

  handleTouch = () => {
    const {
      onTouch = () => { },
      name
    } = this.props
    onTouch(name)
  }

  render () {
    const { error = '', style, ...restProps } = this.props
    const errorStyle = error
      ? styles.error
      : null

    return (
      <View style={[styles.inputWrapper, style]}>
        <TextInput
          {...restProps}
          style={[
            styles.input,
            errorStyle,
          ]}
          ref={this.refInput}
          placeholderTextColor={colors.dustygray}
          underlineColorAndroid={colors.transparent}
          keyboardAppearance='dark'
          onChangeText={this.handleChange}
          onBlur={this.handleTouch}
        />
        <View style={styles.errorContainer}>
          <Text
            style={styles.errorText}
            ellipsizeMode='tail'
            numberOfLines={1}
          >
            {
              error
            }
          </Text>
        </View>
      </View>
    )
  }
}

Input.propTypes = {
  error: PropTypes.string,
}
