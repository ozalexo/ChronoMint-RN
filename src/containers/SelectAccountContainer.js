/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import SelectAccount, { type TAccount } from '../screens/SelectAccount'
import withLogin from '../components/withLogin'

type TSelectAccountContainerProps = {
  navigator: any,
  storedAccounts: any,
}

class SelectAccountContainer extends PureComponent<TSelectAccountContainerProps, {}> {
  handleCreateWallet = () => {
    this.props.navigator.resetTo({ screen: 'CreateAccount' })
  }

  handleImportAccount = () => {
    this.props.navigator.push({
      screen: 'AccountImportMethod',
      title: I18n.t('ImportAccount.title')
    })
  }

  handleSelectAccount = (account: TAccount) => () => {
    this.props.navigator.push({
      screen: 'AccountPassword',
      title: 'Enter account password',
      passProps: {
        account
      }
    })
  }

  render () {
    return (<SelectAccount
      accounts={this.props.storedAccounts.toArray()}
      onCreateWallet={this.handleCreateWallet}
      onImportAccount={this.handleImportAccount}
      onSelectAccount={this.handleSelectAccount}
    />)
  }
}

export default withLogin(SelectAccountContainer)
