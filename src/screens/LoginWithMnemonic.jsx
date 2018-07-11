/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Field } from 'redux-form/immutable'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'

export type TLoginWithMnemonicProps = {
  inputsList: Array<any>,
  onEnterWord: (wordIndex: number) => (word: string) => void,
  handleSubmit: () => void
}

export default class LoginWithMnemonic extends PureComponent<TLoginWithMnemonicProps> {
  render () {
    const { inputsList, handleSubmit } = this.props

    return (
      <View style={styles.screenView}>
        <Field
          multiline
          style={styles.input}
          name={'mnemonic'}
          component={Input}
        />
        <PrimaryButton
          label='Log in'
          onPress={handleSubmit}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 20,
  },
  screenView: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 60,
  },
})
