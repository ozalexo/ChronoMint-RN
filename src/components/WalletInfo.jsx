/* Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent, type ComponentType } from 'react'
import {
  Text,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import PrimaryBalanceContainerFactory, {
  type TPrimaryBalanceFactoryProps,
  type TPrimaryBalanceProps,
} from '../containers/PrimaryBalanceContainerFactory'
import TokensListContainerFactory, {
  type TTokensListProps,
  type TTokensListFactoryProps,
} from '../containers/TokensListContainerFactory'
import PrimaryTokenContainerFactory, {
  type TPrimaryTokenFactoryProps,
  type TPrimaryTokenProps,
} from '../containers/PrimaryTokenContainerFactory'
import WalletImage from './WalletImage'
import styles from './styles/WalletInfoStyles'
import isNumber from '../utils/numeric'

export type TWalletInfoProps = {
  address: string,
  blockchain: string,
  selectedCurrency: string,
}

class TokensCounter extends PureComponent<TTokensListProps> {

  render () {
    const tokensLength = this.props.list.length - 1
    if (!tokensLength) {
      return null
    }

    return (
      <Text style={styles.walletDetails}>
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

    const prBlanaceText = [
      this.props.symbol,
      PrimaryToken.getFormattedBalance(this.props.amount),
    ].join(' ')

    return (
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>
          {
            prBlanaceText
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
      <Text style={styles.walletDetails}>
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

export default class WalletInfo extends PureComponent<TWalletInfoProps> {
  render () {
    const {
      address,
      blockchain,
      selectedCurrency,
    } = this.props
    return (
      <View style={styles.walletDetailsSection}>
        <WalletImage
          blockchain={blockchain}
          imageStyle={styles.walletImageIcon}
          shapeStyle={styles.walletImageShape}
          size='big'
        />
        <Text style={styles.address}>
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
    )
  }
}
