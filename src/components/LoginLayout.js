/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent, type Node} from 'react'
import {
  Image,
  View,
  ScrollView
} from 'react-native'
import styles from './styles/LoginLayout'
import backgroundImage from '../images/background.jpg'

export type TLoginLayoutProps = {
  children: Node,
}

export default class LoginLayout extends PureComponent<TLoginLayoutProps> {
  render () {
    const {
      children
    } = this.props

    return (
      <ScrollView
        bounces={false}
        style={styles.screenView}
      >
        <Image
          source={backgroundImage}
          style={styles.backgroundImage}
        />
        <View style={styles.screenContent}>
          {children}
        </View>
      </ScrollView>
    )
  }
}


