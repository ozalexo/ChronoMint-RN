/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { Alert } from 'react-native'
import { getAddress } from '@chronobank/bitcoin/utils'
import { getPrivateKeyByMnemonic } from '@chronobank/ethereum/utils'
import i18n from '../../../locales/translation'
import { MNEMONIC_LENGTH } from '../../../common/constants/globals'
import EnterMnemonic from './EnterMnemonic'

const inputsList = Array(MNEMONIC_LENGTH).fill(1)

class EnterMnemonicContainer extends PureComponent {
  state = {
    mnemonicWords: [],
  }

  handleEnterWord = (index) => (name, value) => {
    if(value){
      const { mnemonicWords } = this.state
      mnemonicWords[index] = value.trim()
  
      if (/\s+$/.test(value)) {
        (index + 1 === MNEMONIC_LENGTH)
          ? this.handleLogin()
          : null
      }
  
      this.setState({ mnemonicWords })
    }
  }

  handleLogin = () => {
    const { mnemonicWords } = this.state
    const { navigate } = this.props.navigation
    const mnemonic = mnemonicWords.join(' ')


    const privateKey = getPrivateKeyByMnemonic(mnemonic)
    const address = getAddress(privateKey)

    if (!address || !privateKey || mnemonicWords.length !== MNEMONIC_LENGTH) {
      this.addError(i18n.t('EnterMnemonic.wrongMnemonic'))
      return this.resetState()
    }

    navigate('SetAccountPassword')
  }

  resetState = () => {
    this.setState({ mnemonicWords: [] })
  }

  addError = (error) => {
    Alert.alert(error)
  }

  render () {
    return (
      <EnterMnemonic
        inputsList={inputsList}
        onEnterWord={this.handleEnterWord}
        onLogin={this.handleLogin}
        refInput={this.refInput}
      />
    )
  }
}

export default EnterMnemonicContainer
