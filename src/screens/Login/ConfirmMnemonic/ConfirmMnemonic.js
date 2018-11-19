/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
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

Word.propTypes = {
  word: PropTypes.string,
  onPress: PropTypes.func,
}

export default class ConfirmMnemonic extends PureComponent {

  keyExtractor = (word) => (word === ' ') ? Math.random().toString() : word

  renderWord = ({ item }) => (
    <Word word={item} onPress={this.props.onWord(item)} />
  )

  render () {
    const { words, onDone, mnemonic } = this.props

    return (
      <View style={styles.screenView}>
        <View style={styles.mnemonicContainer}>
          {mnemonic.map((word, index) => (
            <Text key={word + index} style={styles.mnemonic}>
              {word}
              {' '}
            </Text>
          ))}
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
          label={i18n.t('ConfirmMnemonic.done')}
          onPress={onDone}
          style={styles.primaryButton}
          upperCase
        />
      </View>
    )
  }
}

ConfirmMnemonic.propTypes = {
  onDone: PropTypes.func,
  onWord: PropTypes.func,
  mnemonic: PropTypes.arrayOf((PropTypes.string)),
  words: PropTypes.arrayOf((PropTypes.string)),
}
