/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import type {
  NavigationScreenProp,
  NavigationState
} from 'react-navigation'
import AccountImportMethod, { type TAccountImportMethod } from '../screens/AccountImportMethod'

type TAccountImportMethodContainerProps = {
  navigation: NavigationScreenProp<NavigationState>
}

class AccountImportMethodContainer extends PureComponent<TAccountImportMethodContainerProps, {}> {
  handleCreateWallet = () => {
    this.props.navigation.navigate('SetAccountPassword')
  }

  handleSelectAccountImportMethod = ({ screen, title }: TAccountImportMethod) => () => {
    this.props.navigation.navigate(screen, { title })
  }

  render () {
    return (
      <AccountImportMethod
        accountImportMethods={accountImportMethods}
        onCreateWallet={this.handleCreateWallet}
        onSelectAccountImportMethod={this.handleSelectAccountImportMethod}
      />
    )
  }
}

export default AccountImportMethodContainer

const accountImportMethods: TAccountImportMethod[] = [
  {
    id: 'mnemonic',
    screen: 'EnterMnemonic',
    title: 'Enter mnemonic',
    label: I18n.t('ImportAccount.mnemonic'),
    image: require('../images/mnemonic.png')
  },
  {
    id: 'privateKey',
    screen: 'EnterPrivateKey',
    title: 'Enter private key',
    label: I18n.t('ImportAccount.privateKey'),
    image: require('../images/private-key.png')
  }
]
