/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import withLogin, { type TWithLoginProps } from '../components/withLogin'
import WalletBackup from '../screens/WalletBackup'

type TWalletBackupContainerProps = TWithLoginProps & {
  isCreatingNewWallet?: boolean,
  mnemonic: string,
  privateKey?: string,
  navigator: any,
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
      navigator
    } = this.props

    let mnemonic = this.props.mnemonic || generateMnemonic()

    if (isCreatingNewWallet) {
      return navigator.push({
        screen: 'GenerateMnemonic',
        title: I18n.t('GenerateMnemonic.title'),
        passProps: {
          mnemonic,
          privateKey,
          password
        }
      })
    }

    if (usePinProtection) {
      return navigator.push({
        screen: 'EnterPin',
        title: 'Enter PIN',
        passProps: {
          mnemonic,
          privateKey,
          password
        }
      })
    }

    onLogin()
  }

  render () {
    return (<WalletBackup
      onDone={this.handleDone}
      onLater={this.props.onLogin}
      onSwitchUsePinProtection={this.props.onSetUsePinProtection}
      usePinProtection={this.props.usePinProtection}
    />)
  }
}

export default withLogin(WalletBackupContainer)
