/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import AddWallet from '../screens/AddWallet'

export type TWalletType = {
  id: string,
  title: string,
  image?: any,
  screen: string,
}

export type TAddWalletContainerProps = {
  navigator: any,
}

class AddWalletContainer extends PureComponent<TAddWalletContainerProps, {}> {
  handleWalletTypePress = ({ screen }: TWalletType) => () => {
    this.props.navigator.push({
      screen
    })
  }

  render () {
    return (<AddWallet
      onWalletTypePress={this.handleWalletTypePress}
      walletTypes={walletTypes}
    />)
  }
}

export default AddWalletContainer

const walletTypes: Array<TWalletType> = [
  {
    id: 'bitcoin',
    image: require('../images/coin-bitcoin-big.png'),
    screen: 'AddEthereumWallet',
    title: I18n.t('AddWallet.bitcoinWallet')
  },
  {
    id: 'litecoin',
    image: require('../images/coin-litecoin-big.png'),
    screen: 'AddEthereumWallet',
    title: I18n.t('AddWallet.litecoinWallet')
  },
  {
    id: 'ethereum',
    image: require('../images/coin-ethereum-big.png'),
    screen: 'AddEthereumWallet',
    title: I18n.t('AddWallet.ethereumWallet')
  },
  {
    id: 'nem',
    image: require('../images/coin-nem-big.png'),
    screen: 'AddEthereumWallet',
    title: I18n.t('AddWallet.nemWallet')
  }
]
