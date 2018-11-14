/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
// import PrimaryBalanceContainerFactory from '../containers/PrimaryBalanceContainerFactory'
// import PrimaryTokenContainerFactory from '../containers/PrimaryTokenContainerFactory'
// import TokensListContainerFactory from '../containers/TokensListContainerFactory'
import {
  indicator_receiving_0,
} from '../../images'
import TokensCounter from '../TokensCounter'
import PrimaryToken from '../PrimaryToken'
import PrimaryBalance from '../PrimaryBalance'
import WalletImage from '../WalletImage'
import styles from './WalletListItemStyles'

const Transactions = ({ transactions }) => !transactions ? null : (
  !transactions[1] ? (
    <Image
      source={indicator_receiving_0}
    />
  ) : (
      <View style={styles.transactionsNumberContainer}>
        <Text style={styles.transactionsNumber}>
          {transactions.length}
        </Text>
      </View>
    )
)


const TokensListContainer = TokensCounter
const PrimaryTokenContainer = PrimaryToken
const PrimaryBalanceContainer = PrimaryBalance
// const TokensListContainer = TokensListContainerFactory(TokensCounter)
// const PrimaryTokenContainer = PrimaryTokenContainerFactory(PrimaryToken)
// const PrimaryBalanceContainer = PrimaryBalanceContainerFactory(PrimaryBalance)

export default class WalletListItem extends PureComponent {

  render () {
    const {
      address,
      blockchain,
      selectedCurrency,
      onItemPress = () => { },
    } = this.props

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onItemPress}
      >
        <View>
          <View style={styles.transactions}>
            <Transactions transactions={[1]} />
          </View>
          <View style={styles.content}>
            <WalletImage
              blockchain={blockchain}
              style={styles.image}
            />
            <View style={styles.contentColumn}>
              <Text style={styles.title}>
                {
                  `My ${blockchain} Wallet`
                }
              </Text>
              <Text
                style={styles.address}
                ellipsizeMode='middle'
                numberOfLines={1}
              >
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
                />
                <TokensListContainer
                  blockchain={blockchain}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

WalletListItem.propTypes = {
  address: PropTypes.string,
  blockchain: PropTypes.string,
  selectedCurrency: PropTypes.string,
  onItemPress: PropTypes.func,
}
