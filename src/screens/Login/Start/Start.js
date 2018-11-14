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
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
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
    navigateToImportWallet: PropTypes.func.isRequired,
    handleEnterPasswordSubmit: PropTypes.func.isRequired,
  }

  navigateToImportMethods = () => {
    this.props.navigation.navigate('ImportMethod')
  }

  renderAccountsList = () => (
    <React.Fragment>
      <Text>Under construction</Text>
    </React.Fragment>
  )

  enterPasswordValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8)
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password', null)],
        'Confirm Password must matched Password',
      )
      .required('Confirm Password is required'),
  })

  renderEnterPasswordForm = ({
    errors,
    handleSubmit,
    isSubmitting,
    isValid,
    setFieldTouched,
    setFieldValue,
    touched,
    values,
  }) => {
    return (
      <React.Fragment>
        <Input
          autoCorrect={false}
          error={touched.password && errors.password}
          name='password'
          onTouch={setFieldTouched}
          onChange={setFieldValue}
          placeholder={PASSWORD_PLACEHOLDER}
          secureTextEntry
          style={styles.input}
          value={values.password}
        />
        <Input
          autoCorrect={false}
          error={touched.confirmPassword && errors.confirmPassword}
          name='confirmPassword'
          onTouch={setFieldTouched}
          onChange={setFieldValue}
          placeholder={CONFIRM_PASSWORD_PLACEHOLDER}
          secureTextEntry
          style={styles.input}
          value={values.confirmPassword}
        />
        <PrimaryButton
          label={CREATE_WALLET_BUTTON_LABEL}
          onPress={handleSubmit}
          style={styles.primaryButton}
          disabled={!isValid || isSubmitting}
          upperCase
        />
      </React.Fragment>
    )
  }

  renderCreateAccountForm = () => {
    const {
      navigateToImportWallet,
    } = this.props

    return (
      <React.Fragment>
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validationSchema={this.enterPasswordValidationSchema}
          onSubmit={this.props.handleEnterPasswordSubmit}
          render={this.renderEnterPasswordForm}
        />
        <Text style={styles.orText}>
          {
            'or'
          }
        </Text>
        <TextButton
          label={USE_EXISTING_WALLET_BUTTON_LABEL}
          onPress={this.navigateToImportMethods}
        />
      </React.Fragment>
    )
  }

  handleKeyboardDismiss = () => Keyboard.dismiss()

  render () {
    // TODO: [AO] constants below were adjusted manually
    // Need to investigate the reasons and setup precise values
    // Default header heights: ios = 64, android = 56
    const keyboardVerticalOffset = Platform.OS === 'ios'
      ? -20
      : 0

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
                this.props.accounts
                  ? this.renderAccountsList()
                  : this.renderCreateAccountForm()
              }
            </View>
          </KeyboardAvoidingView>
          <Text style={styles.copyright}>
            {
              COPYRIGHT
            }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
