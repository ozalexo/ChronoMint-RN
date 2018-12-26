/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {
  ChronoWalletIcon,
  ChronoWalletText,
} from '../../../images'
import Input from '../../../components/Input'
import PrimaryButton from '../../../components/PrimaryButton'
import AccountItem from '../../../components/AccountItem'
import TextButton from '../../../components/TextButton'
import Separator from '../../../components/Separator'
import i18n from '../../../locales/translation'
import { headerHeight } from '../../../common/constants/screens'

import styles from './LoginStyles'

const CustomizedSeparator = () => <Separator style={styles.separator} />

export default class Login extends PureComponent {
  static propTypes = {
    error: PropTypes.string,
    onChangePassword: PropTypes.func.isRequired,
    onClickForgotButton: PropTypes.func,
    onLoginClick: PropTypes.func.isRequired,
    onScan: PropTypes.func.isRequired,
  }

  renderAccount = () => {
    const { address } = this.props
    return (
      <React.Fragment>
        <CustomizedSeparator />
        <AccountItem
          address={address}
          onPress={() => { }}
        />
        <CustomizedSeparator />
      </React.Fragment>

    )
  }

  handleKeyboardDismiss = () => Keyboard.dismiss()

  render () {
    const keyboardVerticalOffset = -headerHeight
    const {
      error,
      onChangePassword = () => { },
      onClickForgotButton = () => { },
      onLoginClick = () => { },
      onScan = () => { },
      biometryType,
    } = this.props

    return (
      <TouchableWithoutFeedback
        onPress={this.handleKeyboardDismiss}
      >
        <View style={styles.kavContainer}>
          <KeyboardAvoidingView
            behavior='position'
            style={styles.container}
            contentContainerStyle={styles.container}
            keyboardVerticalOffset={keyboardVerticalOffset}
          >
            <View {...this.props} style={styles.inputsContainer}>
              <Image
                source={ChronoWalletIcon}
                style={styles.logo}
              />
              <Image
                source={ChronoWalletText}
                style={styles.logoText}
              />
              {
                biometryType &&
                <TextButton
                  label={`${biometryType} Auth`}
                  onPress={onScan}
                />
              }

              {
                this.renderAccount()
              }
              <Input
                label='Password'
                name='password'
                onChange={onChangePassword}
                error={error}
                style={styles.input}
                secureTextEntry
              />
              <PrimaryButton
                label='Log in'
                upperCase
                style={styles.primaryButton}
                onPress={onLoginClick}
              />
              <TextButton
                label={i18n.t('LoginPage.forgotPassword')}
                style={styles.forgotButton}
                onPress={onClickForgotButton}
              />
            </View>
          </KeyboardAvoidingView>
          <Text style={styles.copyright}>
            {
              i18n.t('StartPage.copyright')
            }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
