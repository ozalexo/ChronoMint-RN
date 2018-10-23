/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent }  from 'react'
import {
  ActivityIndicator,
  SectionList,
  View,
} from 'react-native'
import SectionHeader from '../components/SectionHeader'
import styles from '../screens/styles/WalletsListStyles'
import WalletsListItemContainer from '../containers/WalletsListItemContainer'

type TWalletItem = {
  address: string,
  blockchain: string,
}

export type TWalletListSection = {
  data: TWalletItem[],
  title: string,
}

type TRenderItemArgs = {
  item: TWalletItem,
  section: TWalletListSection,
}

export type TWalletsListProps = {
  isRefreshing: boolean,
  navigator: any,
  sections: TWalletListSection[],
  onRefresh(): void,
}

export default class WalletsList extends PureComponent<TWalletsListProps> {

  // Note: this key MUST use 'blockchain' and 'address' to be unique
  keyExtractor = ( walletItem: TWalletItem, index: number) =>
    [walletItem.blockchain, walletItem.address, index].join('_').replace(/\s/g, '')

  renderItem = ({ item, section }: TRenderItemArgs) => (
    <View style={styles.walletItemHorizontalPaddings}>
      <WalletsListItemContainer
        address={item.address}
        navigator={this.props.navigator}
        blockchain={section.title}
      />
    </View>
  )

  renderSectionHeader = ({ section }: { section: TWalletListSection }) => (
    <SectionHeader
      title={`${section.title} Wallets`}
      isDark
    />
  )

  render () {
    const {
      isRefreshing,
      sections,
      onRefresh,
    } = this.props

    if (isRefreshing || !sections || !sections.length) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    return (
      <SectionList
        keyExtractor={this.keyExtractor}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        sections={sections}
        stickySectionHeadersEnabled={false}
      />
    )
  }
}
