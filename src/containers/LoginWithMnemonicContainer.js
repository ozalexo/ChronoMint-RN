/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import mnemonicProvider from '@chronobank/login/network/mnemonicProvider'
import { MNEMONIC_LENGTH } from '../utils/globals'
import LoginWithMnemonic from '../screens/LoginWithMnemonic'
import withLogin, { type TWithLoginProps } from '../components/withLogin'

export type TLoginWithMnemonicContainerProps = TWithLoginProps & {
  navigator: any,
}

type TLoginWithMnemonicContainerState = {
  mnemonicWords: Array<string>
}

const inputsList = Array(MNEMONIC_LENGTH).fill(1)

class LoginWithMnemonicContainer extends PureComponent<TLoginWithMnemonicContainerProps, TLoginWithMnemonicContainerState> {
  state = {
    mnemonicWords: []
  }

  handleEnterWord = (index: number) => (word: string): void => {
    const { mnemonicWords } = this.state

    mnemonicWords[index] = word.trim()

    if (/\s+$/.test(word)) {
      (index + 1 === MNEMONIC_LENGTH)
        ? this.handleSubmit()
        : this.inputs[index + 1].focus()
    }

    this.setState({ mnemonicWords })
  }

  handleSubmit = async (): Promise<void> => {
    const mnemonic = this.state.mnemonicWords.join(' ')

    if (!mnemonicProvider.validateMnemonic(mnemonic)) {
      this.props.addError('Incorrect mnemonic. Check it and try again')

      return
    }

    const { privateKey } = await this.props.onMnemonicLogin(mnemonic)

    this.props.navigator.push({
      screen: 'SetAccountPassword',
      title: 'Set Account Password',
      passProps: {
        privateKey
      }
    })
  }

  inputs: Array<any> = []

  refInput = (index: number) => (input: any) => this.inputs[index] = input

  render () {
    return (<LoginWithMnemonic
      inputsList={inputsList}
      onEnterWord={this.handleEnterWord}
      onSubmit={this.handleSubmit}
      refInput={this.refInput}
    />)
  }
}

export default withLogin(LoginWithMnemonicContainer)
