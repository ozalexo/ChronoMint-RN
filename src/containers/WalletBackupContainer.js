/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import type {
  NavigationScreenProp,
  NavigationState
} from 'react-navigation'
import withLogin, { type TWithLoginProps } from '../components/withLogin'
import WalletBackup from '../screens/WalletBackup'

type TWalletBackupContainerProps = TWithLoginProps & {
  isCreatingNewWallet?: boolean,
  mnemonic: string,
  privateKey?: string,
  navigation: NavigationScreenProp<NavigationState>,
  password: string,
}

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

    onLogin()
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

export default withLogin(WalletBackupContainer)
