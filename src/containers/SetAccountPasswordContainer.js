/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import type {
  NavigationScreenProp,
  NavigationState
} from 'react-navigation'
import isValid from '../utils/validators'
import SetAccountPassword from '../screens/SetAccountPassword'

let lastAccount = false

type TSetAccountPasswordContainerProps = {
  accountProfile: any,
  isCreatingNewWallet?: boolean,
  lastAccount: any,
  mnemonic: any,
  navigation: NavigationScreenProp<NavigationState>,
  navigationOptions: any,
  privateKey: string,
  privateKey?: string,
  generateMnemonic: () => void
}

type TSetAccountPasswordContainerState = {
  password: string,
  passwordConfirmation: string,
}

class SetAccountPasswordContainer extends PureComponent<TSetAccountPasswordContainerProps, TSetAccountPasswordContainerState> {
  state = {
    password: '',
    passwordConfirmation: ''
  }

  handleChangePassword = (password: string) => {
    this.setState({ password })
  }

  handleChangePasswordConfirmation = (passwordConfirmation: string) => {
    this.setState({ passwordConfirmation })
  }

  handleDone = () => {
    const {
      mnemonic,
      privateKey,
      navigation
    } = this.props

    const {
      password,
      passwordConfirmation
    } = this.state

    if (password !== passwordConfirmation) {
      return this.addError(I18n.t('SetAccountPassword.mismatchPasswords'))
    }
    if (!isValid.password(password) || !isValid.password(passwordConfirmation)) {
      return this.addError(I18n.t('SetAccountPassword.invalidPassword'))
    }

    let wallet = dispatch(PersistAccountActions.createAccount({
      name: '', // name. Not used in RN
      password,
      mnemonic,
      privateKey,
      numberOfAccounts: 0, // Good.
    }))

    dispatch(PersistAccountActions.accountAdd(wallet))
    dispatch(PersistAccountActions.accountSelect(wallet))

    navigation.navigate('WalletBackup', {
      usePinProtection: false,
      isCreatingNewWallet: false,
      mnemonic,
      privateKey,
      password
    })
  }

  handleUseWallet = () => {
    this.props.navigation.navigate('SelectAccountContainer')
  }

  handleWallet = () => {
    this.props.navigation.navigate('WalletsList')
  }

  handleLastAccount = () => {
    if (lastAccount) return

    lastAccount = true

    this.props.navigation.navigate('EnterPin', {
      title: 'EnterPin',
      isLogin: true,
      account: this.props.lastAccount
    })
  }

  addError = (error: string) => {
    alert(error)
  }

  render () {
    if (this.props.lastAccount) {
      this.handleLastAccount()
    }
    return (
      <SetAccountPassword
        isCreatingNewWallet={this.props.isCreatingNewWallet}
        onChangePassword={this.handleChangePassword}
        onChangePasswordConfirmation={this.handleChangePasswordConfirmation}
        onDone={this.handleDone}
        onSelectLanguage={this.props.navigation.toggleLanguageDrawer}
        onSelectNetwork={this.props.navigation.toggleMainMenuDrawer}
        onUseWallet={this.handleUseWallet}
        navigation={this.props.navigation}
      />
    )
  }
}

export default SetAccountPasswordContainer
