/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Alert } from 'react-native'
import TouchID from 'react-native-touch-id'
import * as Keychain from 'react-native-keychain'
import PropTypes from 'prop-types'
import { loginThunk } from '@chronobank/session/redux/thunks'
import Login from './Login'

/* eslint-disable no-unused-vars */


const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loginThunk,
}, dispatch)

class LoginContainer extends PureComponent {
  static propTypes = {
    loginThunk: PropTypes.func,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      state: PropTypes.shape({
        params: PropTypes.shape({
          account: PropTypes.shape({
            address: PropTypes.string,
            encrypted: PropTypes.shape({}),
          }),
        }),
      }),
    }),
  }

  state = {
    password: '',
    error: null,
  }

  componentDidMount () {
    this.handleScan()
  }

  handlePasswordChange = (name, value) => {
    const { error } = this.state
    if (error !== null) {
      this.setState({ error: null })
    }
    this.setState({ [name]: value })
  }

  handleScan = () => {
    TouchID.isSupported()
      .then(this.authenticate)
      .catch((error) => {
        Alert.alert('You do not support the ability to scan.')
      })
  }

  authenticate = () => {
    return TouchID.authenticate()
      .then((success) => {
        const {
          account,
        } = this.props.navigation.state.params
        this.handleLogin(account.address)
      })
      .catch((error) => {
        Alert.alert(error.message)
      })
  }

  checkPassword = async (password) => {
    const {
      account,
    } = this.props.navigation.state.params
    const credentials = await Keychain.getInternetCredentials(account.address)
    if (credentials.password === password) {
      return credentials.address
    }
    return false
  }

  handleLoginClick = async () => {
    const { password } = this.state
    const address = await this.checkPassword(password)
    if (address) {
      this.handleLogin(address)
    } else {
      this.setState({ error: 'Wrong Password' })
    }
  }

  handleLogin = (address) => {
    const { navigate } = this.props.navigation
    this.props.loginThunk(address)
    navigate('WalletList')
  }

  render () {
    const {
      address,
    } = this.props.navigation.state.params.account

    return (
      <Login
        address={address}
        onChangePassword={this.handlePasswordChange}
        onClickForgotButton={this.handleForgotClick}
        onLoginClick={this.handleLoginClick}
        onScan={this.handleScan}
        error={this.state.error}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)

