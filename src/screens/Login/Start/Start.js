/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native'
import styles from './StartStyles'
import {
  ChronoWalletIcon,
  ChronoWalletText,
} from '../../../images'
import Input from '../../../components/Input'
import PrimaryButton from '../../../components/PrimaryButton'
import TextButton from '../../../components/TextButton'

// TODO: it will be a part of I18N translations
const COPYRIGHT = 'Copyright ©2018 LaborX Australia Pty Ltd. All Rights Reserved.'
const PASSWORD_PLACEHOLDER = 'Password'
const CONFIRM_PASSWORD_PLACEHOLDER = 'Confirm password'
const CREATE_WALLET_BUTTON_LABEL = 'Create a wallet'
const USE_EXISTING_WALLET_BUTTON_LABEL = 'Use an existing wallet'

export default class Start extends PureComponent {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.shape({
      address: PropTypes.string,
    })),
    navigateToImportWallet: PropTypes.func,
    onChangePassword: PropTypes.func,
    onChangePasswordConfirmation: PropTypes.func,
    onDone: PropTypes.func,
  }

  renderCreateAccountForm = () => (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Input
        autoCorrect={false}
        onChangeText={this.props.onChangePassword}
        placeholder={PASSWORD_PLACEHOLDER}
        secureTextEntry
        style={styles.input}
      />
      <Input
        autoCorrect={false}
        onChangeText={this.props.onChangePasswordConfirmation}
        placeholder={CONFIRM_PASSWORD_PLACEHOLDER}
        secureTextEntry
        style={styles.input}
      />
      <PrimaryButton
        label={CREATE_WALLET_BUTTON_LABEL}
        onPress={this.props.onDone}
      />
      <Text style={styles.orText}>
        {
          'or'
        }
      </Text>
      <TextButton
        label={USE_EXISTING_WALLET_BUTTON_LABEL}
        onPress={this.props.navigateToImportWallet}
      />
    </View>
  )

  render () {
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
        contentContainerStyle={styles.container}
      >
        <Image
          source={ChronoWalletIcon}
          style={styles.logo}
        />
        <Image
          source={ChronoWalletText}
          style={styles.logoText}
        />
        {
          this.props.accounts
            ? this.renderAccountsList()
            : this.renderCreateAccountForm()
        }
        <Text style={styles.copyright}>
          {
            COPYRIGHT
          }
        </Text>
      </KeyboardAvoidingView>
    )
  }
}
