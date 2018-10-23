/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import * as React from 'react'
import {
  Text,
} from 'react-native'
import styles from './styles/WalletTokensListStyles'

const WalletTokensList = (tokens) => {

  if (!tokens || !Object.keys(tokens).length) {
    return null
  }

  let tokensStrings = Object.keys(tokens)
    .sort()
    .reduce( (accumulator, tokenSymbol) => {
      accumulator.push([tokenSymbol, tokens[tokenSymbol].toFixed(2)].join(': '))
      return accumulator
    }, [])

  if (tokensStrings && tokensStrings.length > 2) {
    tokensStrings = [
      tokensStrings[0],
      ['+', tokensStrings.length - 1, 'more'].join(' '),
    ]
  }
  tokensStrings = tokensStrings && tokensStrings.join(', ')

  return (
    <Text style={styles.tokens}>
      {tokensStrings || ''}
    </Text>
  )
}

export default WalletTokensList
