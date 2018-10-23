/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

export default class TextButton extends React.Component<TextButtonProps, {}> {
  render () {
    const { label, onPress, style, ...restProps } = this.props

    return (
      <TouchableOpacity
        style={[
          styles.container,
          style
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

const styles: StyleSheet = StyleSheet.create({
  container: {
    padding: 20,
    alignSelf: 'center'
  },
  label: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 16
  }
})

type TextButtonProps = {
  label: string,
  style?: StyleObj,
  onPress?: (event: Event) => void
}
