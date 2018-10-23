/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import isValid from '../utils/validators'
import AccountPassword from '../screens/AccountPassword'
import withLogin from '../components/withLogin'

export type TAccount = {
  image: any,
  address: string,
}

export type TAccountPasswordContainerProps = {
  account: {
    address: string,
    encryptedPrivateKey: string,
    passwordHash: string,
  },
  navigator: any,
  onPasswordLogin: ({ encryptedPrivateKey: string, passwordHash: string }, password: string) => Promise<void>,
}

type TAccountPasswordContainerState = {
  password: string,
}

class AccountPasswordContainer extends PureComponent<TAccountPasswordContainerProps, TAccountPasswordContainerState> {
  static navigatorStyle = {
    navBarHidden: true
  }

  state = {
    password: ''
  }

  handleChangePassword = (password: string) => {
    this.setState({ password })
  }

  handleLogin = async () => {
    const { password } = this.state

    if (!isValid.password(password)) {
      this.addError(I18n.t('AccountPassword.invalidPasswordError'))
    }

    await this.props.onPasswordLogin(this.props.account, password)
  }

  handleUseWallet = () => {
    this.props.navigator.push({
      screen: 'SelectAccount',
      title: 'Select account'
    })
  }

  addError = (error: string) => {
    alert(error)
  }

  render () {
    return (<AccountPassword
      account={{
        ...this.props.account,
        image: require('../images/profile-circle-small.png')
      }}
      onChangePassword={this.handleChangePassword}
      onLogin={this.handleLogin}
      onUseWallet={this.handleUseWallet}
    />)
  }
}

export default withLogin(AccountPasswordContainer)
