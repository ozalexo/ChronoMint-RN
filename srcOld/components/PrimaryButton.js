/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

export default class PrimaryButton extends React.Component {
  render () {
    const { style, label, ...restProps } = this.props

    return (
      <TouchableOpacity
        style={[
          styles.container,
          style
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#614DBA',
    paddingVertical: 14,
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 20
  }
})
