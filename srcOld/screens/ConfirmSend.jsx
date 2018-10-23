/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import LabeledItem from '../components/LabeledItem'
import colors from '../utils/colors'

type TConfirmSendProps = {
  amountToSend: {
    currency: number,
    token: number,
  },
  balance: {
    currency: number,
    token: number,
  },
  currentToken: string,
    fee: {
      currency: number,
      token: number,
    },
  recipientAddress: string,
  selectedCurrency: string,
}

export default class ConfirmSend extends React.PureComponent<TConfirmSendProps, {}> {
  render () {
    const {
      amountToSend,
      balance,
      currentToken,
      fee,
      recipientAddress,
      selectedCurrency,
    } = this.props

    return (
      <View style={styles.container}>
        <LabeledItem
          labelText='Send To'
        >
          <Text>
            {
              recipientAddress
            }
          </Text>
        </LabeledItem>
        <LabeledItem
          labelText={`${currentToken} ${amountToSend.token}`}
          labelType='currencyColored'
        >
          <Text style={styles.lightGreyText}>
            {
              `${selectedCurrency} ${amountToSend && amountToSend.currency && amountToSend.currency.toFixed(2)}`
            }
          </Text>
        </LabeledItem>
        <LabeledItem
          labelText='Fee'
        >
          <Text>
            {
              `${currentToken} ${fee.token}`
            }
            <Text style={styles.lightGreyText}>
              {
                ` (${selectedCurrency} ${fee && fee.currency && fee.currency.toFixed(2)})`
              }
            </Text>
          </Text>
        </LabeledItem>
        <LabeledItem
          labelText='Balance'
        >
          <Text>
            {
              `${currentToken}  ${balance.token}`
            }
            <Text style={styles.lightGreyText}>
              {
                ` (${selectedCurrency} ${balance && balance.currency && balance.currency.toFixed(2)})`
              }
            </Text>
          </Text>
        </LabeledItem>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingTop: 40, // why not 20? Dunno, there is 40 in prototype.
  },
  lightGreyText: {
    color: colors.greySub,
  },
})
