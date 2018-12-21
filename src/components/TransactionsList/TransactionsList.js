/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  FlatList,
  Text,
  View,
} from 'react-native'
import { BLOCKCHAIN_ETHEREUM, ETHEREUM_PRIMARY_TOKEN } from '@chronobank/ethereum/constants'
import { BLOCKCHAIN_BITCOIN, BTC_PRIMARY_TOKEN } from '@chronobank/bitcoin/constants'
import moment from 'moment'
import PropTypes from 'prop-types'
import Separator from '../Separator'
import TransactionItem from '../TransactionItem'
import styles from './TransactionsListStyles'

const tokenSymbols = {
  [BLOCKCHAIN_BITCOIN]: BTC_PRIMARY_TOKEN,
  [BLOCKCHAIN_ETHEREUM]: ETHEREUM_PRIMARY_TOKEN,
}

export default class TransactionsList extends PureComponent {

  keyExtractor = (item, index) =>
    '' + item.address + '_' + item.blockNumber + '_' + index

  renderItem = ({item}) => {
    const { address, blockchain, navigation } = this.props
    const type = address === item.from ? 'sending' : 'receiving'
    const symbol = tokenSymbols[blockchain]

    return (
      <TransactionItem
        item={item}
        type={type}
        symbol={symbol}
        navigation={navigation}
      />
    )
  }


  render () {
    const {
      transactions,
      latestTransactionDate,
    } = this.props
    
    const lastTransactionDate = latestTransactionDate
      && moment.unix(latestTransactionDate).format('DD MMMM YYYY')
      || 'No date info available'

    const NoTransactionsExists = () => (
      <View style={styles.transactionsListContainer}>
        <Text style={styles.transactionsListTitle}>
          No transactions at the moment.
        </Text>
      </View>
    )

    const LoadedTransactions = () => {
      return (
        <View style={styles.transactionsListContainer}>
          <Text style={styles.transactionsListTitle}>
            {
              lastTransactionDate
            }
          </Text>
          <Separator />
          <FlatList
            data={transactions}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>
      )
    }

    if (transactions && transactions.length) {
      return (<LoadedTransactions />)
    } else {
      return (<NoTransactionsExists />)
    }
  }
}

TransactionsList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  latestTransactionDate: PropTypes.number,
  blockchain: PropTypes.string,
  address: PropTypes.string,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
      balance: PropTypes.string,
      confirmations: PropTypes.number,
    })
  ),
}
