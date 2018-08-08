/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import type {
  NavigationScreenProp,
  NavigationState
} from 'react-navigation'
import type { Dispatch } from 'redux'
import { login } from '@chronobank/core/redux/session/actions'
import WalletBackup from '../screens/WalletBackup'

type TWalletBackupContainerProps = {
  isCreatingNewWallet?: boolean,
  mnemonic: string,
  privateKey?: string,
  navigation: NavigationScreenProp<NavigationState>,
  password: string,
  login(account: any): void,
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  login: (account) => dispatch(login(account, false))
})

class WalletBackupContainer extends PureComponent<TWalletBackupContainerProps, {}> {
  handleDone = () => {
    const {
      generateMnemonic,
      isCreatingNewWallet,
      onLogin,
      usePinProtection,
      privateKey,
      password,
      navigation
    } = this.props

    let mnemonic = this.props.mnemonic || generateMnemonic()

    if (isCreatingNewWallet) {
      navigation.navigate('GenerateMnemonic', {
        mnemonic,
        privateKey,
        password
      })
    }

    if (usePinProtection) {
      navigation.navigate('EnterPin', {
        mnemonic,
        privateKey,
        password
      })
    }

    this.login()
  }

  render () {
    return (
      <WalletBackup
        onDone={this.handleDone}
        onLater={this.props.onLogin}
        onSwitchUsePinProtection={this.props.onSetUsePinProtection}
        usePinProtection={this.props.usePinProtection}
      />
    )
  }
}

export default connect(null, mapDispatchToProps)(WalletBackupContainer)
