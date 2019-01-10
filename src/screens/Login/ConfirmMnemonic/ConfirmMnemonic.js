/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import PrimaryButton from '../../../components/PrimaryButton'
import i18n from '../../../locales/translation'
import styles from './ConfirmMnemonicStyles'

const Word = ({ word, onPress }) => {
  if (word === '') {

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

Word.propTypes = {
  word: PropTypes.string,
  onPress: PropTypes.func,
}

export default class ConfirmMnemonic extends PureComponent {

  keyExtractor = (word) => (word === '') ? Math.random().toString() : word

  renderWord = ({ item }) => (
    <Word word={item} onPress={() => this.props.onWord(item)} />
  )

  render () {
    const {
      words,
      mnemonic,
      onDone,
      onClear,
      onUndo,
      disabled,
    } = this.props

    return (
      <View style={styles.screenView}>
        <View style={styles.mnemonicContainer}>
          {mnemonic.map((word, index) => (
            <Text
              key={`mnemonic${word + index}`}
              style={styles.mnemonic}
            >
              {word}
              {' '}
            </Text>
          ))}
        </View>
        <View style={{ flexShrink: 1 }}>
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
        </View>
        <View style={styles.buttonsLine}>
          <PrimaryButton
            label={i18n.t('ConfirmMnemonic.clear')}
            onPress={onClear}
            style={styles.undoAndClear}
            upperCase
          />
          <PrimaryButton
            label={i18n.t('ConfirmMnemonic.undo')}
            onPress={!disabled ? onUndo : () => { }}
            style={styles.undoAndClear}
            upperCase
            disabled={disabled}
          />
        </View>
        <View style={styles.doneWrapper}>
          <PrimaryButton
            label={i18n.t('ConfirmMnemonic.done')}
            onPress={onDone}
            style={styles.primaryButton}
            upperCase
          />
        </View>
      </View>
    )
  }
}

ConfirmMnemonic.propTypes = {
  onDone: PropTypes.func,
  onClear: PropTypes.func,
  onUndo: PropTypes.func,
  onWord: PropTypes.func,
  mnemonic: PropTypes.arrayOf((PropTypes.string)),
  words: PropTypes.arrayOf((PropTypes.string)),
}
