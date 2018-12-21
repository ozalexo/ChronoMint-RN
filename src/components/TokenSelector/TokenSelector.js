/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import {
  chevron_right,
} from '../../images'
import styles from './TokenSelectorStyles'

export default class TokenSelector extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    selectedToken: PropTypes.shape({}),
  }

  render () {
    const {
      onPress = () => {},
      selectedToken,
    } = this.props

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
      >
        <View style={styles.tokenSelector}>
          {
            selectedToken && selectedToken.symbol &&
            <Text style={styles.tokenSelectorLabel}>
              {
                selectedToken.symbol
              }
            </Text>
          }
          <Image source={chevron_right} />
        </View>
      </TouchableOpacity>
    )
  }
}
