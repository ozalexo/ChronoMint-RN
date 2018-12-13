/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Input from '../../../components/Input'
import PrimaryButton from '../../../components/PrimaryButton'
import i18n from '../../../locales/translation'
import styles from './EnterMnemonicStyles'

export default class EnterMnemonic extends PureComponent {

  static propTypes = {
    onChangeMnemonic: PropTypes.func,
    onLogin: PropTypes.func,
    error: PropTypes.string,
  }

  render () {
    const {
      onChangeMnemonic = () => { },
      onLogin = () => { },
      error,
    } = this.props

    return (
      <View style={styles.screenView}>
        <Input
          label='Mnemonic'
          name='mnemonic'
          onChange={onChangeMnemonic}
          error={error}
        />
        <PrimaryButton
          style={styles.button}
          label={i18n.t('EnterMnemonic.login')}
          onPress={onLogin}
        />
      </View>
    )
  }
}
