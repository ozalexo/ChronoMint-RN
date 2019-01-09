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

const authenticateErrors = {
  'NOT_SUPPORTED': 'Not supported.',
  'NOT_AVAILABLE': 'Not supported.',
  'NOT_PRESENT': 'Not supported.',
  'NOT_ENROLLED': 'Not supported.',
  'AUTHENTICATION_FAILED': 'Authenticate failed.',
  'AUTHENTICATION_CANCELED': 'Authenticate cancelled.',
  'FINGERPRINT_ERROR_LOCKOUT': 'Too many attempts.Try again Later.',
  'FINGERPRINT_ERROR_LOCKOUT_PERMANENT': 'Too many attempts.Fingerprint sensor disabled',
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
            privateKey: PropTypes.string,
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
      .then(() => {
        this.authenticate()
      })
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
        Keychain.getInternetCredentials(account.address)
          .then((keychain) => {
            this.handleLoginClick({ password: keychain.password })
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.warn(error)
          })
      })
      .catch((error) => {
        if (authenticateErrors[error.code]) {
          if (error.code !== 'AUTHENTICATION_CANCELED') {
            Alert.alert(authenticateErrors[error.code])
          }
        } else {
          Alert.alert('Authenticate error.')
        }
      })
  }

  handleLoginClick = async ({ password }) => {
    const {
      account,
    } = this.props.navigation.state.params
    const pass = password ? password : this.state.password
    decryptWallet(account.encrypted, pass)
      .then((results) => {
        this.handleLogin({
          address: results.address,
          privateKey: results.privateKey,
        })
      })
      .catch(() => {
        Alert.alert('Login failure. Verify your credentials and try again')
      })
  }

  handleLogin = ({ address, privateKey }) => {
    const { navigate } = this.props.navigation
    const { loginThunk } = this.props
    loginThunk(address, privateKey)
      .then(() => {
        navigate('WalletList')
      })
      .catch(() => {
        Alert.alert('Login failure. Verify your credentials and try again')
      })
  }

  handleAccountClick = () => {
    this.props.navigation.navigate('Start')
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
        onAccountClick={this.handleAccountClick}
        onChangePassword={this.handlePasswordChange}
        onClickForgotButton={this.handleForgotClick}
        onLoginClick={this.handleLoginClick}
        onScan={this.handleScan}
      />
    )
  }
}

export default connect(null, mapDispatchToProps)(LoginContainer)

