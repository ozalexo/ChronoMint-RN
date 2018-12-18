/* Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { BLOCKCHAIN_ETHEREUM  } from '@chronobank/ethereum/constants'
import TokensCounter from '../../../../components/TokensCounter'
import PrimaryToken from '../../../../components/PrimaryToken'
import PrimaryBalance from '../../../../components/PrimaryBalance'
import WalletImage from '../../../../components/WalletImage'
import styles from './WalletInfoStyles'

const TokensListContainer = TokensCounter
const PrimaryTokenContainer = PrimaryToken
const PrimaryBalanceContainer = PrimaryBalance
// const TokensListContainer: ComponentType<TTokensListFactoryProps> = TokensListContainerFactory(TokensCounter)
// const PrimaryTokenContainer: ComponentType<TPrimaryTokenFactoryProps> = PrimaryTokenContainerFactory(PrimaryToken)
// const PrimaryBalanceContainer: ComponentType<TPrimaryBalanceFactoryProps> = PrimaryBalanceContainerFactory(PrimaryBalance)

export default class WalletInfo extends PureComponent {

  static propTypes = {
    address: PropTypes.string,
    blockchain: PropTypes.string,
    selectedCurrency: PropTypes.string,
  }

  render () {
    const {
      address,
      blockchain,
      bitcoinWallet,
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
        <PrimaryTokenContainer
          blockchain={blockchain}
        />
        <View style={styles.balanceAndTokensRow}>
          <PrimaryBalanceContainer
            blockchain={blockchain}
            selectedCurrency={selectedCurrency}
            wallet={blockchain === BLOCKCHAIN_ETHEREUM ? null : bitcoinWallet}
          />
          <TokensListContainer
            blockchain={blockchain}
          />
        </View>
      </View>
    )
  }
}
