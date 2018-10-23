/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import GenerateMnemonic from '../screens/GenerateMnemonic'

type TGenerateMnemonicContainerProps = {
  mnemonic: string,
  navigator: any,
  password: string,
  privateKey: string,
}

class GenerateMnemonicContainer extends PureComponent<TGenerateMnemonicContainerProps, {}> {
  handleConfirm = () => {
    const {
      mnemonic,
      password,
      privateKey,
      navigator
    } = this.props

    navigator.push({
      screen: 'ConfirmMnemonic',
      title: I18n.t('ConfirmMnemonic.title'),
      passProps: {
        mnemonic,
        password,
        privateKey
      }
    })
  }

  render () {
    return (<GenerateMnemonic
      mnemonic={this.props.mnemonic}
      onConfirm={this.handleConfirm}
    />)
  }
}

export default GenerateMnemonicContainer
