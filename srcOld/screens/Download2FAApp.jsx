/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { Text, ScrollView, StyleSheet, Image } from 'react-native'
import colors from '../utils/colors'

export default class Download2FAApp extends PureComponent<{}, {}> {
  render () {
    return (
      <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
        <Image source={require('../images/2fa.jpg')} />
        <Text style={styles.header}>
          Download App to enable two-factor authentication
        </Text>
        <Text style={styles.text}>
          2FA provides an additional security level for your wallet by generating one-time code in your mobile App for the wallet login and transaction operations.
        </Text>
        <Text style={styles.text}>
          Enable 2FA if you do not plan to have more than 1 owner for the wallet.
        </Text>
        <Text style={styles.text}>
          Install <Text style={styles.bold}>Google Authenticator</Text>  with the link provided below and then tap Proceed.
        </Text>
        <Image source={require('../images/appstore.png')} style={styles.appStore} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  appStore: {
    marginTop: 30,
  },
  bold: {
    fontWeight: '700',
  },
  header: {
    alignSelf: 'stretch',
    fontSize: 17,
    fontWeight: '700',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  scrollView: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flexGrow: 1,
    paddingVertical: 40,
  },
  text: {
    alignSelf: 'stretch',
    fontSize: 14,
    fontWeight: '200',
    marginHorizontal: 20,
    marginVertical: 10,
  },
})
