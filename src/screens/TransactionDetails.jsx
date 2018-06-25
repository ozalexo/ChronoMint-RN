/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  Text,
  View
} from 'react-native'
import LabeledItem from '../components/LabeledItem'
import styles from '../screens/styles/TransactionDetailsStyles'
import TransactionIcon, { type TTransactionType, type TIconMode } from '../components/TransactionIcon'

type TTransactionDetailsProps = {
  address: string,
  amount: number,
  blockNumber: number,
  confirmations: number,
  fee: number,
  symbol: string,
  txDate: number,
  type: TTransactionType,
  navigator: any,
}

export default class TransactionDetails extends PureComponent<TTransactionDetailsProps, {}> {
  constructor (props: TTransactionDetailsProps) {
    super(props)
    this.props.navigator.setTitle({ title: `${props.type === 'sending' ? 'Sending Funds' : 'Receiving Funds'}` })
  }
  render () {
    const {
      address,
      amount,
      blockNumber,
      confirmations,
      fee,
      symbol,
      txDate,
      type
    } = this.props

    const iconMode: TIconMode = 'small'

    const Estimation = (confirmations, blockchain) => {
      /* Ivan Abdulov [15:13]
        btc/ltc/bcc/btg - ~10m per 1 confirm
        eth/erc20 - ~30s per 1 confirm */

    }

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.icon}>
            <TransactionIcon
              type={type}
              confirmations={confirmations}
              mode={iconMode}
            />
          </View>
          <LabeledItem
            labelText={type === 'sending' ? 'Send To' : 'Receiving from'}
          >
            <Text>
              {
                address
              }
            </Text>
          </LabeledItem>
        </View>
        <LabeledItem
          labelText={`${symbol} ${amount}`}
          labelType='currencyColored'
        >
          {/*
          <Text style={styles.lightGreyText}>
            {
              `${selectedCurrency} ${amountToSend.currency.toFixed(2)}`
            }
          </Text>
          */}
        </LabeledItem>
        <LabeledItem
          labelText='Fee'
        >
          <Text>
            {
              `${symbol} ${fee.toFixed(6)}`
            }
            {/*
            <Text style={styles.lightGreyText}>
              {
                ` (${selectedCurrency} ${fee.currency.toFixed(2)})`
              }
            </Text>
            */}
          </Text>
        </LabeledItem>
        {/*
        <LabeledItem
          labelText='Balance'
        >
          <Text>
            {
              `${symbol}  ${balance.token}`
            }
            <Text style={styles.lightGreyText}>
              {
                ` (${selectedCurrency} ${balance.currency.toFixed(2)})`
              }
            </Text>
          </Text>
        </LabeledItem>
        */}
      </View>
    )
  }
}
