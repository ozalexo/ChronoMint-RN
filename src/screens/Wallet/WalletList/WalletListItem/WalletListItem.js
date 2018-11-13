/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import PropTypes from 'prop-types'
// import PrimaryBalanceContainerFactory from '../containers/PrimaryBalanceContainerFactory'
// import PrimaryTokenContainerFactory from '../containers/PrimaryTokenContainerFactory'
// import TokensListContainerFactory from '../containers/TokensListContainerFactory'
import isNumber from '../../../../common/utils/numeric'
import {
  indicator_receiving_0,
} from '../../../../images'
import WalletImage from './WalletImage'
import styles from './WalletListItemStyles'

const Transactions = ({ transactions }) => !transactions ? null : (
  !transactions[1] ? (
    <Image
      source={indicator_receiving_0}
    />
  ) : (
      <View style={styles.transactionsNumberContainer}>
        <Text style={styles.transactionsNumber}>
          {transactions.length}
        </Text>
      </View>
    )
)

class TokensCounter extends PureComponent {

  render () {
    const tokensLength = 2 // for testing
    // const tokensLength = this.props.list.length - 1
    if (!tokensLength) {
      return null
    }

    return (
      <Text style={styles.tokens}>
        {
          I18n.t('Tokens', { count: tokensLength, formatted_number: tokensLength })
        }
      </Text>
    )

  }
}

TokensCounter.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number,
      symbol: PropTypes.string,
    })
  )
}

class PrimaryToken extends PureComponent {

  static getFormattedBalance = (balance) => {
    if (!isNumber(balance)) {
      return '-.--'
    }

    // $FlowFixMe: balance has been verified above by isNumber. Now it is definitely a number.
    if (balance > 0 && balance < 0.0001) {
      return '0.0000+'
    } else {
      // $FlowFixMe: balance has been verified above by isNumber. Now it is definitely a number.
      return balance ? balance.toFixed(4) : balance.toFixed(2)
    }
  }

  render () {
    return (
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>
          {
            this.props.symbol
          }
        </Text>
        <Text style={[styles.balanceText, styles.balanceNumber]}>
          {
            PrimaryToken.getFormattedBalance(this.props.amount)
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

class PrimaryBalance extends PureComponent {

  static getFormattedBalance = (balance) => {
    if (!isNumber(balance)) {
      return '-.--'
    }

    // $FlowFixMe: balance has been verified above by isNumber. Now it is definitely a number.
    if (balance > 0 && balance < 0.01) {
      return '0.00+'
    } else {
      // $FlowFixMe: balance has been verified above by isNumber. Now it is definitely a number.
      return balance.toFixed(2)
    }

  }

  render () {

    const displayPrimaryBalanceText = [
      this.props.selectedCurrency,
      PrimaryBalance.getFormattedBalance(this.props.balance),
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


const TokensListContainer = TokensCounter
const PrimaryTokenContainer = PrimaryToken
const PrimaryBalanceContainer = PrimaryBalance
// const TokensListContainer = TokensListContainerFactory(TokensCounter)
// const PrimaryTokenContainer = PrimaryTokenContainerFactory(PrimaryToken)
// const PrimaryBalanceContainer = PrimaryBalanceContainerFactory(PrimaryBalance)

export default class WalletListItem extends PureComponent {

  render () {
    const {
      address,
      blockchain,
      selectedCurrency,
      onItemPress = () => { },
    } = this.props
    console.log(this.props)

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onItemPress}
      >
        <View>
          <View style={styles.transactions}>
            <Transactions transactions={[1]} />
          </View>
          <View style={styles.content}>
            <WalletImage
              blockchain={blockchain}
              style={styles.image}
            />
            <View style={styles.contentColumn}>
              <Text style={styles.title}>
                {
                  `My ${blockchain} Wallet`
                }
              </Text>
              <Text
                style={styles.address}
                ellipsizeMode='middle'
                numberOfLines={1}
              >
                {
                  address
                }
              </Text>
              <PrimaryTokenContainer
                blockchain={blockchain}
              />
              <View style={styles.balanceAndTokensRow}>
                <PrimaryBalanceContainer
                  blockchain={blockchain}
                  selectedCurrency={selectedCurrency}
                />
                <TokensListContainer
                  blockchain={blockchain}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

WalletListItem.propTypes = {
  address: PropTypes.string,
  blockchain: PropTypes.string,
  selectedCurrency: PropTypes.string,
  onItemPress: PropTypes.func,
}
