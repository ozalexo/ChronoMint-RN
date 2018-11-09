/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import textConstants from '../../locales/en'
import AccountImportMethod from './AccountImportMethod'
import {mnemonic, private_key} from '../../images'

class AccountImportMethodContainer extends PureComponent {
  handleCreateWallet = () => {
    const {navigate} = this.props.navigation
    navigate('SetAccountPassword')
  }

  handleSelectAccountImportMethod = ({ screen, title }) => () => {
    const { navigate } = this.props.navigation
    navigate(screen)
  }

  render() {
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

const accountImportMethods= [
  {
    id: 'mnemonic',
    screen: 'EnterMnemonic',
    title: 'Enter mnemonic',
    label: textConstants.ImportAccount.mnemonic,
    image: mnemonic
  },
  {
    id: 'privateKey',
    screen: 'EnterPrivateKey',
    title: 'Enter private key',
    label: textConstants.ImportAccount.privateKey,
    image: private_key
  }
]
