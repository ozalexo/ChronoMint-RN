/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import i18n from '../../../locales/translation'
import { mnemonic, private_key } from '../../../images'
import ImportMethod from './ImportMethod'

class ImportMethodContainer extends PureComponent {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  handleCreateWallet = () => {
    const { navigate } = this.props.navigation
    navigate('StartPage')
  }

  handleSelectImportMethod = ({ screen }) => () => {
    const { navigate } = this.props.navigation
    navigate(screen)
  }

  render () {
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

const importMethodList= [
  {
    id: 'mnemonic',
    screen: 'EnterMnemonic',
    title: 'Enter mnemonic',
    label: i18n.t('ImportAccount.mnemonic'),
    image: mnemonic,
  },
  {
    id: 'privateKey',
    screen: 'EnterPrivateKey',
    title: 'Enter private key',
    label: i18n.t('ImportAccount.privateKey'),
    image: private_key,
  },
]
