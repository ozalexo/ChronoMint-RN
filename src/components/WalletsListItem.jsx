/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent, type ComponentType } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import isNumber from '../utils/numeric'
import PrimaryBalanceContainerFactory, {
  type TPrimaryBalanceFactoryProps,
  type TPrimaryBalanceProps,
} from '../containers/PrimaryBalanceContainerFactory'
import PrimaryTokenContainerFactory, {
  type TPrimaryTokenFactoryProps,
  type TPrimaryTokenProps,
} from '../containers/PrimaryTokenContainerFactory'
import styles from './styles/WalletListItemStyles'
import TokensListContainerFactory, {
  type TTokensListProps,
  type TTokensListFactoryProps,
} from '../containers/TokensListContainerFactory'
import WalletImage from '../components/WalletImage'

type TPrices = {
  [token: string]: {
    [currency: string]: number
  }
}
type TCalculatedToken = TPrices[]
export type TCalculatedTokenCollection = TCalculatedToken[]
export type TWalletsListItemProps = {
  address: string,
  blockchain: string,
  selectedCurrency: string,
  onItemPress(): void,
}

const Transactions = ({ transactions }) => !transactions ? null : (
  !transactions[1] ? (
    <Image
      source={require('../images/indicator-receiving-0.png')}
    />
  ) : (
    <View style={styles.transactionsNumberContainer}>
      <Text style={styles.transactionsNumber}>
        {transactions.length}
      </Text>
    </View>
  )
)

class TokensCounter extends PureComponent<TTokensListProps> {

  render () {
    const tokensLength = this.props.list.length - 1
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

class PrimaryToken extends PureComponent<TPrimaryTokenProps> {

  static getFormattedBalance = (balance: ?number) =>  {
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

class PrimaryBalance extends PureComponent<TPrimaryBalanceProps> {

  static getFormattedBalance = (balance: ?number) =>  {
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

const TokensListContainer: ComponentType<TTokensListFactoryProps> = TokensListContainerFactory(TokensCounter)
const PrimaryTokenContainer: ComponentType<TPrimaryTokenFactoryProps> = PrimaryTokenContainerFactory(PrimaryToken)
const PrimaryBalanceContainer: ComponentType<TPrimaryBalanceFactoryProps> = PrimaryBalanceContainerFactory(PrimaryBalance)

export default class WalletsListItem extends PureComponent<TWalletsListItemProps> {

  handleOnPress = () => {
    this.props.onItemPress()
  }

  render () {
    const {
      address,
      blockchain,
      selectedCurrency,
    } = this.props

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.handleOnPress}
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
