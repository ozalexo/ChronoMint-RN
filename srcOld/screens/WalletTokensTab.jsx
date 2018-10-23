/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

//#region imports

import React, { PureComponent } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import colors from '../utils/colors'

//#endregion

//#region types

export type TToken = {
  [symbol: string]: number,
}

export type TTokenList = TToken[]

export type TWalletTokensProps = {
  blockchain: string,
  selectedCurrency: string,
  tokens: TTokenList,
}

type TTokenProps = {
  blockchain: string,
  selectedCurrency: string,
  token: TToken,
}

//#endregion

export default class WalletTokens extends PureComponent<TWalletTokensProps> {
  keyExtractor = (token: TToken, index: number) => '' + Object.keys(token)[0] + '_' + index

  renderItem = ({ item }: { item: TToken }) =>
    (
      <Token
        blockchain={this.props.blockchain}
        selectedCurrency={this.props.selectedCurrency}
        token={item}
      />
    )

  render () {
    return (
      <View style={{marginTop: -8, paddingBottom: 10}}>
        <FlatList
          data={this.props.tokens}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          style={styles.list}
        />
      </View>
    )
  }
}

const tokenImages = {
  'Ethereum': require('../images/coin-ethereum-small.png'),
  'NEM': require('../images/coin-nem-small.png'),
}

class Token extends PureComponent<TTokenProps, {}> {
  render () {
    const symbol = Object.keys(this.props.token)[0]
    const amount = Object.values(this.props.token)[0]
    return (
      <View style={styles.token}>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={tokenImages[this.props.blockchain]}
            style={styles.image}
          />
          <Text style={styles.value}>
            { symbol }
            &nbsp;
            { amount.toFixed(2) }
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.balance}>
            { this.props.selectedCurrency }
            &nbsp;
            { '0.00' }
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  balance: {
    fontWeight: '200',
    margin: 8,
  },
  image: {
    height: 32,
    margin: 8,
    width: 32,
  },
  list: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  token: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 3,
    flexDirection: 'row',
    margin: 8,
    padding: 8,
  },
  value: {
    fontWeight: '700',
    margin: 8,
  },
})

