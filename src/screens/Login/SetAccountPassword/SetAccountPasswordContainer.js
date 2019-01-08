/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginThunk } from '@chronobank/session/redux/thunks'
import SetAccountPassword from './SetAccountPassword'
import { createAccountByMnemonic, createAccountByPrivateKey } from '@chronobank/ethereum/redux/thunks'

let lastAccount = false

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createAccountByMnemonic,
  createAccountByPrivateKey,
  loginThunk,
}, dispatch)

class SetAccountPasswordContainer extends PureComponent {
  static propTypes = {
    loginThunk: PropTypes.func,
    createAccountByMnemonic: PropTypes.func,
    createAccountByPrivateKey: PropTypes.func,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.shape({
        params: PropTypes.shape({
          mnemonic: PropTypes.string,
          privateKey: PropTypes.string,
          ethereumMainAddress: PropTypes.string,
        }),
      }),
    }).isRequired,
    isCreatingNewWallet: PropTypes.bool,
    lastAccount: PropTypes.string,
  }

  static navigatorStyle = {
    navBarHidden: true,
  }

  handleSelectNetwork = () => {
    const { navigate } = this.props.navigation
    navigate('SelectNetwork')
  }

  handleSelectLanguage = () => {
    const { navigate } = this.props.navigation
    navigate('SelectLanguage')
  }

  handleDone = (values) => {
    const {
      navigation,
      createAccountByMnemonic,
      createAccountByPrivateKey,
      loginThunk,
    } = this.props
    const {
      privateKey,
      mnemonic,
      ethereumMainAddress,
    } = navigation.state.params
    const { navigate } = navigation
    const { password } = values

    if (mnemonic) {
      createAccountByMnemonic(mnemonic, password)
        .then((derivedPrivateKey) => {
          loginThunk(ethereumMainAddress, derivedPrivateKey)
            .then(() => {
              navigate('WalletList')
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.warn(error)
            })
        })
        .catch((error) => {
          // TODO: need to think about correct way of error handling
          // eslint-disable-next-line no-console
          console.warn(error)
        })
    } else {
      createAccountByPrivateKey(privateKey, password)
        .then((derivedPrivateKey) => {
          loginThunk(ethereumMainAddress, derivedPrivateKey)
            .then(() => {
              navigate('WalletList')
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.warn(error)
            })
        })
        .catch((error) => {
          // TODO: need to think about correct way of error handling
          // eslint-disable-next-line no-console
          console.warn(error)
        })
    }

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

export default connect(null, mapDispatchToProps)(SetAccountPasswordContainer)
