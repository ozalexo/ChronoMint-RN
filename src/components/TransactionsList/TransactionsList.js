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
import BigNumber from 'bignumber.js'
import { BLOCKCHAIN_ETHEREUM, ETH_PRIMARY_TOKEN } from '@chronobank/ethereum/constants'
import { BLOCKCHAIN_BITCOIN, BTC_PRIMARY_TOKEN } from '@chronobank/bitcoin/constants'
import moment from 'moment'
import isNumber from '../../common/utils/numeric'
import PropTypes from 'prop-types'
import i18n from '../../locales/translation'
import Separator from '../Separator'
import TransactionIcon from '../TransactionIcon'
import styles from './TransactionsListStyles'

const tokenSymbols = {
  [BLOCKCHAIN_BITCOIN]: BTC_PRIMARY_TOKEN,
  [BLOCKCHAIN_ETHEREUM]: ETH_PRIMARY_TOKEN,
}

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

  renderItem = ({item}) => {
    const { address, blockchain, navigation } = this.props
    const type = address.toLowerCase() === item.from.toLowerCase()
      ? 'sending'
      : 'receiving'
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
      mainWalletTransactionLoadingStatus,
      latestTransactionDate,
    } = this.props
    
    let lastTransactionDate
    if (!latestTransactionDate) {
      lastTransactionDate = 'No date info available'
    } else {
      if (latestTransactionDate.toString().length > 10) {
        lastTransactionDate = latestTransactionDate
          && moment(latestTransactionDate).format('DD MMMM YYYY')
          || 'No date info available'
      } else {
        lastTransactionDate = latestTransactionDate
          && moment.unix(latestTransactionDate).format('DD MMMM YYYY')
          || 'No date info available'
      }
    }

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
        if (transactions && transactions.length) {
          return (<LoadedTransactions />)
        } else {
          return (<NoTransactionsExists />)
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
      balance: PropTypes.string,
      confirmations: PropTypes.number,
    })
  ),
  refreshTransactionsList: PropTypes.func,
}

class TransactionItem extends PureComponent {

  static getFormattedBalance = (balance, symbol, type) => {
    if (!balance) {
      return ''
    }
    let numBalance
    if (isNumber(balance)) {
      numBalance = balance
    } else {
      if (balance instanceof BigNumber) {
        numBalance = balance.toNumber()
      } else {
        numBalance = parseInt(balance)
      }
    }
    const isbalanceTooSmall = numBalance > 0 && numBalance < 0.01
    let format = isbalanceTooSmall ? '%u%n+' : '%u%n  '
    format = [
      (type === 'sending' ? '-' : '+'),
      format,
    ].join(' ')

    return i18n.toCurrency(numBalance, { precision: 2, unit: ` ${symbol} `, format })

  }

  handleTransactionClick = () => {
    // const {
    //   address,
    //   balance,
    //   blockNumber,
    //   confirmations,
    //   fee,
    //   blockchain,
    //   txDate,
    //   type,
    // } = props.item
  }

  render () {
    const { type, symbol, item/*, navigation*/ } = this.props
    const {
      from,
      to,
      confirmations,
      balance,
    } = item

    const address = type === 'sending' ? to : from


    const transactionStyle = type === 'sending'
      ? styles.sending
      : styles.receiving

    const tType = i18n.t(['TransactionsList', type])

    return (
      <TouchableWithoutFeedback
        onPress={this.handleTransactionClick}
      >
        <View style={styles.item}>
          <Separator />
          <View style={styles.leftPart}>
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
          </View>
          <Text style={transactionStyle}>
            {
              TransactionItem.getFormattedBalance(balance, symbol, type)
            }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

TransactionItem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  latestTransactionDate: PropTypes.number,
  blockchain: PropTypes.string,
  address: PropTypes.string,
  item: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
    balance: PropTypes.string,
    confirmations: PropTypes.number,
  }),
  symbol: PropTypes.string,
  type: PropTypes.oneOf(['receiving', 'sending']),
}
