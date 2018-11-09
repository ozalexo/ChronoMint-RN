/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './WalletOwnerStyles'


class WalletOwner extends PureComponent {
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

WalletOwner.propTypes = {
  address: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  onSelectOwner: PropTypes.func,
}

export default WalletOwner
