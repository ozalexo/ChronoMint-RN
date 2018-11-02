/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * 
 */
import React from 'react'
import { View, Image } from 'react-native'
import styles from './IconStyles'

const Icon = ({ source, style }) => (
  <View
    style={[
      styles.container,
      style,
    ]}
  >
    <Image
      source={source}
    />
  </View>
)

export default Icon
