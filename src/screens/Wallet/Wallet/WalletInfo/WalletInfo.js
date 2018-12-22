/* Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import TokensCounter from '../../../../components/TokensCounter'
import PrimaryToken from '../../../../components/PrimaryToken'
import PrimaryBalance from '../../../../components/PrimaryBalance'
import WalletImage from '../../../../components/WalletImage'
import styles from './WalletInfoStyles'

export default class WalletInfo extends PureComponent {

  static propTypes = {
    address: PropTypes.string,
    blockchain: PropTypes.string,
    selectedCurrency: PropTypes.string,
    wallet: PropTypes.shape({}),
  }

  render () {
    const {
      address,
      blockchain,
      wallet,
      selectedCurrency,
    } = this.props
    return (
      <View style={styles.walletDetailsSection}>
        <WalletImage
          blockchain={blockchain}
          imageStyle={styles.walletImageIcon}
          shapeStyle={styles.walletImageShape}
          size='big'
        />
        <Text style={styles.address}>
          {
            address
          }
        </Text>
        <PrimaryToken
          blockchain={blockchain}
        />
        <View style={styles.balanceAndTokensRow}>
          <PrimaryBalance
            blockchain={blockchain}
            selectedCurrency={selectedCurrency}
            wallet={wallet}
          />
          <TokensCounter
            blockchain={blockchain}
          />
        </View>
      </View>
    )
  }
}
