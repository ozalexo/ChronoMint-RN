/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { type Dispatch } from 'redux'
import { connect } from 'react-redux'
import type {
  NavigationScreenProp,
  NavigationState
} from 'react-navigation'
import SelectAccount, { type TAccount } from '../screens/SelectAccount'
import {
  initImportMethodsPage
} from '@chronobank/login/redux/network/actions'

type TSelectAccountContainerProps = {
  navigation: NavigationScreenProp<NavigationState>,
  storedAccounts: any,
  initImportMethodsPage(): void
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  initImportMethodsPage: () => dispatch(initImportMethodsPage())
})

class SelectAccountContainer extends PureComponent<TSelectAccountContainerProps, {}> {

  handleCreateWallet = () => {
    this.props.navigation.navigate('SetAccountPassword')
  }

  handleImportAccount = () => {
    this.props.initImportMethodsPage()
    this.props.navigation.navigate('AccountImportMethod')
  }

  handleSelectAccount = (account: TAccount) => () => {
    this.props.navigation.navigate('AccountPassword', { account })
  }

  render () {
    const accountList = this.props.storedAccounts
    const accounts = accountList ? accountList.toArray() : []
    return (
      <SelectAccount
        accounts={accounts}
        onCreateWallet={this.handleCreateWallet}
        onImportAccount={this.handleImportAccount}
        onSelectAccount={this.handleSelectAccount}
      />
    )
  }
}

export default connect(null, mapDispatchToProps)(SelectAccountContainer)
