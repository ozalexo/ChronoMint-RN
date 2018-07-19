/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import Button from '../components/Button'

type TGenerateWallet = {
  navigateToLoginPage: () => void,
}

export default class GenerateWallet extends PureComponent<TGenerateWallet, {}> {
  render () {
    const {
      navigateToLoginPage
    } = this.props

    return (
      <View>
        <Button
          label='Create new wallet'
          onPress={navigateToLoginPage}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#614DBA',
    borderRadius: 3,
    height: 105,
    justifyContent: 'center',
    margin: 5,
    width: 105,
  },
  itemImage: {
    height: 48,
    width: 48,
  },
  itemLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  or: {
    alignSelf: 'center',
    color: '#A3A3CC',
    fontSize: 16,
  },
})
