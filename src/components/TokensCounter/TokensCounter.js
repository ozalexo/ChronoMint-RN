/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Text,
} from 'react-native'
import i18n from '../../locales/translation'
import styles from './TokenCounterStyles'
import testData from './testData.json'

export default class TokensCounter extends PureComponent {

  render () {
    const tokensLength = testData.tokensLength
    // const tokensLength = this.props.list.length - 1
    if (!tokensLength) {
      return null
    }

    return (
      <Text style={styles.tokens}>
        {
          i18n.t('Tokens', { count: tokensLength, formatted_number: tokensLength })
        }
      </Text>
    )

  }
}
