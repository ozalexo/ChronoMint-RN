/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-native'
import TouchID from 'react-native-touch-id'
import * as Keychain from 'react-native-keychain'
import PropTypes from 'prop-types'
import { getEthAccounts } from '@chronobank/ethereum/redux/selectors'
import Start from './Start'

/* eslint-disable no-unused-vars */
const mapStateToProps = (ownState, ownProps) => {
  return {
    accounts: getEthAccounts(ownState),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigateToImportWallet: () => { },
  }
}
/* eslint-enable no-unused-vars */

class StartContainer extends PureComponent {
  constructor () {
    super()
    this.state = {
      biometryType: null,
    }
  }

  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.shape({
      address: PropTypes.string,
    })),
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount () {
    this.getBio()
  }

  getBio = () => {
    Keychain.canImplyAuthentication().then((type) => console.log(type))
    Keychain.getSupportedBiometryType().then((type) => console.log(type))
    TouchID.isSupported()
      .then((biometryType) => {
        this.setState({ biometryType }, () => Alert.alert(this.state.biometryType === true ? 'AUTH ENABLED' : null));
      })
      .catch((error) => {
        Alert.alert(error.message);
      })
  }

  authHandler = () => {
    TouchID.isSupported()
      .then(this.authenticate)
  }

  authenticate = () => {
    return TouchID.authenticate()
      .then((success) => console.log(success))
      .catch((error) => {
        Alert.alert(error.message)
      })
  }

  save = async ({ password }) => {
    try {
      await Keychain.setGenericPassword(
        password,
        { accessControl: 'password' }
      )
      this.setState({ password: '', status: 'Credentials saved!' })
    } catch (err) {
      this.setState({ status: 'Could not save credentials, ' + err })
    }

  }

  load = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        this.setState({ ...credentials, status: 'Credentials loaded!' })
      } else {
        this.setState({ status: 'No credentials stored.' })
      }
    } catch (err) {
      this.setState({ status: 'Could not load credentials. ' + err })
    }
  }

  handleUseExistingButtonClick = () => {
    this.props.navigation.navigate('ImportMethod')
  }

  handleCreateWalletButtonClick = (values, { setSubmitting }) => {
    setSubmitting(false)
    const params = {
      password: values.password,
    }
    this.props.navigation.navigate('GenerateMnemonic', params)
  }

  handleSelectAccount = (account) => () => {
    const { navigate } = this.props.navigation
    const params = {
      account,
    }
    navigate('SetAccountPassword', params)
  }

  render () {
    const { accounts } = this.props
    return (
      <Start
        onClickUseExistingButton={this.handleUseExistingButtonClick}
        onClickCreateWalletButton={this.handleCreateWalletButtonClick}
        onSelectAccount={this.handleSelectAccount}
        authHandler={this.authHandler}
        accounts={accounts}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartContainer)
