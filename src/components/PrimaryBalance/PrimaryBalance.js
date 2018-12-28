/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'
import isNumber from '../../common/utils/numeric'
import styles from './PrimaryBalanceStyles'

export default class PrimaryBalance extends PureComponent {

  static getFormattedBalance = (balance) => {
    let numberBalance
    if (!balance) {
      return ''
    } else {
      if (!isNumber(balance)) {
        if (balance instanceof BigNumber) {
          numberBalance = balance.toNumber()
        } else {
          return ''
        }
      } else {
        numberBalance = parseFloat(balance)
      }
  
      if (numberBalance > 0 && numberBalance < 0.01) {
        return '0.00+'
      } else {
        return numberBalance.toFixed(2)
      }
    }
  }

  render () {
    const {
      wallet,
    } = this.props
    const tokensList = wallet && Object.keys(wallet.tokens)[0]
    const balance = wallet && wallet.tokens[tokensList].balance

    const displayPrimaryBalanceText = [
      tokensList,
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
  wallet: PropTypes.shape({}),
  blockchain: PropTypes.string,
  selectedCurrency: PropTypes.string,
}
