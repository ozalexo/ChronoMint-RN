/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import textConstants from '../../locales/en'
import ImportMethod from './ImportMethod'
import {mnemonic, private_key} from '../../images'

class ImportMethodContainer extends PureComponent {
  handleCreateWallet = () => {
    const {navigate} = this.props.navigation
    navigate('SetAccountPassword')
  }

  handleSelectImportMethod = ({ screen, title }) => () => {
    const { navigate } = this.props.navigation
    navigate(screen)
  }

  render() {
    return (
      <ImportMethod
        importMethodList={importMethodList}
        onCreateWallet={this.handleCreateWallet}
        onSelectImportMethod={this.handleSelectImportMethod}
      />
    )
  }
}

export default ImportMethodContainer

const importMethodList = [
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
