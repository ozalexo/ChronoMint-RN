/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import SetAccountPassword from './SetAccountPassword'

let lastAccount = false

class SetAccountPasswordContainer extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.shape({
        params: PropTypes.shape({
          mnemonic: PropTypes.string,
          password: PropTypes.string,
          privateKey: PropTypes.string,
        }),
      }),
    }).isRequired,
    isCreatingNewWallet: PropTypes.bool,
  }

  static navigatorStyle = {
    navBarHidden: true,
  }

  state = {
    password: '',
    passwordConfirmation: '',
  }

  handleSelectNetwork = () => {
    const { navigate } = this.props.navigation
    navigate('SelectNetwork')
  }

  handleSelectLanguage = () => {
    const { navigate } = this.props.navigation
    navigate('SelectLanguage')
  }

  handleDone = () => {
    const {
      mnemonic,
      privateKey,
    } = this.props.navigation.state.params
    const { navigate } = this.props.navigation

    const { password } = this.state

    const params = {
      mnemonic,
      privateKey,
      password,
    }

    navigate('WalletBackup', params)
  }

  handleUseWallet = () => {
    const { navigate } = this.props.navigation
    navigate('SelectAccount')
  }

  handleWallet = () => {
    const { navigate } = this.props.navigation
    navigate('WalletsList')
  }

  handleLastAccount = () => {
    const { navigate } = this.props.navigation
    if (lastAccount) return

    lastAccount = true

    navigate('EnterPin')

    // passProps: {
    //   isLogin: true,
    //   account: this.props.lastAccount
    // }
  }

  addError = (error) => {
    Alert.alert(error)
  }

  render () {
    const {
      isCreatingNewWallet,
    } = this.props
    if (this.props.lastAccount) {
      this.handleLastAccount()
    }

    return (
      <SetAccountPassword
        isCreatingNewWallet={isCreatingNewWallet}
        onChangePassword={this.handleChangePassword}
        onChangePasswordConfirmation={this.handleChangePasswordConfirmation}
        onDone={this.handleDone}
        onSelectLanguage={this.handleSelectLanguage}
        onSelectNetwork={this.handleSelectNetwork}
        onUseWallet={this.handleUseWallet}
      />
    )
  }
}

export default SetAccountPasswordContainer
