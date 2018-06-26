/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import {
  ScrollView,
} from 'react-native'
import styles from './styles/WalletTransactionsStyles'
import TransactionsListContainer from '../containers/TransactionsListContainer'
import WalletInfoContainer from '../containers/WalletInfoContainer'

export type TWalletTransactionsProps = {
  navigator: any,
}

export default class WalletTransactions extends PureComponent<TWalletTransactionsProps> {

  render () {
    return (
      <ScrollView style={styles.mainSection}>
        <WalletInfoContainer />
        <TransactionsListContainer navigator={this.props.navigator} />
      </ScrollView>
    )
  }
}
