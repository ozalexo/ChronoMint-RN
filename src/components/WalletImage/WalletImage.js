/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  View,
  Image
} from 'react-native'
import PropTypes from 'prop-types'
// import { BLOCKCHAIN_ETHEREUM } from '@chronobank/core/dao/EthereumDAO'
// import {
//   BLOCKCHAIN_BITCOIN_CASH,
//   BLOCKCHAIN_BITCOIN_GOLD,
//   BLOCKCHAIN_BITCOIN,
//   BLOCKCHAIN_LITECOIN
// } from '@chronobank/login/network/BitcoinProvider'
// import { BLOCKCHAIN_NEM } from '@chronobank/core/dao/NemDAO'
import { indicators } from '../../common/constants/globals'
import {
  coin_ethereum_small,
  coin_bitcoin_cash_small,
  wallet_circle_small,
  coin_bitcoin_small,
  coin_litecoin_small,
  coin_nem_small,
  coin_ethereum_big,
  coin_bitcoin_cash_big,
  wallet_circle_big,
  coin_bitcoin_big,
  coin_litecoin_big,
  coin_nem_big,
} from '../../images'
import styles from './WalletImageStyles'


const BLOCKCHAIN_BITCOIN_CASH = 'BLOCKCHAIN_BITCOIN_CASH'
const BLOCKCHAIN_BITCOIN_GOLD = 'BLOCKCHAIN_BITCOIN_GOLD'
const BLOCKCHAIN_BITCOIN = 'BLOCKCHAIN_BITCOIN'
const BLOCKCHAIN_ETHEREUM = 'BLOCKCHAIN_ETHEREUM'
const BLOCKCHAIN_LITECOIN = 'BLOCKCHAIN_LITECOIN'
const BLOCKCHAIN_NEM = 'BLOCKCHAIN_NEM'

const walletImages = {
  [BLOCKCHAIN_ETHEREUM]: coin_ethereum_small,
  [BLOCKCHAIN_BITCOIN_CASH]: coin_bitcoin_cash_small,
  [BLOCKCHAIN_BITCOIN_GOLD]: wallet_circle_small,
  [BLOCKCHAIN_BITCOIN]: coin_bitcoin_small,
  [BLOCKCHAIN_LITECOIN]: coin_litecoin_small,
  [BLOCKCHAIN_NEM]: coin_nem_small,
}

const walletBigImages = {
  [BLOCKCHAIN_ETHEREUM]: coin_ethereum_big,
  [BLOCKCHAIN_BITCOIN_CASH]: coin_bitcoin_cash_big,
  [BLOCKCHAIN_BITCOIN_GOLD]: wallet_circle_big,
  [BLOCKCHAIN_BITCOIN]: coin_bitcoin_big,
  [BLOCKCHAIN_LITECOIN]: coin_litecoin_big,
  [BLOCKCHAIN_NEM]: coin_nem_big,
}

const getFallbackWalletImage = (blockchain, size = 'small') => {
  const bcsList = [
    BLOCKCHAIN_BITCOIN_CASH,
    BLOCKCHAIN_BITCOIN_GOLD,
    BLOCKCHAIN_BITCOIN,
    BLOCKCHAIN_ETHEREUM,
    BLOCKCHAIN_LITECOIN,
    BLOCKCHAIN_NEM
  ]

  if (blockchain && bcsList.includes(blockchain)) {
    return size === 'big' ? walletBigImages[blockchain] : walletImages[blockchain]
  } else {
    return size === 'big' ? wallet_circle_big : wallet_circle_small
  }
}

const WalletImage = ({
  blockchain,
  walletMode,
  shapeStyle,
  imageStyle,
  style,
  size
}) => {
  // Size guard. Default is small wallet icon
  let imageSize = size ? size : 'small'
  const wImage = getFallbackWalletImage(blockchain, imageSize)

  return (
    <View style={style}>
      {
        walletMode &&
        <Image
          source={indicators[walletMode]}
          style={styles.walletBadge}
        />
      }
      {
        (typeof blockchain !== 'undefined')
          ? <Image source={wImage} />
          : <View
            style={[
              styles.walletImageShape,
              shapeStyle
            ]}
          >
            <Image
              source={wImage}
              style={[
                styles.walletImage,
                imageStyle
              ]}
            />
          </View>
      }
    </View>
  )
}

WalletImage.propTypes = {
  blockchain: PropTypes.string,
  size: PropTypes.oneOf(['big', 'small']),
  walletMode: PropTypes.oneOf(['2fa', 'shared', 'timeLocked']),
}

export default WalletImage
