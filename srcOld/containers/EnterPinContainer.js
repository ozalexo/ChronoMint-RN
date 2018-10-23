/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import EnterPin from '../screens/EnterPin'
import withLogin, { type TWithLoginProps } from '../components/withLogin'
import { PIN_LENGTH } from '../utils/globals'
import { type TStoredAccount } from '../redux/sensitive/reducer'

export type TEnterPinContainerProps = TWithLoginProps & {
  navigator: any,
  pin: string,
  privateKey: string,
  password?: string,
  onStoreAccount: (privateKey: string, password?: string, pin?: string) => void,
  onMnemonicLogin: (mnemonic: string) => void,
  mnemonic: string,
  onLogin: () => void,
  account?: TStoredAccount,
}

type TEnterPinContainerState = {
  pin: string,
}

class EnterPinContainer extends PureComponent<TEnterPinContainerProps, TEnterPinContainerState> {
  state = {
    pin: ''
  }

  handleChangePin = (pin: string) => {
    this.setState({ pin: pin.trim() })

    if (pin.length < PIN_LENGTH) return

    if (!this.props.pin) return this.gotoConfirmPin(pin)

    if (this.props.pin === pin) {
      this.handleLogin()

      return
    }

    alert(I18n.t('EnterPin.pinsNotMatch'))
  }

  handleLogin = async () => {
    const {
      onLogin,
      onStoreAccount,
      password,
      privateKey,
      pin,
      account
    } = this.props

    if (account) {
      await this.props.onPinLogin(account, pin)

      return
    }

    onStoreAccount(privateKey, password, pin)

    onLogin()
  }

  gotoConfirmPin = (pin) => {
    this.props.navigator.push({
      screen: 'EnterPin',
      title: I18n.t('EnterPin.confirmTitle'),
      passProps: {
        pin,
        privateKey: this.props.privateKey,
        password: this.props.password,
        account: this.props.account
      }
    })
  }

  render () {
    return (<EnterPin
      onChangePin={this.handleChangePin}
      pinDigitsFilledCount={this.state.pin.length}
      pinDigitsTotalCount={PIN_LENGTH}
    />)
  }
}

export default withLogin(EnterPinContainer)
