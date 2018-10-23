/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import Separator from '../components/Separator'
import colors from '../utils/colors'

export default class AddTokenToAdvancedWallet extends PureComponent<{}, {}> {
  render () {
    return (
      <View style={styles.screenView}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Token Name'
            placeholderTextColor='#7F7F7F'
          />
        </View>
        <Separator />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Address'
            placeholderTextColor='#7F7F7F'
          />
        </View>
        <Separator />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Abbreviation: 
          </Text>
          <TextInput
            placeholder='ex. BTC'
            placeholderTextColor='#7F7F7F'
          />
        </View>
        <Separator />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Smallest unit: 
          </Text>
          <TextInput
            placeholder='ex. 0.0001'
            placeholderTextColor='#7F7F7F'
          />
        </View>
        <Separator />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Project URL: 
          </Text>
          <TextInput
            defaultValue='http://www.'
            placeholderTextColor='#7F7F7F'
          />
        </View>
        <Separator />
        <View style={styles.spacer} />
        <View style={styles.bottomAction}>
          <Text style={styles.bottomActionText}>Upload Logo</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottomAction: {
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderTopColor: '#707070',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bottomActionText: {
    color: '#786AB7',
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputLabel: {
    color: '#7F7F7F',
    marginRight: 5,
  },
  screenView: {
    backgroundColor: colors.background,
    flex: 1,
    paddingTop: 20,
  },
  spacer: {
    flex: 1,
  },
})
