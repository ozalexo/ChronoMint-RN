/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import { StyleSheet } from 'react-native'
import ImageBackground from './ImageBackground'
import { background } from '../../images'
import { backgroundColor } from '../colors'


export default class DefaultImageBackground extends React.Component {
  render () {
    const { children } = this.props

    return (
      <ImageBackground
        source={background}
        style={styles.backgroundImage}
        resizeMode='contain'
      >
        {children}
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: null,
    backgroundColor,
  },
})
