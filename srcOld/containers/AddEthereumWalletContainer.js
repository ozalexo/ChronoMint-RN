/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import AddEthereumWallet from '../screens/AddEthereumWallet'

export type TWalletType = {
  description?: string,
  id: string,
  image: any,
  screen: string,
  title: string,
}

export type TAddEthereumWalletContainerProps = {
  navigator: any,
}

class AddEthereumWalletContainer extends PureComponent<TAddEthereumWalletContainerProps, {}> {
  handlePress = ({ screen }: { screen: string }) => () => {
    this.props.navigator.push({
      screen: screen
    })
  }

  render () {
    return (<AddEthereumWallet
      onPress={this.handlePress}
      walletTypes={walletTypes}
    />)
  }
}

export default AddEthereumWalletContainer

const walletTypes: Array<TWalletType> = [
  {
    id: 'standard',
    image: require('../images/wallet-circle.png'),
    title: 'Standard wallet',
    screen: 'AddStandardWallet'
  },
  {
    id: 'timeLocked',
    image: require('../images/type-time-locked-circle-small.png'),
    title: 'Time Locked',
    description: 'Make this wallet active for transactions on specific date and time.',
    screen: 'AddTimeLockedWallet'
  },
  {
    id: 'twoFA',
    image: require('../images/type-2fa-circle-small.png'),
    title: '2 Factor Authentucation',
    description: 'Protect your Wallet from unauthorized access by enabling two-factor authentication.',
    screen: 'Add2FAWallet'
  },
  {
    id: 'multisignature',
    title: 'Multi-Signature',
    image: require('../images/type-shared-circle-small.png'),
    description: 'Make the wallet controlled by multiple owners.',
    screen: 'AddMultiSignatureWallet'
  },
  {
    id: 'advanced',
    title: 'Advanced',
    image: require('../images/type-advanced-circle-small.png'),
    description: 'Make the wallet with custom tokens.',
    screen: 'AddAdvancedWallet'
  }
]
