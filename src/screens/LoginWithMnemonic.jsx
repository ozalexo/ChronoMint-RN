/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'

export type TLoginWithMnemonicProps = {
  inputsList: Array<any>,
  onEnterWord: (wordIndex: number) => (word: string) => void,
  onSubmit: (mnemonic: string) => () => void,
  refInput: (inputIndex: number) => (component: any) => void,
}

type TLoginWithMnemonicState = {
  mnemonic: string
}

export default class LoginWithMnemonic extends PureComponent<TLoginWithMnemonicProps, TLoginWithMnemonicState> {
  state = {
    mnemonic: ""
  }

  handleEnterMnemonic = (mnemonic) => {
    this.setState({ mnemonic })
  }

  render () {
    const { inputsList, onSubmit } = this.props

    return (
      <View style={styles.screenView}>
        <Input
          multiline
          onChangeText={this.handleEnterMnemonic}
          value={this.state.mnemonic}
          style={styles.input}
        />
        <PrimaryButton
          label='Log in'
          onPress={onSubmit(this.state.mnemonic)}
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
