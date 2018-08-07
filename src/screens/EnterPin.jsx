/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { StyleSheet, View, TextInput, Platform } from 'react-native'
import LoginLayout from '../components/LoginLayout';

export type TEnterPinProps = {
  onChangePin: (pin: string) => void,
  pinDigitsTotalCount: number,
  pinDigitsFilledCount: number,
}

export default class EnterPin extends PureComponent<TEnterPinProps, {}> {
  renderPinDigit = (item: any, index: number) => {
    const isPinDigitActive = this.props.pinDigitsFilledCount > index

    return (<View
      style={[
        styles.pinDigit,
        isPinDigitActive ? styles.pinDigitActive : {},
      ]}
      key={index}
    />)
  }

  render () {
    const {
      pinDigitsTotalCount,
      onChangePin,
    } = this.props
    return (
      <LoginLayout>
        {
          Array(pinDigitsTotalCount).fill(1).map(this.renderPinDigit)
        }
        <TextInput
          autoFocus
          style={styles.input}
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          onChangeText={onChangePin}
          keyboardAppearance='dark'
        />
      </LoginLayout>
    )
  }
}

const styles = StyleSheet.create({
  pinDigit: {
    margin: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#A3A3CC',
  },
  pinDigitActive: {
    backgroundColor: 'white',
  },
  input: {
    display: 'none',
  },
})
