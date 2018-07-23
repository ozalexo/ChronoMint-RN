/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent, Component } from 'react'

import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import type {
  NavigationScreenProp,
  NavigationState
} from 'react-navigation'
import I18n from 'react-native-i18n'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import TextButton from '../components/TextButton'
import styles from './styles/StartScreenStyles'

export type TStartScreenProps = {
  onChangePassword: (password: string) => void,
  onChangePasswordConfirmation: (passwordConfirmation: string) => void,
  onDone: () => void,
  onSelectLanguage: () => void,
  onSelectNetwork: () => void,
  onUseWallet: () => void,
  navigation: NavigationScreenProp<NavigationState>,
}

// Left header button (main menu)
export class HL extends PureComponent<{ toggleDrawer: () => {} }> {
  render () {
    return (
      <TouchableOpacity
        onPress={this.props.toggleDrawer}
        style={styles.topBarButton}
      >
        <Image
          source={require('../images/ios-gear-outline.png')}
          style={styles.topBarButtonImage}
        />
        <Text style={styles.topBarButtonLabel}>
          Production
        </Text>
      </TouchableOpacity>
    )
  }
}

// Right header button (switch language)
export class HR extends PureComponent<{ toggleDrawer: () => {} }> {
  render () {
    return (
      <TouchableOpacity
        onPress={this.props.toggleDrawer}
        style={styles.topBarButton}
      >
        <Text style={styles.topBarButtonLabel}>
          EN-US
        </Text>
      </TouchableOpacity>
    )
  }
}

export default class StartScreen extends Component<TStartScreenProps, {}> {
  render () {
    const {
      onChangePassword,
      onChangePasswordConfirmation,
      onDone,
      onUseWallet
    } = this.props

    return (
      <View>
        <StatusBar barStyle='light-content' />
        <Image
          source={require('../images/ChronoWalletIcon.png')}
          style={styles.logo}
        />
        <Image
          source={require('../images/ChronoWalletText.png')}
          style={styles.logoText}
        />
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
          label={I18n.t('SetAccountPassword.createWallet').toUpperCase()}
          onPress={onDone}
        />
        <Text style={styles.or}>
          {I18n.t('SetAccountPassword.or')}
        </Text>
        <TextButton
          label={I18n.t('SetAccountPassword.useExistingWallet')}
          onPress={onUseWallet}
        />
        <Text style={styles.copyright}>
          {I18n.t('SetAccountPassword.copyright')}
        </Text>
      </View>
    )
  }
}
