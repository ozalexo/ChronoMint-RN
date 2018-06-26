/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  FlatList,
} from 'react-native'
import styles from './styles/WalletOwnersTabStyles'
import WalletOwner, { type TWalletOwner } from '../components/WalletOwner'

type TWalletOwnersTabProps = {
  owners: TWalletOwner[],
  onSelectOwner: (owner: TWalletOwner) => () => void,
}

class WalletOwnersTab extends PureComponent<TWalletOwnersTabProps, {}> {

  keyExtractor = ({ id }: TWalletOwner) => id

  renderItem = ({ item }: { item: TWalletOwner }) => (
    <WalletOwner
      {...item}
      onSelectOwner={this.props.onSelectOwner(item)}
    />
  )

  render () {

    const {
      owners,
    } = this.props

    return (
      <FlatList
        data={owners}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        style={styles.list}
      />
    )
  }

}

export default WalletOwnersTab
