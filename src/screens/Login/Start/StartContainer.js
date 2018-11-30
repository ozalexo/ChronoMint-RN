/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as Keychain from 'react-native-keychain'
import PropTypes from 'prop-types'
import Start from './Start'


const ACCESS_CONTROL_OPTIONS = ['None', 'Passcode', 'Password'];
const ACCESS_CONTROL_MAP = [null, Keychain.ACCESS_CONTROL.DEVICE_PASSCODE, Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD, Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET]

/* eslint-disable no-unused-vars */
const mapStateToProps = (ownState, ownProps) => {
  return {
    accounts: null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigateToImportWallet: () => { },
  }
}
/* eslint-enable no-unused-vars */

class StartContainer extends PureComponent {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount () {
    this.getBio()
  }

  getBio = () => {
    Keychain.getSupportedBiometryType().then((biometryType) => {
      this.setState({ biometryType })
    })
  }

  save = async ({ password, confirmPassword }) => {
    try {
      await Keychain.setGenericPassword(
        password,
        confirmPassword,
        { accessControl: this.state.accessControl }
      )
      this.setState({ password: '', confirmPassword: '', status: 'Credentials saved!' })
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

  render () {
    return (
      <Start
        onClickUseExistingButton={this.handleUseExistingButtonClick}
        onClickCreateWalletButton={this.handleCreateWalletButtonClick}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartContainer)
