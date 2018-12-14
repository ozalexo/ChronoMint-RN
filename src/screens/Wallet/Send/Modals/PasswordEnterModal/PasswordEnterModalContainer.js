/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import { getCurrentEthWallet } from '@chronobank/ethereum/redux/selectors'
import { getBitcoinCurrentWallet } from '@chronobank/bitcoin/redux/selectors'
import { updateBitcoinTxDraftSignedTx } from '@chronobank/bitcoin/redux/thunks'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TouchID from 'react-native-touch-id'
import * as Keychain from 'react-native-keychain'
import { decryptWallet } from '@chronobank/ethereum/utils'
import { signTransaction } from '@chronobank/bitcoin/utils'
import { name as appName } from '../../../../../../app.json'
import PasswordEnterModal from './PasswordEnterModal'

const mapStateToProps = (state) => {
  return {
    currentWallet: getCurrentEthWallet(state),
    currentBTCWallet: getBitcoinCurrentWallet(state),
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateBitcoinTxDraftSignedTx,
}, dispatch)

class PasswordEnterModalContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      password: '',
      error: null,
      biometryType: null,
    }
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
          parentAddress,
        } = this.props.passProps
        return Keychain.getInternetCredentials(parentAddress)
      })
      .then((keychain) => this.handleConfirmClick({ password: keychain.password }))
      .catch(() => { })
  }

  checkPassword = (password) => {
    const {
      currentWallet,
    } = this.props
    return decryptWallet(currentWallet.encrypted, password)
      .then((wallet) => {
        return true
      })
      .catch((error) => {
        this.setState({ error: error.message })
        return false
      })
  }

  handleConfirmClick = async ({ password }) => {
    const {
      currentWallet,
    } = this.props
    const pass = password ? password : this.state.password
    const isPasswordValid = await this.checkPassword(pass)
    if (isPasswordValid) {
      decryptWallet(currentWallet.encrypted, pass)
        .then((results) => {
          this.handleSign({
            privateKey: results.privateKey,
          })
        })
    }
  }

  handleSign = ({ privateKey }) => {
    const {
      updateBitcoinTxDraftSignedTx,
      passProps,
      currentBTCWallet,
    } = this.props
    const signedTx = signTransaction({
      unsignedTxHex: currentBTCWallet.txDraft.unsignedTx,
      network: passProps.network.networkType,
      privateKey,
    })
    if (signedTx) {
      updateBitcoinTxDraftSignedTx({
        address: currentBTCWallet.address,
        parentAddress: passProps.parentAddress,
        signedTx,
      })
      this.props.confirmPassword()
    }
  }


  render () {
    const {
      biometryType,
    } = this.state
    const {
      passProps,
      visible,
      modalToggle,
      error,
    } = this.props
    return (
      <PasswordEnterModal
        onPasswordChange={this.handlePasswordChange}
        onConfirmPassword={this.handlePasswordConfirm}
        onScan={this.handleScan}
        biometryType={biometryType}
        passProps={passProps}
        visible={visible}
        modalToggle={modalToggle}
        error={error}
      />
    )
  }
}

PasswordEnterModalContainer.propTypes = {
  visible: PropTypes.bool,
  modalToggle: PropTypes.func,
  passwordChange: PropTypes.func,
  error: PropTypes.string,
  confirmPassword: PropTypes.func,
  styles: PropTypes.shape({}),
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordEnterModalContainer)
