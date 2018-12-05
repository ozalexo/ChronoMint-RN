/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  ActivityIndicator,
  SectionList,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import SectionHeader from '../../../components/SectionHeader'
import WalletListItemContainer from '../../../components/WalletListItem'
import styles from './WalletListStyles'

export default class WalletList extends PureComponent {

  // Note: this key MUST use 'blockchain' and 'address' to be unique
  keyExtractor = (walletItem, index) =>
    [walletItem.blockchain, walletItem.address, index].join('_').replace(/\s/g, '')

  renderItem = ({ item }) => {
    return (
      <View style={styles.walletItemHorizontalPaddings}>
        <WalletListItemContainer
          address={item.address}
          blockchain={item.blockchain}
          navigate={this.props.navigate}
        />
      </View>
    )
  }

  renderSectionHeader = ({ section }) => (
    <SectionHeader
      title={`My ${section.title} wallets`}
      isDark
    />
  )

  render () {
    const {
      sections,
    } = this.props

    if (!sections || !sections.length) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    return (
      <SectionList
        style={styles.screenWrapper}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        sections={sections}
        stickySectionHeadersEnabled={false}
      />
    )
  }
}

WalletList.propTypes = {
  navigate: PropTypes.func,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          address: PropTypes.string,
          blockchain: PropTypes.string,
        })
      ),
      title: PropTypes.string,
    })
  ),
}
