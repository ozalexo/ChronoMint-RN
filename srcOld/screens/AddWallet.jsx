/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { type TWalletType } from '../containers/AddWalletContainer'
import Separator from '../components/Separator'
import colors from '../utils/colors'

export type TAddWalletProps = {
  walletTypes: Array<TWalletType>,
  onWalletTypePress: (walletType: TWalletType) => () => void,
}

type TWalletTypeProps = TWalletType & { onPress: () => void }

export default class AddWallet extends PureComponent<TAddWalletProps, {}> {
  keyExtractor = ({ id }: TWalletType) => id

  renderItem = ({ item }: { item: TWalletType }) => (
    <WalletType {...item} onPress={this.props.onWalletTypePress(item)} />
  )

  render () {
    const { walletTypes } = this.props

    return (
      <FlatList
        data={walletTypes}
        ItemSeparatorComponent={Separator}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={styles.screen}
      />
    )
  }
}

class WalletType extends PureComponent<TWalletTypeProps, {}> {
  render () {
    const { title, image, onPress } = this.props

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={onPress}
      >
        { (typeof image !== 'undefined') &&
          <Image source={image} style={styles.itemImage} />
        }
        <Text style={styles.itemTitle}>{title}</Text>
        <Image source={require('../images/chevron-right.png')} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 24,
  },
  itemImage: {
    height: 32,
    width: 32,
  },
  itemTitle: {
    flexGrow: 1,
    fontSize: 17,
    fontWeight: '700',
    marginHorizontal: 16,
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
})
