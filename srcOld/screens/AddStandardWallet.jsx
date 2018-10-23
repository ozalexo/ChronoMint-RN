/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import colors from '../utils/colors'

export default class AddStandardWallet extends PureComponent<{}, {}> {  
  render () {
    return (
      <View style={styles.screenView}>
        <TextInput
          style={styles.walletName}
          placeholder='Wallet Name'
          placeholderTextColor='#7F7F7F'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screenView: {
    backgroundColor: colors.background,
    flex: 1,
    paddingVertical: 10,
  },
  walletName: {
    borderBottomColor: '#EFEFF3',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 16,
    padding: 20,
  },
})
