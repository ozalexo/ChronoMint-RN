/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import isValid from '../utils/validators'
import SetAccountPassword from '../screens/SetAccountPassword'
import { NavigationActions } from 'react-navigation'
import type {
  NavigationScreenProp,
  NavigationState,
  // NavigationStateRoute,
  // NavigationEventSubscription,
} from 'react-navigation';

let lastAccount = false

type TSetAccountPasswordContainerProps = {
  generateMnemonic: () => void,
  isCreatingNewWallet?: boolean,
  lastAccount: any,
  navigation: NavigationScreenProp<NavigationState>,
  privateKey?: string,
  navigationOptions: any
}

type TSetAccountPasswordContainerState = {
  password: string,
  passwordConfirmation: string,
}

class SetAccountPasswordContainer extends PureComponent<TSetAccountPasswordContainerProps, TSetAccountPasswordContainerState> {

  static navigationOptions = {
    header: null
  }

  // static navigationOptions = {
  //   // headerLeft: <LeftNB />,
  //   // headerRight: <RightNB />,
  //   // headerBackground: <View style={{backgroundColor: '#242045', flex: 1}} />
  //   title: 'Test Tiele'
  // }

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
      navigator
    } = this.props

    const { password, passwordConfirmation } = this.state

    if (password !== passwordConfirmation) {
      return this.addError(I18n.t('SetAccountPassword.mismatchPasswords'))
    }
    if (!isValid.password(password) || !isValid.password(passwordConfirmation)) {
      return this.addError(I18n.t('SetAccountPassword.invalidPassword'))
    }

    navigator.push({
      screen: 'WalletBackup',
      passProps: {
        mnemonic,
        privateKey,
        password
      }
    })
  }

  handleUseWallet = () => {
    this.props.navigation.navigate('SelectAccountContainer')
    //   screen: 'SelectAccountContainer',
    //   title: I18n.t('SelectAccount.title')
    // })
  }

  handleWallet = () => {
    this.props.navigator.push({
      screen: 'WalletsList'
    })
  }

  handleLastAccount = () => {
    if (lastAccount) return

    lastAccount = true

    this.props.navigator.push({
      screen: 'EnterPin',
      title: 'EnterPin',
      passProps: {
        isLogin: true,
        account: this.props.lastAccount
      }
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
      />
    )
  }
}

export default SetAccountPasswordContainer
