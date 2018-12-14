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
import { getCurrentNetwork } from '@chronobank/network/redux/selectors'
import { decryptWallet } from '@chronobank/ethereum/utils'
import { loginThunk } from '@chronobank/session/redux/thunks'
import { name as appName } from '../../../../app.json'
import Login from './Login'


const mapStateToProps = (state) => {
  return {
    network: getCurrentNetwork(state),
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loginThunk,
}, dispatch)

class LoginContainer extends PureComponent {
  static propTypes = {
    network: PropTypes.shape({
      blockchain: PropTypes.shape({
        Bitcoin: PropTypes.shape({
          bcNetworkId: PropTypes.string,
        }),
      }),
    }),
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
        return Keychain.getInternetCredentials(account.address)
      })
      .then((keychain) => this.handleLoginClick({ password: keychain.password }))
      .catch(() => { })
  }

  checkPassword = (password) => {
    const {
      account,
    } = this.props.navigation.state.params
    return decryptWallet(account.encrypted, password)
      .then((wallet) => {
        return true
      })
      .catch((error) => {
        this.setState({ error: error.message })
        return false
      })
  }


  handleLoginClick = async ({ password }) => {
    const {
      account,
    } = this.props.navigation.state.params
    const pass = password ? password : this.state.password
    const isPasswordValid = await this.checkPassword(pass)
    if (isPasswordValid) {
      decryptWallet(account.encrypted, pass)
        .then((results) => {
          this.handleLogin({
            address: results.address,
            privateKey: results.privateKey,
          })
        })
    }
  }

  handleLogin = ({ address, privateKey }) => {
    const { navigate } = this.props.navigation
    const { network, loginThunk } = this.props
    loginThunk(address, privateKey, { network: network.networkType })
      .then((result) => {
        console.log(result)
        navigate('WalletList')
      })
      .catch((error) => {
        Alert.alert('Login failture: ', error.message)
      })
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)

