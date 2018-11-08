/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import textConstants from '../../locales/en'
import moment from 'moment'
import PropTypes from 'prop-types'
import Separator from '../Separator'
import TransactionIcon from '../TransactionIcon'
import styles from './TransactionsListStyles'


export default class TransactionsList extends PureComponent {

  componentDidMount () {
    const trLoadingStatus = this.props.mainWalletTransactionLoadingStatus
    if (!trLoadingStatus.isFetching &&
      !trLoadingStatus.isInited
    ) {
      this.props.refreshTransactionsList()
    }
  }

  keyExtractor = (item, index) =>
    '' + item.address + '_' + item.blockNumber + '_' + index

  renderItem = (item) => <TransactionItem {...item} navigator={this.props.navigator} />


  render () {
    const {
      transactions,
      mainWalletTransactionLoadingStatus,
      latestTransactionDate,
      refreshTransactionsList,
    } = this.props

    const lastTransactionDate = latestTransactionDate
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
      return (<TransactionsLoading />)
    } else {
      if (mainWalletTransactionLoadingStatus.isInited) {
        if (mainWalletTransactionLoadingStatus.isFetched) {
          if (transactions && transactions.length) {
            return (<LoadedTransactions />)
          } else {
            return (<NoTransactionsExists />)
          }
        }
      } else {
        return (<TransactionsLoading />)
      }
    }
  }
}

TransactionsList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
      amount: PropTypes.number,
      confirmations: PropTypes.number,
      symbol: PropTypes.string,
      type: PropTypes.oneOf(['receiving', 'sending']),
    })
  ),
  refreshTransactionsList: PropTypes.func,
}

class TransactionItem extends PureComponent {

  static getFormattedBalance = (amount, symbol, type) => {
    const isAmountTooSmall = amount > 0 && amount < 0.01
    let format = isAmountTooSmall ? '%u%n+' : '%u%n '
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
    } = props.item
    
    // commented untill TransactionDetails screen
    // props.navigator.push({
    //   screen: 'TransactionDetails',
    //   passProps: {
    //     address,
    //     amount,
    //     blockNumber,
    //     confirmations,
    //     fee,
    //     symbol,
    //     txDate,
    //     type,
    //   },
    // })
  }

  render () {
    const {
      address,
      confirmations,
      symbol,
      type,
      amount,
    } = this.props.item

    const transactionStyle = type === 'sending'
      ? styles.sending
      : styles.receiving

    const tType = textConstants.TransactionsList[type]

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

TransactionItem.propTypes = {
  item: PropTypes.shape({
    address: PropTypes.string,
    amount: PropTypes.number,
    confirmations: PropTypes.number,
    symbol: PropTypes.string,
    type: PropTypes.oneOf(['receiving', 'sending']),
  }),
}
