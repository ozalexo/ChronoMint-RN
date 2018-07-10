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
import Separator from '../components/Separator'

export type TNetwork = {
  id: string,
  name: string,
  status: TNetworkStatus,
}

export type TNetworkStatus = 'online' | 'offline'

type TSelectNetworkProps = {
  networks: TNetwork[],
  onSelectNetwork: (network: TNetwork) => () => void,
}

type TNetworkItemProps = TNetwork & {
  onPress: () => void,
}

type TNetworkStatusProps = {
  status: TNetworkStatus,
}

export default class SelectNetwork extends PureComponent<TSelectNetworkProps, {}> {
  keyExtractor = ({ id }: TNetwork) => {
    console.log('>keyExtractor id', id)
    return id.toString()
  }

  renderNetworkItem = ({ item }: { item: TNetwork }) => {
    console.log('>renderNetworkItem item', item)
    console.log('>renderNetworkItem this.props.onSelectNetwork', this.props.onSelectNetwork)
    return (
      <NetworkItem
        {...item}
        onPress={this.props.onSelectNetwork(item)}
        status='online'
      />
    )
  }

  render () {
    let {
      networks
    } = this.props
    if (!networks) {
      networks = []
    }
    console.log('DATA FOR FLATLIST:')
    console.log('data={networks}:', networks)
    console.log('keyExtractor:', this.keyExtractor)
    console.log('Separator:', Separator)
    console.log('renderItem:', this.renderNetworkItem)
    return (
      <View style={styles.screenView}>
        <Text style={styles.title}>
          {'Available Networks'}
        </Text>
        {
          networks.length &&
            <FlatList
              data={networks}
              ItemSeparatorComponent={Separator}
              keyExtractor={this.keyExtractor}
              ListFooterComponent={Separator}
              ListHeaderComponent={Separator}
              renderItem={this.renderNetworkItem}
            />
        }
      </View>
    )
  }
}

class NetworkItem extends PureComponent<TNetworkItemProps, {}> {
  render () {
    const {
      name,
      onPress,
      status,
    } = this.props

    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.networkItem}
      >
        <NetworkStatus status={status} />
        <Text style={styles.itemName}>
          {name}
        </Text>
        <Image source={require('../images/chevron-right.png')} />
      </TouchableOpacity>
    )
  }
}

class NetworkStatus extends PureComponent<TNetworkStatusProps, {}> {
  render () {
    const {
      status,
    } = this.props

    return (
      <View
        style={[
          styles.networkStatus,
          (status === 'online') ? styles.networkStatusOnline : {},
        ]}
      />
    )
  }
}

const styles = StyleSheet.create({
  itemName: {
    flex: 1,
    marginHorizontal: 10,
  },
  networkItem: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  networkStatus: {
    backgroundColor: 'gray',
    borderRadius: 5.5,
    height: 11,
    width: 11,
  },
  networkStatusOnline: {
    backgroundColor: '#6EE289',
  },
  screenView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    margin: 20,
  },
})
