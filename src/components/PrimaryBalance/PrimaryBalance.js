/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import isNumber from '../../common/utils/numeric'
import styles from './PrimaryBalanceStyles'

export default class PrimaryBalance extends PureComponent {

  static getFormattedBalance = (balance) => {
    if (!isNumber(balance)) {
      return '-.--'
    }

    if (balance > 0 && balance < 0.01) {
      return '0.00+'
    } else {
      return balance.toFixed(2)
    }

  }

  render () {
    const { selectedCurrency, balance } = this.props

    const displayPrimaryBalanceText = [
      selectedCurrency,
      PrimaryBalance.getFormattedBalance(balance),
    ].join(' ')

    return (
      <Text style={styles.tokens}>
        {
          displayPrimaryBalanceText
        }
      </Text>
    )
  }
}

PrimaryBalance.propTypes = {
  balance: PropTypes.number,
  selectedCurrency: PropTypes.string,
}
