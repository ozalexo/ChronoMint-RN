/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  View,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import isNumber from '../../common/utils/numeric'
import styles from './PrimaryTokenStyles'


export default class PrimaryToken extends PureComponent {

  static getFormattedBalance = (balance) => {
    if (!isNumber(balance)) {
      return '-.--'
    }

    if (balance > 0 && balance < 0.0001) {
      return '0.0000+'
    } else {
      return balance ? balance.toFixed(4) : balance.toFixed(2)
    }
  }

  render () {
    const { symbol, amount } = this.props
    return (
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>
          {
            symbol
          }
        </Text>
        <Text style={[styles.balanceText, styles.balanceNumber]}>
          {
            PrimaryToken.getFormattedBalance(amount)
          }
        </Text>
      </View>
    )
  }
}

PrimaryToken.propTypes = {
  amount: PropTypes.number,
  symbol: PropTypes.string,
}
