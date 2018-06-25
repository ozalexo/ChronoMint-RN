/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import mnemonicProvider from '@chronobank/login/network/mnemonicProvider'
import { MNEMONIC_LENGTH } from '../utils/globals'
import EnterMnemonic from '../screens/EnterMnemonic'
import withLogin, { type TWithLoginProps } from '../components/withLogin'

export type TEnterMnemonicContainerProps = TWithLoginProps & {
  navigator: any,
}

type TEnterMnemonicContainerState = {
  mnemonicWords: Array<string>
}

const inputsList = Array(MNEMONIC_LENGTH).fill(1)

class EnterMnemonicContainer extends PureComponent<TEnterMnemonicContainerProps, TEnterMnemonicContainerState> {
  state = {
    mnemonicWords: []
  }

  handleEnterWord = (index: number) => (word: string): void => {
    const { mnemonicWords } = this.state

    mnemonicWords[index] = word.trim()

    if (/\s+$/.test(word)) {
      (index + 1 === MNEMONIC_LENGTH)
        ? this.handleLogin()
        : this.inputs[index + 1].focus()
    }

    this.setState({ mnemonicWords })
  }

  handleLogin = async (): Promise<void> => {
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
    return (<EnterMnemonic
      inputsList={inputsList}
      onEnterWord={this.handleEnterWord}
      onLogin={this.handleLogin}
      refInput={this.refInput}
    />)
  }
}

export default withLogin(EnterMnemonicContainer)
