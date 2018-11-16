/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import { MNEMONIC_LENGTH } from '../../../common/constants/globals'
import i18n from '../../../locales/translation'
import ConfirmMnemonic from './ConfirmMnemonic'

class ConfirmMnemonicContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = this.createInitialState()
  }

  handleDone = async () => {
    const {
      mnemonic,
      password,
    } = this.props.navigation.state.params
    const {
      usePinProtection,
      navigation,
      onMnemonicLogin,
      onLogin,
    } = this.props

    if (mnemonic !== this.state.mnemonic.join(' ')) {
      this.addError(i18n.t('ConfirmMnemonic.wrongMnemonicError'))
      return this.resetState()
    }

    const { privateKey } = await onMnemonicLogin(mnemonic) //need action from @chronobank

    if (!usePinProtection) {
      return onLogin()
    }

    const params = {
      mnemonic,
      password,
      privateKey
    }

    navigation.navigate('EnterPin', params)
  }

  handleWord = (word) => () => {
    this.setState(({ words, mnemonic }) => {
      words.splice(words.indexOf(word), 1)
      words.push('emptyWord')

      return {
        mnemonic: [...mnemonic, word],
        words: [...words]
      }
    }, () => {
      if (this.state.mnemonic.length === MNEMONIC_LENGTH) {
        this.handleDone()
      }
    })
  }

  createInitialState = () => {
    const { mnemonic } = this.props.navigation.state.params
    return {
      mnemonic: [],
      words: mnemonic.split(' ').sort(() => Math.random() - 0.5)
    }
  }

  addError = (error) => {
    Alert.alert(error)
  }

  resetState = () => {
    this.setState(this.createInitialState())
  }

  render () {
    const { words, mnemonic } = this.state
    return (
      <ConfirmMnemonic
        onDone={this.handleDone}
        onWord={this.handleWord}
        mnemonic={mnemonic}
        words={words}
      />
    )
  }
}

ConfirmMnemonicContainer.propTypes = {
  mnemonic: PropTypes.string,
  usePinProtection: PropTypes.bool,
  password: PropTypes.string,
}

export default ConfirmMnemonicContainer
