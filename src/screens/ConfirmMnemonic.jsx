/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import PrimaryButton from '../components/PrimaryButton'

export type TConfirmMnemonicProps = {
  onDone: () => Promise<void>,
  onWord: (word: string) => () => void,
  mnemonic: string,
  words: Array<string>,
}

type TWordProps = {
  word: string,
  onPress: () => void,
}

export default class ConfirmMnemonic extends PureComponent<TConfirmMnemonicProps, {}> {

  keyExtractor = (word: string) => (word === 'emptyWord') ? Math.random().toString() : word

  renderWord = ({ item }: { item: string }) => (
    <Word word={item} onPress={this.props.onWord(item)} />
  )

  render () {
    const { mnemonic, words, onDone } = this.props

    return (
      <View>
        <View style={styles.mnemonicContainer}>
          <Text style={styles.mnemonic}>
            {mnemonic}
          </Text>
        </View>
        <FlatList
          data={words}
          extraData={words}
          renderItem={this.renderWord}
          scrollEnabled={false}
          keyExtractor={this.keyExtractor}
          style={styles.wordButtons}
          columnWrapperStyle={styles.wordColumns}
          numColumns={3}
        />
        <PrimaryButton
          label={I18n.t('ConfirmMnemonic.done').toUpperCase()}
          onPress={onDone}
        />
      </View>
    )
  }
}

class Word extends PureComponent<TWordProps, {}> {
  render () {
    const { word, onPress } = this.props
    if (word === 'emptyWord') {
      return <View style={styles.emptyWordContainer} />
    }

    return (
      <TouchableOpacity
        style={styles.wordContainer}
        onPress={onPress}
      >
        <Text style={styles.word}>
          {word}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  emptyWordContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 3,
    height: 40,
    marginVertical: 3,
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: '32%',
  },
  mnemonic: {
    color: '#6EE289',
    fontSize: 16,
    fontWeight: '900',
  },
  mnemonicContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 160,
    margin: 20,
    padding: 20,
  },
  word: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  wordButtons: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  wordColumns: {
    justifyContent: 'space-between',
  },
  wordContainer: {
    alignItems: 'center',
    backgroundColor: '#614DBA',
    borderRadius: 3,
    height: 40,
    marginVertical: 3,
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: '32%',
  },
})
