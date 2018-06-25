/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'

export type TEnterMnemonicProps = {
  inputsList: Array<any>,
  onEnterWord: (wordIndex: number) => (word: string) => void,
  onLogin: () => Promise<void>,
  refInput: (inputIndex: number) => (component: any) => void,
}

export default class EnterMnemonic extends PureComponent<TEnterMnemonicProps, {}> {

  keyExtractor = (item: null, index: number) => index.toString()

  renderItem = ({ index }: { index: number }) => (
    <Input
      autoCapitalize='none'
      autoCorrect={false}
      onChangeText={this.props.onEnterWord(index)}
      placeholder={`word ${index + 1}`}
      ref={this.props.refInput(index)}
      style={styles.input}
    />
  )

  render () {
    const { inputsList, onLogin } = this.props

    return (
      <View style={styles.screenView}>
        <FlatList
          data={inputsList}
          keyExtractor={this.keyExtractor}
          numColumns={4}
          renderItem={this.renderItem}
        />
        <PrimaryButton
          label='Log in'
          onPress={onLogin}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 20,
  },
  screenView: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 60,
  },
})
