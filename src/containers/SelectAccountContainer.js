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
import SelectAccount, { type TAccount } from '../screens/SelectAccount'
import withLogin from '../components/withLogin'

type TSelectAccountContainerProps = {
  navigation: NavigationScreenProp<NavigationState>,
  storedAccounts: any,
}

class SelectAccountContainer extends PureComponent<TSelectAccountContainerProps, {}> {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerLeft: (
  //       <Button
  //         onPress={navigation.goBack()}
  //         title='+1'
  //         color='#fff'
  //       />
  //     )
  //   }
  // }

  handleCreateWallet = () => {
    this.props.navigation.navigate('SetAccountPassword')
  }

  handleImportAccount = () => {
    this.props.navigation.navigate('AccountImportMethod')
    // this.props.navigator.push({
    //   screen: 'AccountImportMethod',
    //   title: I18n.t('ImportAccount.title')
    // })
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
