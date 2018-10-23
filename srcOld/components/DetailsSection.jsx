/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import * as React from 'react'
import {
  Text,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import WalletImage, { type TWalletMode } from './WalletImage'
import styles from './styles/DetailsSectionStyles'

export type TDetailSection = {
  walletMode?: ?TWalletMode,
  address: string,
  balance: number,
  tokensLength: number,
  blockchain: string,
}

const DetailsSection = (
  {
    walletMode,
    address,
    balance,
    tokensLength,
    blockchain,
  }: TDetailSection
) => (
  <View style={styles.walletDetailsSection}>
    <WalletImage
      blockchain={blockchain}
      imageStyle={styles.walletImageIcon}
      shapeStyle={styles.walletImageShape}
      size='big'
      walletMode={walletMode}
    />
    <Text style={styles.address}>
      {
        address
      }
    </Text>
    <Text style={styles.balance}>
      USD&nbsp;
      {I18n.toNumber(balance, { precision: 2 })}
    </Text>
    <Text style={styles.walletDetails}>
      {tokensLength} Tokens
    </Text>
  </View>
)

export default DetailsSection
