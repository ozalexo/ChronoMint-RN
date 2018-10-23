/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

//#region imports

import React, { PureComponent } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import moment from 'moment'
import Separator from './Separator'
import styles from './styles/TransactionsListStyles'
import TransactionIcon, { type TTransactionType } from './TransactionIcon'

//#endregion

//#region types

export type TWalletTransaction = {
  address: string,
  amount: number,
  confirmations: number,
  symbol: string,
  type: TTransactionType,
  blockNumber: any,
  navigator: any,
}

export type TWalletTransactionList = TWalletTransaction[]

export type TTransactionsListProps = {
  transactions: TWalletTransactionList,
  mainWalletTransactionLoadingStatus: any,
  latestTransactionDate: any,
  refreshTransactionsList(): void,
  navigator: any,
}

type TTransactionsListState = {}

type TTransactionItemState = {}

//#endregion

export default class TransactionsList extends PureComponent<TTransactionsListProps, TTransactionsListState> {

  componentDidMount () {
    const trLoadingStatus = this.props.mainWalletTransactionLoadingStatus
    if (!trLoadingStatus.isFetching &&
      !trLoadingStatus.isInited
    ) {
      this.props.refreshTransactionsList()
    }
  }

  keyExtractor = (item: TWalletTransaction, index: number) =>
    '' + item.address + '_' + item.blockNumber + '_' + index

  renderItem = ({ item }: { item: TWalletTransaction } ) => <TransactionItem {...item} navigator={this.props.navigator} />

  // eslint-disable-next-line complexity
  render () {

    const {
      transactions,
      mainWalletTransactionLoadingStatus,
      latestTransactionDate,
      refreshTransactionsList,
    } = this.props

    const lastTransactionDate: string = latestTransactionDate
      && moment(latestTransactionDate).format('DD MMMM YYYY')
      || 'No date info available'

    const TransactionsLoading = () => (
      <View style={styles.transactionsListContainer}>
        <Text style={styles.transactionsListTitle}>
            Loading Transactions ...
        </Text>
        <Separator />
        <ActivityIndicator />
      </View>
    )

    const NoTransactionsExists = () => (
      <View style={styles.transactionsListContainer}>
        <Text style={styles.transactionsListTitle}>
            No transactions at the moment.
        </Text>
      </View>
    )

    /** This code block temporary disabled */
    // const RefreshTransactions = () => (
    //   <View style={styles.transactionsListContainer}>
    //     <TouchableOpacity
    //       onPress={refreshTransactionsList}
    //       style={styles.refreshTouch}
    //     >
    //       <Text style={styles.refreshText}>
    //         No transactions available. Tap to refresh.
    //       </Text>
    //       <View style={styles.refreshImage}>
    //         <Image
    //           source={require('../images/temporary-reload-icon.png')}
    //         />
    //       </View>
    //     </TouchableOpacity>
    //   </View>
    // )

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

    // FIXME: [AO] in some conditions it can return null
    if (mainWalletTransactionLoadingStatus.isFetching) {
      return ( <TransactionsLoading /> )
    } else {
      if (mainWalletTransactionLoadingStatus.isInited) {
        if (mainWalletTransactionLoadingStatus.isFetched) {
          if (transactions && transactions.length) {
            return ( <LoadedTransactions /> )
          } else {
            return (<NoTransactionsExists /> )
          }
        }
      } else {
        return ( <TransactionsLoading /> )
      }
    }
  }
}

class TransactionItem extends PureComponent<TWalletTransaction, TTransactionItemState> {

  static getFormattedBalance = (amount: ?number, symbol: string, type: string) =>  {
    const isAmountTooSmall = amount > 0 && amount < 0.01
    let format = isAmountTooSmall ? '%u%n+': '%u%n '
    format = [
      (type === 'sending' ? '-' : '+'),
      format,
    ].join(' ')

    return I18n.toCurrency(amount, { precision: 2, unit: ` ${symbol} `, format })

  }

  goToTx = (props) => {
    const {
      address,
      amount,
      blockNumber,
      confirmations,
      fee,
      symbol,
      txDate,
      type,
    } = props

    props.navigator.push({
      screen: 'TransactionDetails',
      passProps: {
        address,
        amount,
        blockNumber,
        confirmations,
        fee,
        symbol,
        txDate,
        type,
      },
    })
  }

  render () {
    const {
      address,
      confirmations,
      symbol,
      type,
      amount,
    } = this.props

    const transactionStyle = type === 'sending'
      ? styles.sending
      : styles.receiving

    const tType = I18n.t(`TransactionsList.${type}`)

    return (
      <TouchableWithoutFeedback
        onPress={() => this.goToTx(this.props)}
      >
        <View style={styles.item}>
          <TransactionIcon
            type={type}
            confirmations={confirmations}
          />
          <Text
            style={styles.itemText}
            ellipsizeMode='middle'
            numberOfLines={2}
          >
            {
              tType
            }
            {'\n'}
            {
              address
            }
          </Text>
          <Text style={transactionStyle}>
            {
              TransactionItem.getFormattedBalance(amount, symbol, type)
            }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

