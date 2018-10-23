/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import I18n from 'react-native-i18n'
import colors from '../utils/colors'

export type TDrawerProps = {
  currentNetwork: string,
  mainAddress: string,
  menuItems: Array<TMenuItem>,
  onCopyAddress: () => void, 
  onGenerateAddressQr: () => void,
  onLogout: () => void,
  onSettings: () => void,
  profilePhoto: any,
}

export type TMenuItem = {
  id: string,
  image: any,
  title: string,
}

type TCurrentNetworkProps = {
  network: string,
}

type TDrawerMenuItemProps = TMenuItem

export default class Drawer extends PureComponent<TDrawerProps, {}> {
  keyExtractor = ({ id }: TMenuItem) => id

  renderItem = ({ item }: { item: TMenuItem }) => <DrawerMenuItem {...item} />

  render () {
    const {
      currentNetwork,
      mainAddress,
      menuItems,
      onCopyAddress,
      onGenerateAddressQr,
      onLogout,
      onSettings,
      profilePhoto,
    } = this.props

    return (
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.container}
      >
        <CurrentNetwork network={currentNetwork} />
        <Image
          source={profilePhoto}
          style={styles.profilePhoto}
        />
        <View style={styles.separator} />
        <View style={styles.account}>
          <Text style={styles.accountName}>
            Account name
          </Text>
          <TouchableOpacity
            onPress={onSettings}
            style={styles.accountAction}
          >
            <Image source={require('../images/cog.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onLogout}
            style={styles.accountAction}
          >
            <Image source={require('../images/on-off.png')} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={menuItems}
          keyExtractor={this.keyExtractor}
          numColumns={2}
          renderItem={this.renderItem}
          scrollEnabled={false}
          style={styles.menu}
        />
        <View style={styles.addressSection}>
          <View style={styles.address}>
            <Text style={styles.mainAddressLabel}>
              {
                I18n.t('Drawer.mainAddress')
              }
            </Text>
            <Text style={styles.mainAddress}>
              {
                mainAddress
              }
            </Text>
          </View>
          <TouchableOpacity
            onPress={onGenerateAddressQr}
            style={styles.accountAction}
          >
            <Image source={require('../images/qr.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCopyAddress}
            style={styles.accountAction}
          >
            <Image source={require('../images/copy.png')} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

class CurrentNetwork extends PureComponent<TCurrentNetworkProps, {}> {
  render () {
    const { network } = this.props

    return (
      <View style={styles.currentNetworkContainer}>
        <Text style={styles.currentNetwork}>
          {
            network.toUpperCase()
          }
        </Text>
      </View>
    )
  }
}

class DrawerMenuItem extends PureComponent<TDrawerMenuItemProps, {}> {
  render () {
    const { image, title } = this.props

    return (
      <View style={styles.menuItem}>
        <Image
          source={image}
          style={styles.menuItemImage}
        />
        <Text style={styles.menuItemTitle}>
          {
            title
          }
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  account: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  accountAction: {
    alignItems: 'center',
    height: 56,
    justifyContent: 'center',
    opacity: .25,
    width: 56,
  },
  accountName: {
    color: colors.background,
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  address: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  addressSection: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  currentNetwork: {
    color: colors.background,
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
  },
  currentNetworkContainer: {
    backgroundColor: colors.green,
    borderRadius: 10,
    margin: 16,
    marginTop: 30,
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
  mainAddress: {
    color: colors.background,
    fontSize: 12,
  },
  mainAddressLabel: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '700',
    paddingBottom: 4,
  },
  menu: {
    alignSelf: 'stretch',
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  menuItem: {
    alignItems: 'center',
    borderColor: '#F7F7F7',
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  menuItemImage: {
    tintColor: colors.primary,
  },
  menuItemTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  profilePhoto: {
    borderRadius: 49,
    height: 98,
    marginBottom: 16,
    width: 98,
  },
  separator: {
    alignSelf: 'stretch',
    backgroundColor: colors.background,
    height: 1,
    opacity: .2,
  },
})
