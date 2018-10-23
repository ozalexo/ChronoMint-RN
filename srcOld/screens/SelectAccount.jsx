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
import I18n from 'react-native-i18n'
import PrimaryButton from '../components/PrimaryButton'
import Separator from '../components/Separator'
import TextButton from '../components/TextButton'

export type TAccount = {
  address: string,
}

type TSelectAccountProps = {
  accounts: Array<TAccount>,
  onCreateWallet: () => void,
  onImportAccount: () => void,
  onSelectAccount: (account: TAccount) => () => void,
}

type TAccountProps = TAccount & {
  onPress: () => void,
}

export default class SelectAccount extends PureComponent<TSelectAccountProps, {}> {
  keyExtractor = ({ address }: TAccount) => address

  renderItem = ({ item }: { item: TAccount }) => (
    <Account
      {...item}
      onPress={this.props.onSelectAccount(item)}
    />
  )

  render () {
    const {
      accounts,
      onCreateWallet,
      onImportAccount,
    } = this.props

    return (
      <View>
        <FlatList
          data={accounts}
          ItemSeparatorComponent={CustomizedSeparator}
          keyExtractor={this.keyExtractor}
          ListFooterComponent={CustomizedSeparator}
          ListHeaderComponent={CustomizedSeparator}
          renderItem={this.renderItem}
          style={styles.container}
        />
        <PrimaryButton
          label={I18n.t('SelectAccount.importNew').toUpperCase()}
          onPress={onImportAccount}
        />
        <Text style={styles.or}>
          {I18n.t('SelectAccount.or')}
        </Text>
        <TextButton
          label={I18n.t('SelectAccount.createNew')}
          onPress={onCreateWallet}
        />
      </View>
    )
  }
}

class Account extends PureComponent<TAccountProps, {}> {
  render () {
    const {
      address,
      onPress,
    } = this.props
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.item}
      >
        <Image
          source={require('../images/profile-circle-small.png')}
          style={styles.itemImage}
        />
        <Text style={styles.address}>
          {
            address
          }
        </Text>
        <Image
          source={require('../images/chevron-right.png')}
          style={styles.chevron}
        />
      </TouchableOpacity>
    )
  }
}

const CustomizedSeparator = () => <Separator style={styles.separator} />

const styles = StyleSheet.create({
  address: {
    color: '#A3A3CC',
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 20,
    tintColor: 'rgba(255, 255, 255, 0.25)',
  },
  container: {
    margin: 10,
  },
  item: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  itemImage: {
    borderRadius: 20,
    height: 40,
    marginRight: 20,
    width: 40,
  },
  or: {
    alignSelf: 'center',
    color: '#A3A3CC',
    fontSize: 16,
  },
  separator: {
    backgroundColor: '#424066',
  },
})
