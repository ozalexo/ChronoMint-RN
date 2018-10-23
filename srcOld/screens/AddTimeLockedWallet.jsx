/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import SectionHeader from '../components/SectionHeader'
import Separator from '../components/Separator'
import colors from '../utils/colors'

export default class AddTimeLockedWallet extends PureComponent<{}, {}> {
  render () {
    return (
      <View style={styles.screenView}>
        <TextInput
          style={styles.walletName}
          placeholder='Wallet Name'
          placeholderTextColor='#7F7F7F'
        />
        <SectionHeader title='Time lock settings' />
        <View style={styles.selector}>
          <Text style={styles.selectorLabel}>Date:&nbsp;</Text>
          <Text style={styles.selectorValue}>20-02-2018</Text>
          <Image
            source={require('../images/chevron-down.png')} 
            style={styles.selectorImage}
          />
        </View>
        <Separator />
        <View style={styles.selector}>
          <Text style={styles.selectorLabel}>Time:&nbsp;</Text>
          <Text style={styles.selectorValue}>10:30 PM</Text>
          <Image
            source={require('../images/chevron-down.png')}
            style={styles.selectorImage}
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Make this wallet active for transactions on specific date and time.
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  description: {
    fontSize: 13,
  },
  descriptionContainer: {
    backgroundColor: '#EFEFF3',
    borderTopColor: '#C7C7CC',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  screenView: {
    backgroundColor: colors.background,
    flex: 1,
    paddingVertical: 10,
  },
  selector: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectorImage: {
    tintColor: '#C7C7CC',
  },
  selectorLabel: {
    color: '#7F7F7F',
    fontSize: 16,
  },
  selectorValue: {
    flex: 1,
    fontSize: 16,
    fontWeight: '200',
  },
  walletName: {
    borderBottomColor: '#EFEFF3',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 16,
    padding: 20,
    paddingBottom: 10,
  },
})
