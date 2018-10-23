/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import Drawer from '../screens/Drawer'

class DrawerContainer extends PureComponent<{}, {}> {
  handleCopyAddress = () => {
    throw 'Not implemented yet'
  }

  handleGenerateAddressQr = () => {
    throw 'Not implemented yet'
  }

  handleLogout = () => {
    throw 'Not implemented yet'
  }

  handleSettings = () => {
    throw 'Not implemented yet'
  }

  render () {
    return (<Drawer
      currentNetwork={currentNetwork}
      mainAddress={mainAddress}
      menuItems={menuItems}
      onCopyAddress={this.handleCopyAddress}
      onGenerateAddressQr={this.handleGenerateAddressQr}
      onLogout={this.handleLogout}
      onSettings={this.handleSettings}
      profilePhoto={profilePhoto}
    />)
  }
}

export default DrawerContainer

const menuItems = [
  {
    id: 'wallets',
    title: I18n.t('Drawer.wallets'),
    image: require('../images/wallet.png')
  },
  {
    id: 'deposits',
    title: I18n.t('Drawer.deposits'),
    image: require('../images/deposit.png')
  },
  {
    id: 'exchange',
    title: I18n.t('Drawer.exchange'),
    image: require('../images/exchange.png')
  },
  {
    id: 'voting',
    title: I18n.t('Drawer.voting'),
    image: require('../images/voting.png')
  },
  {
    id: 'bonuses',
    title: I18n.t('Drawer.bonuses'),
    image: require('../images/bonuses.png')
  },
  {
    id: 'assets',
    title: I18n.t('Drawer.assets'),
    image: require('../images/assets.png')
  },
  {
    id: 'portfolio',
    title: I18n.t('Drawer.portfolio'),
    image: require('../images/stats.png')
  }
]

const currentNetwork = 'Rinkeby (test network)'

const profilePhoto = require('../images/profile-photo-1.jpg')

const mainAddress = '0x19e7e376e7c213b7e7e7e46cc70a5dd086daff2a'
