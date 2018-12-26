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
  FlatList,
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
import AccountItem from '../../../components/AccountItem'
import TextButton from '../../../components/TextButton'
import Separator from '../../../components/Separator'
import i18n from '../../../locales/translation'
import { MIN_PASSWORD_LENGTH } from '../../../common/constants/globals'
import { headerHeight } from '../../../common/constants/screens'

const CustomizedSeparator = () => <Separator style={styles.separator} />

export default class Start extends PureComponent {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.shape({
      address: PropTypes.string,
      encrypted: PropTypes.shape({}),
    })),
    onClickUseExistingButton: PropTypes.func.isRequired,
    onClickCreateWalletButton: PropTypes.func.isRequired,
  }

  keyExtractor = ({ address }) => address

  renderItem = ({ item }) => (
    <AccountItem
      {...item}
      onPress={this.props.onSelectAccount(item)}
    />
  )

  renderAccountsList = () => {
    const {
      accounts,
      onClickUseExistingButton,
      onToggleScreenContent,
    } = this.props
    return (
      <React.Fragment>
        {
          !accounts || accounts.length === 0
            ? <Text style={styles.noAccountsText}>No Accounts To Show</Text>
            : <FlatList
              data={this.props.accounts}
              ItemSeparatorComponent={CustomizedSeparator}
              keyExtractor={this.keyExtractor}
              ListFooterComponent={CustomizedSeparator}
              ListHeaderComponent={CustomizedSeparator}
              renderItem={this.renderItem}
              style={styles.accountsList}
            />
        }

        <PrimaryButton
          label={i18n.t('StartPage.addAnExistingAccount')}
          onPress={onClickUseExistingButton}
          style={styles.primaryButton}
          upperCase
        />
        <Text style={styles.orText}>
          {
            i18n.t('StartPage.or')
          }
        </Text>
        <TextButton
          label={i18n.t('StartPage.createNewAccount')}
          onPress={onToggleScreenContent}
          style={styles.textButton}
        />
      </React.Fragment>
    )
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
          placeholder={i18n.t('StartPage.password')}
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
          placeholder={i18n.t('StartPage.confirmPassword')}
          secureTextEntry
          style={styles.input}
          value={values.confirmPassword}
        />
        <PrimaryButton
          label={i18n.t('StartPage.createNewAccount')}
          onPress={handleSubmit}
          style={styles.primaryButton}
          disabled={!isValid || isSubmitting}
          upperCase
        />
        <Text style={styles.orText}>
          {
            i18n.t('StartPage.or')
          }
        </Text>
        <TextButton
          label={i18n.t('StartPage.useExistingAccount')}
          onPress={this.props.onToggleScreenContent}
          style={styles.textButton}
        />
      </React.Fragment>
    )
  }

  renderCreateAccountForm = () => {
    return (
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={this.enterPasswordValidationSchema}
        onSubmit={this.props.onClickCreateWalletButton}
        render={this.renderEnterPasswordForm}
      />
    )
  }

  handleKeyboardDismiss = () => Keyboard.dismiss()

  render () {
    // TODO: [AO] constants below were adjusted manually
    // Need to investigate the reasons and setup precise values
    // Default header heights: ios = 64, android = 56
    const keyboardVerticalOffset = -headerHeight
    const {
      showAccountsList,
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
                showAccountsList
                  ? this.renderAccountsList()
                  : this.renderCreateAccountForm()
              }
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
