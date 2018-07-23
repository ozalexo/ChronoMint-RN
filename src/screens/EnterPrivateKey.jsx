/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'

export type TEnterPrivateKeyProps = {
  onChangePrivateKey: (privateKey: string) => void,
  onDone: () => void,
}

export default class EnterPrivateKey extends PureComponent<TEnterPrivateKeyProps, {}> {
  render () {
    const {
      onChangePrivateKey,
      onDone
    } = this.props

    return (
      <View style={styles.screenView}>
        <Input
          label='Private key'
          onChangeText={onChangePrivateKey}
        />
        <PrimaryButton
          label='Add account'
          onPress={onDone}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screenView: {
    margin: 20
  }
})
