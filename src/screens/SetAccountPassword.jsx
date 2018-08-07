/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'

import {
  Text,
  View
} from 'react-native'
import type {
  NavigationScreenProp,
  NavigationState
} from 'react-navigation'
import I18n from 'react-native-i18n'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import styles from './styles/SetAccountPasswordStyles'
import LoginLayout from '../components/LoginLayout'

export type TSetAccountPasswordProps = {
  onChangePassword: (password: string) => void,
  onChangePasswordConfirmation: (passwordConfirmation: string) => void,
  onDone: () => void,
  navigation: NavigationScreenProp<NavigationState>,
}

export default class SetAccountPassword extends PureComponent<TSetAccountPasswordProps, {}> {
  render () {
    const {
      onChangePassword,
      onChangePasswordConfirmation,
      onDone
    } = this.props

    return (
      <LoginLayout>
        <Input
          autoCorrect={false}
          onChangeText={onChangePassword}
          placeholder={I18n.t('SetAccountPassword.password')}
          secureTextEntry
          style={styles.input}
        />
        <Input
          autoCorrect={false}
          onChangeText={onChangePasswordConfirmation}
          placeholder={I18n.t('SetAccountPassword.confirmPassword')}
          secureTextEntry
          style={styles.input}
        />
        <PrimaryButton
          label='Set password'
          onPress={onDone}
        />
        <Text style={styles.copyright}>
          {I18n.t('SetAccountPassword.copyright')}
        </Text>
      </LoginLayout>
    )
  }
}
