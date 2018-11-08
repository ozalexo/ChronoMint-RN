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

  renderErrorText = () => (
    <Text
      style={styles.errorText}
      ellipsizeMode='tail'
      numberOfLines={1}
    >
      {
        this.props.error
      }
    </Text>
  )

  render () {
    const { error, style, ...restProps } = this.props
    const errorStyle = error
      ? styles.error
      : styles.success

    return (
      <View style={style}>
        <TextInput
          {...restProps}
          style={[
            styles.input,
            errorStyle,
          ]}
          ref={this.refInput}
          placeholderTextColor='#9997b2'
          underlineColorAndroid={colors.transparent}
          keyboardAppearance='dark'
        />
        {
          error
            ? this.renderErrorText()
            : null
        }
      </View>
    )
  }
}

Input.propTypes = {
  error: PropTypes.string,
}
