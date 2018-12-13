/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import {
  ChronoWalletIcon,
  ChronoWalletText,
} from '../../../images'
import i18n from '../../../locales/translation'
import { MIN_PASSWORD_LENGTH } from '../../../common/constants/globals'
import { headerHeight } from '../../../common/constants/screens'
import Input from '../../../components/Input'
import PrimaryButton from '../../../components/PrimaryButton'
import TextButton from '../../../components/TextButton'
import styles from './SetAccountPasswordStyles'

export default class SetAccountPassword extends PureComponent {

  static propTypes = {
    isCreatingNewWallet: PropTypes.bool,
    onChangePassword: PropTypes.func,
    onChangePasswordConfirmation: PropTypes.func,
    onDone: PropTypes.func,
    onUseWallet: PropTypes.func,
  }

  enterPasswordValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, i18n.t('StartPage.passwordTooShort', { min_password_length: MIN_PASSWORD_LENGTH }))
      .required(i18n.t('StartPage.passwordRequired'))
      .matches(/[a-z]/, i18n.t('StartPage.passwordLowerCaseChar'))
      .matches(/[A-Z]/, i18n.t('StartPage.passwordUpperCaseChar'))
      .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, i18n.t('StartPage.passwordSpecialChar')),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password', null)],
        i18n.t('StartPage.mismatchPasswords'),
      )
      .required(i18n.t('StartPage.confirmPasswordRequired')),
  })

  renderEnterPasswordForm = ({
    handleSubmit,
    isCreatingNewWallet,
    onUseWallet,
    errors,
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
          onTouch={setFieldTouched}
          onChange={setFieldValue}
          lable='Password'
          name='password'
          placeholder={i18n.t('SetAccountPassword.password')}
          secureTextEntry
          value={values.password}
          style={styles.input}
        />
        <Input
          autoCorrect={false}
          error={touched.confirmPassword && errors.confirmPassword}
          onTouch={setFieldTouched}
          onChange={setFieldValue}
          label='Confirm Password'
          name='confirmPassword'
          placeholder={i18n.t('SetAccountPassword.confirmPassword')}
          secureTextEntry
          style={styles.input}
          value={values.confirmPassword}
        />
        {isCreatingNewWallet
          ?
          <View>
            <PrimaryButton
              label={i18n.t('SetAccountPassword.createWallet')}
              onPress={handleSubmit}
              style={styles.primaryButton}
              disabled={!isValid || isSubmitting}
              upperCase
            />
            <Text style={styles.or}>
              {i18n.t('SetAccountPassword.or')}
            </Text>
            <TextButton
              label={i18n.t('SetAccountPassword.useExistingWallet')}
              onPress={onUseWallet}
            />
          </View>
          :
          <PrimaryButton
            label={i18n.t('SetAccountPassword.setPassword')}
            onPress={handleSubmit}
            style={styles.primaryButton}
            disabled={!isValid || isSubmitting}
          />
        }
      </React.Fragment>
    )
  }

  handleKeyboardDismiss = () => Keyboard.dismiss()

  render () {
    // const keyboardVerticalOffset = -headerHeight

    const {
      onDone = () => { },
    } = this.props
    return (
      <View style={styles.container}>
        <View {...this.props} style={styles.inputsContainer}>
          <Formik
            initialValues={{
              password: '',
              confirmPassword: '',
            }}
            validationSchema={this.enterPasswordValidationSchema}
            onSubmit={onDone}
            render={this.renderEnterPasswordForm}
          />
        </View>
        <Text style={styles.copyright}>
          {i18n.t('SetAccountPassword.copyright')}
        </Text>
      </View>
    )
  }
}

