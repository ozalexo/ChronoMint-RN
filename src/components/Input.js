/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import colors from '../utils/colors'

export type TInputProps = {
  style?: any,
}

export default class Input extends PureComponent<TInputProps> {
  refInput = (input: any) => this.input = input

  input = {}

  focus = () => this.input.focus()

  render () {
    const { style, ...restProps } = this.props

    return (
      <TextInput
        {...restProps}
        style={[
          styles.input,
          style
        ]}
        ref={this.refInput}
        placeholderTextColor='#9997b2'
        underlineColorAndroid={colors.transparent}
        keyboardAppearance='dark'
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#9997B2',
    paddingBottom: 15,
    color: '#9997B2',
    fontSize: 16
  }
})
