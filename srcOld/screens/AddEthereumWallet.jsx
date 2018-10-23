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
  View,
} from 'react-native'
import { type TWalletType } from '../containers/AddEthereumWalletContainer'
import Separator from '../components/Separator'
import colors from '../utils/colors'

export type TAddEthereumWalletProps = {
  onPress: (walletType: TWalletType) => () => void,
  walletTypes: Array<TWalletType>,
}

type TWalletTypeProps = TWalletType & { onPress: () => void }

export default class AddEthereumWallet extends PureComponent<TAddEthereumWalletProps, {}> {
  keyExtractor = ({ id }: TWalletType) => id

  renderItem = ({ item }: { item: TWalletType }) => (
    <WalletType {...item} onPress={this.props.onPress(item)} />
  )

  render () {
    const { walletTypes } = this.props

    return (
      <FlatList
        ItemSeparatorComponent={Separator}
        data={walletTypes}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={styles.screenView}
      />
    )
  }
}

class WalletType extends PureComponent<TWalletTypeProps, {}> {
  render () {
    const { image, title, description, onPress } = this.props

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={onPress}
      >
        { (typeof image !== 'undefined') && (
          <Image
            source={image}
            style={styles.itemImage}
          />
        )}
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemDescription}>{description}</Text>
        </View>
        <Image
          source={require('../images/chevron-right.png')}
          style={styles.itemChevron}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  itemChevron: {
    alignSelf: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  itemContent: {
    flex: 1,
    marginHorizontal: 20,
  },
  itemDescription: {
    fontSize: 13,
  },
  itemImage: {
    height: 32,
    width: 32,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 10,
  },
  screenView: {
    backgroundColor: colors.background,
  },
})
