/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import SectionHeader from '../components/SectionHeader'
import colors from '../utils/colors'

export default class Add2FAWallet extends PureComponent<{}, {}> {
  render () {
    return (
      <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
        <SectionHeader title='1. Write down backup code' />
        <Text style={styles.backupCodeDescription}>
        You will need this code to restore App in case of emergencies. We recommend you to store the code on paper and keep it in safe place.
        </Text>
        <Text style={styles.backupCode}>
          UT45KQPOI1VBUI5P
        </Text>
        <SectionHeader title='2. Get SMS code' />
        <Input
          defaultValue='+41'
        />
        <Text style={styles.getSmsCode} >
          Get SMS code
        </Text>
        <SectionHeader title='3. Enter SMS code' />
        <Input />
      </ScrollView>
    )
  }
}

class Input extends PureComponent<{}, {}> {
  render () {
    return (
      <TextInput
        {...this.props}
        placeholderTextColor='#7F7F7F'
        style={styles.textInput}
      />
    )
  }
}

const styles = StyleSheet.create({
  backupCode: {
    fontSize: 16,
    fontWeight: '900',
    margin: 20,
    marginBottom: 30,
  },
  backupCodeDescription: {
    fontSize: 14,
    margin: 20,
    marginTop: 30,
  },
  getSmsCode: {
    color: '#786AB7',
    fontSize: 16,
    fontWeight: '600',
    margin: 20,
    marginBottom: 30,
  },
  scrollView: {
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  textInput: {
    borderBottomColor: '#C7C7CC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 16,
    fontWeight: '200',
    marginLeft: 20,
    marginVertical: 8,
    paddingVertical: 8,
  },
})
