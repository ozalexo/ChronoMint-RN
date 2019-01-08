/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import { getAddress } from '@chronobank/ethereum/utils'
import { mnemonicToPrivateKeyAndAddress } from '@chronobank/ethereum/utils'
import i18n from '../../../locales/translation'
import { MNEMONIC_LENGTH } from '../../../common/constants/globals'
import EnterMnemonic from './EnterMnemonic'

class EnterMnemonicContainer extends PureComponent {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    mnemonic: '',
  }

  handleChangeMnemonic = (name, value) => {
    this.setState({ [name]: value })
  }

  handleLogin = () => {
    const { mnemonic } = this.state
    const { navigate } = this.props.navigation
    const mnemonicWords = mnemonic && mnemonic.trim().split(' ')

    try {
      const { privateKey } = mnemonicToPrivateKeyAndAddress(mnemonic)
      const ethereumMainAddress = getAddress(privateKey)

      if (!ethereumMainAddress || !privateKey || mnemonicWords.length !== MNEMONIC_LENGTH) {
        return Alert.alert(i18n.t('EnterMnemonic.wrongMnemonic'))
      }

      const params = {
        mnemonic,
        ethereumMainAddress,
      }
      navigate('SetAccountPassword', params)
    } catch (error) {
      return Alert.alert(i18n.t('EnterMnemonic.wrongMnemonic'))
    }

  }

  resetState = () => {
    this.setState({ mnemonic: '' })
  }

  render () {
    const { error } = this.state
    return (
      <EnterMnemonic
        onChangeMnemonic={this.handleChangeMnemonic}
        onLogin={this.handleLogin}
        error={error}
      />
    )
  }
}

export default EnterMnemonicContainer
