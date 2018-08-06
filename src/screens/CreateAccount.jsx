/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {
  Field
} from 'redux-form/immutable'
import I18n from 'react-native-i18n'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import TextButton from '../components/TextButton'
import styles from './styles/SetAccountPasswordStyles'

export type TSetAccountPasswordProps = {
  onChangePassword: (password: string) => void,
  onChangePasswordConfirmation: (passwordConfirmation: string) => void,
  handleSubmit: () => void,
  navigateToSelectWallet: () => void,
  onSelectLanguage: () => void,
  onSelectNetwork: () => void
}

type THeaderProps = {
  onSelectLanguage: () => void,
  onSelectNetwork: () => void,
}

export default class CreateAccount extends PureComponent<TSetAccountPasswordProps, {}> {
  render () {
    const {
      onChangePassword,
      onChangePasswordConfirmation,
      handleSubmit,
      navigateToSelectWallet,
      onSelectLanguage,
      onSelectNetwork
    } = this.props

    return (
      <View>
        <Header
          onSelectLanguage={onSelectLanguage}
          onSelectNetwork={onSelectNetwork}
        />
        <Text
          style={styles.titleText}
        >
          Create New Account
        </Text>
        <Text
          style={styles.subtitleText}
        >
          Created wallet will be encrypted using given password and stored in your browser's local storage.
        </Text>
        <Field
          autoCorrect={false}
          component={Input}
          name={'walletName'}
          placeholder={'Wallet name'}
          style={styles.input}
        />
        <Field
          autoCorrect={false}
          component={Input}
          name={'password'}
          placeholder={I18n.t('SetAccountPassword.password')}
          secureTextEntry
          style={styles.input}
        />
        <Field
          autoCorrect={false}
          component={Input}
          name={'confirmPassword'}
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
      </View>
    )
  }
}
