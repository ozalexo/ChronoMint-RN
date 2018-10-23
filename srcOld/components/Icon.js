/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const Icon = ({ source, style }: any) => (
  <View
    style={[
      styles.container,
      style
    ]}
  >
    <Image
      source={source}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Icon
