/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from 'react-native'
import { type TWalletOwner } from '../containers/AddMultiSigWalletContainer'
import SectionHeader from '../components/SectionHeader'
import Separator from '../components/Separator'
import colors from '../utils/colors'

export type TAddMultiSigWalletProps = {
  walletOwners: Array<TWalletOwner>,
}

type TWalletOwnerProps = TWalletOwner

export default class AddMultiSigWallet extends PureComponent<TAddMultiSigWalletProps, {}> {
  keyExtractor = ({ id }: TWalletOwner) => id

  renderItem = ({ item }: { item: TWalletOwner }) => <WalletOwner {...item} /> 

  render () {
    const { walletOwners } = this.props

    return (
      <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
        <TextInput
          placeholder='Wallet name'
          placeholderTextColor='#7F7F7F'
          style={styles.walletName}
        />
        <SectionHeader title='Wallet owners' />
        <FlatList
          data={walletOwners}
          ItemSeparatorComponent={Separator}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          scrollEnabled={false}
          style={styles.walletOwnerList}
        />
        <Separator />
        <View style={styles.addAddress} >
          <View style={styles.plusButtonRound}>
            <Image
              source={require('../images/plus.png')}
              style={styles.plusButtonRoundImage}
            />
          </View>
          <TextInput
            placeholder={`Enter owner's Ethereum address`}
            placeholderTextColor='#7F7F7F'
            style={styles.addAddressInput}
          />
        </View>
        <View style={styles.ownersWarning}>
          <Text style={styles.ownersWarningText}>
            The wallet need at least 2 owners.
          </Text>
        </View>
        <SectionHeader
          style={styles.numberOfSignaturesHeader}
          title='Number of signatures required'
        />
        <View style={styles.numberOfSignaturesContainer}>
          <Text style={styles.numberOfSignatures}>2</Text>
          <View style={styles.numberControlButtonLeft}>
            <Text style={styles.numberControlTextLeft}>-</Text>
          </View>
          <View style={styles.numberControlButtonRight}>
            <Text style={styles.numberControlTextRight}>+</Text>
          </View>
        </View>
        <View style={styles.ownersWarning}>
          <Text style={styles.ownersWarningText}>
            Specify number of owners’ signatures required to perform a transaction using the wallet.
          </Text>
        </View>
      </ScrollView>
    )
  }
}

class WalletOwner extends PureComponent<TWalletOwnerProps, {}> {
  render () {
    const { image, name, address } = this.props

    return (
      <View style={styles.walletOwner}>
        { (typeof image !== 'undefined') && (
          <Image source={image} style={styles.walletOwnerImage} />
        )}
        <View style={styles.walletOwnerContent}>
          <Text style={styles.walletOwnerName}>
            {name}
          </Text>
          <Text>
            {address}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addAddress: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addAddressInput: {
    fontSize: 16,
    marginLeft: 20,
  },
  numberControlButtonLeft: {
    borderBottomLeftRadius: 3,
    borderColor: '#C7C7CC',
    borderRightWidth: 0,
    borderTopLeftRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
  },
  numberControlButtonRight: {
    borderBottomRightRadius: 3,
    borderColor: '#614DBA',
    borderTopRightRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
  },
  numberControlTextLeft: {
    color: '#C7C7CC',
    fontSize: 24,
  },
  numberControlTextRight: {
    color: '#614DBA',
    fontSize: 24,
    top: -2,
  },
  numberOfSignatures: {
    flex: 1,
  },
  numberOfSignaturesContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  numberOfSignaturesHeader: {
    borderTopWidth: 0,
  },
  ownersWarning: {
    backgroundColor: '#EFEFF3',
    borderTopColor: '#C7C7CC',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  ownersWarningText: {
    fontSize: 13,
  },
  plusButtonRound: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 19,
    justifyContent: 'center',
    width: 19,
  },
  plusButtonRoundImage: {
    height: 16,
    width: 16,
  },
  scrollView: {
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  walletName: {
    fontSize: 16,
    margin: 20,
    marginTop: 40,
  },
  walletOwner: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  walletOwnerContent: {
    marginLeft: 20,
  },
  walletOwnerImage: {
    marginTop: 5,
  },
  walletOwnerList: {
    flexGrow: 0,
  },
  walletOwnerName: {
    fontSize: 17,
    marginBottom: 5,
  },
})
