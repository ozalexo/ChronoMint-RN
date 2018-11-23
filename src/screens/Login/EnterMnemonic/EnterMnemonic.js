/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { FlatList, View } from 'react-native'
import PropTypes from 'prop-types'
import Input from '../../../components/Input'
import PrimaryButton from '../../../components/PrimaryButton'
import styles from './EnterMnemonicStyles'

export default class EnterMnemonic extends PureComponent {

  static propTypes = {
    inputsList: PropTypes.arrayOf(
      PropTypes.number
    ),
    onEnterWord: PropTypes.func,
    onLogin: PropTypes.func,
    refInput: PropTypes.func,
  }

  keyExtractor = (item, index) => index

  renderItem = ({ index }) => (
    <Input
      label='Enter mnemonic'
      name={`word${index}`}
      onChange={this.props.onEnterWord(index)}
      placeholder={`word ${index + 1}`}
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
          style={styles.button}
          label='Log in'
          onPress={onLogin}
        />
      </View>
    )
  }
}
