/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'
import styles from '../components/styles/WalletOwnerStyles'

export type TWalletOwner = {
  address: string,
  id: string,
  image: string,
  name: string,
}

type TWalletOwnerProps = TWalletOwner & {
  onSelectOwner: () => void,
}

class WalletOwner extends PureComponent<TWalletOwnerProps> {
  render () {

    const {
      address,
      image,
      name,
    } = this.props

    return (
      <View style={styles.owner}>
        {
          image && <Image source={image} style={styles.image} />
        }
        <View style={styles.ownerContent}>
          <Text style={styles.name}>
            {name}
          </Text>
          <Text style={styles.address}>
            {address}
          </Text>
        </View>
      </View>
    )
  }
}

export default WalletOwner
