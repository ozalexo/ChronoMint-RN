/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import BigNumber from 'bignumber.js'
import isNumber from '../../common/utils/numeric'
import PropTypes from 'prop-types'
import i18n from '../../locales/translation'
import Separator from '../Separator'
import TransactionIcon from '../TransactionIcon'
import styles from './TransactionItemStyles'

export default class TransactionItem extends PureComponent {

  static getFormattedBalance = (balance, symbol, type) => {
    if (!balance) {
      return '-.--'
    }
    let numBalance
    if (isNumber(balance)) {
      numBalance = balance
    } else {
      if (balance instanceof BigNumber) {
        numBalance = balance.toNumber()
      } else {
        numBalance = parseFloat(balance)
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
