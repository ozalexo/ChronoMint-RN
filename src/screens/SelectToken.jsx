/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  ListView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import styles from './styles/SelectTokenStyles'

export type TSelectTokenProps = {
  tokens: any[],
  onPressAction(token: any): void,
  navigator: any,
}
export type TSelectTokenState = {}

export default class SelectToken extends PureComponent<TSelectTokenProps, TSelectTokenState> {

  constructor (props: TSelectTokenProps) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    const { tokens } = props
    const tokensArray = tokens
      .map( (token) => {
        const symbol = Object.keys(token)[0]
        const amount = token[symbol].amount
        return {
          symbol,
          amount,
        }
      } )
    this.state = {
      tokens: ds.cloneWithRows(tokensArray),
    }
  }

  handlePress = (rowData) => {
    this.props.onPressAction(rowData)
    this.props.navigator.pop()
  }

  renderRow = (rowData) => {
    const notEnoughAmount = rowData.amount ? null : styles.zeroAmount
    return (
      <TouchableOpacity onPress={() => this.handlePress(rowData)}>
        <View style={styles.tokenSelector}>
          <Text
            style={[
              styles.tokenSelectorLabel,
              styles.symbolColumn,
            ]}
          >
            {
              rowData.symbol
            }
          </Text>

          <Text
            style={[
              styles.tokenSelectorLabel,
              styles.amountColumn,
              notEnoughAmount,
            ]}
          >
            {
              rowData.amount?.toFixed(2)
            }
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    const { tokens } = this.state

    return (
      <ListView
        style={styles.container}
        dataSource={tokens}
        renderRow={this.renderRow}
      />
    )
  }
}
