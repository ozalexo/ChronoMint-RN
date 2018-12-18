/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { SafeAreaView } from 'react-navigation'
import {
  FlatList,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import NetworkItem from '../NetworkItem'
import Separator from '../Separator'
import styles from './DrawerNetworkStyles'

class DrawerNetwork extends PureComponent {

  static propTypes = {
    networks: PropTypes.arrayOf(
      PropTypes.shape({
        sectionTitle: PropTypes.string,
        sectionDescription: PropTypes.string,
        networks: PropTypes.arrayOf(
          PropTypes.shape({
            networkId: PropTypes.number,
            networkIndex: PropTypes.number,
            networkTitle: PropTypes.string,
          })
        ),
      })
    ),
    networkStates: PropTypes.arrayOf(PropTypes.bool),
    onSelectNetwork: PropTypes.func,
  }

  keyExtractor = ({ networkIndex }) => networkIndex.toString()

  renderNetworkItem = ({ item }) => (
    <NetworkItem
      name={item.networkTitle}
      onPress={this.props.onSelectNetwork(item.networkIndex)}
      status={item.status}
    />
  )

  render () {
    const {
      networks,
    } = this.props

    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{
          top: 'always',
          horizontal: 'never',
        }}
      >
        <View style={styles.screenView}>
          <Text style={styles.title}>
            Available Networks
          </Text>
          <FlatList
            data={networks}
            extraData={this.props.networkStates}
            ItemSeparatorComponent={Separator}
            keyExtractor={this.keyExtractor}
            ListFooterComponent={Separator}
            ListHeaderComponent={Separator}
            renderItem={this.renderNetworkItem}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default DrawerNetwork
