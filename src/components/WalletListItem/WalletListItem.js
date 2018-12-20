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
import {
  indicator_receiving_0,
} from '../../images'
// import TokensCounter from '../TokensCounter'
import PrimaryToken from '../PrimaryToken'
import PrimaryBalance from '../PrimaryBalance'
import WalletImage from '../WalletImage'
import styles from './WalletListItemStyles'

const Transactions = ({ transactions }) => !transactions ? null : (
  !transactions[1] ?
    (
      <Image
        source={indicator_receiving_0}
      />
    ) :
    (
      <View style={styles.transactionsNumberContainer}>
        <Text style={styles.transactionsNumber}>
          {transactions.length}
        </Text>
      </View>
    )
)

export default class WalletListItem extends PureComponent {

  render () {
    const {
      address,
      blockchain,
      selectedCurrency,
      onItemPress = () => { },
      wallet,
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
              <PrimaryToken
                blockchain={blockchain}
              />
              <View style={styles.balanceAndTokensRow}>
                <PrimaryBalance
                  blockchain={blockchain}
                  selectedCurrency={selectedCurrency}
                  wallet={wallet} 
                />
                {/* <TokensCounter
                  blockchain={blockchain}
                /> */}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

WalletListItem.propTypes = {
  wallet: PropTypes.shape({}),
  address: PropTypes.string,
  blockchain: PropTypes.string,
  selectedCurrency: PropTypes.string,
  onItemPress: PropTypes.func,
}
