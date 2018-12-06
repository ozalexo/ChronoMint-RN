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
import { decryptWallet } from '@chronobank/ethereum/utils'
import { loginThunk } from '@chronobank/session/redux/thunks'
import { name as appName } from '../../../../app.json'
import Login from './Login'

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
    biometryType: null,
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
      .then((biometryType) => {
        this.setState({ biometryType })
        if (biometryType === true) {
          this.setState({ biometryType: 'TouchID' }) //For Android
        }
      })
      .then(this.authenticate)
      .catch(() => {
        Alert.alert('You do not support the ability to scan.')
      })
  }

  authenticate = () => {
    return TouchID.authenticate(`${appName} Application`)
      .then(() => {
        const {
          account,
        } = this.props.navigation.state.params
        this.handleLogin(account.address)
      })
      .catch(() => { })
  }

  checkPassword = async (password) => {
    try {
      const {
        account,
      } = this.props.navigation.state.params
      const credentials = await Keychain.getInternetCredentials(account.address)
      const results = await decryptWallet(account.encrypted, password)
      if (password === credentials.password && results) {
        return results.address
      }
    } catch (e) {
      this.setState({ error: e.message })
    }
  }

  handleLoginClick = async () => {
    const { password } = this.state
    const address = await this.checkPassword(password)
    if (address) {
      this.handleLogin(address)
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
    const { biometryType, error } = this.state

    return (
      <Login
        biometryType={biometryType}
        error={error}
        address={address}
        onChangePassword={this.handlePasswordChange}
        onClickForgotButton={this.handleForgotClick}
        onLoginClick={this.handleLoginClick}
        onScan={this.handleScan}
      />
    )
  }
}

export default connect(null, mapDispatchToProps)(LoginContainer)

