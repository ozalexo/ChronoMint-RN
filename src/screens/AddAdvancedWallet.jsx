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
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native'
import { type TToken } from '../containers/AddAdvancedWalletContainer'
import SectionHeader from '../components/SectionHeader'
import Separator from '../components/Separator'
import colors from '../utils/colors'

export type TAddAdvancedWalletProps = {
  onAddNewToken: () => void,
  tokens: Array<TToken>,
}

type TTokenProps = TToken

export default class AddAdvancedWallet extends PureComponent<TAddAdvancedWalletProps, {}> {
  keyExtractor = ({ id }: TToken) => id

  renderItem = ({ item }: { item: TToken }) => <Token {...item} />

  render () {
    const { onAddNewToken, tokens } = this.props

    return (
      <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
        <TextInput
          placeholder='Wallet name'
          placeholderTextColor='#7F7F7F'
          style={styles.walletName}
        />
        <SectionHeader title='Select tokens' />
        <FlatList
          data={tokens}
          ItemSeparatorComponent={Separator}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          scrollEnabled={false}
          style={styles.tokensList}
        />
        <Separator />
        <Text
          onPress={onAddNewToken}
          style={styles.addNew}
        >
          Add new
        </Text>
        <Separator />
      </ScrollView>
    )
  }
}

class Token extends PureComponent<TTokenProps, {}> {
  render () {
    const { image, isChecked, title } = this.props

    return (
      <View style={styles.tokenContainer}>
        { (typeof this.props.image !== 'undefined') && (
          <Image source={image} />
        )}
        <Text style={styles.tokenTitle}>{title}</Text>
        <Switch
          value={isChecked}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addNew: {
    color: '#614DBA',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  scrollView: {
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  tokenContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  tokenTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 20,
  },
  tokensList: {
    flexGrow: 0,
  },
  walletName: {
    padding: 20,
    paddingTop: 30,
  },
})
