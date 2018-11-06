/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import styles from './SectionHeaderStyles'

export default class SectionHeader extends React.Component {
  render () {
    const { title, isDark = false, style } = this.props

    if (isDark) {
      return (
        <Text style={[styles.titleDark, style]}>
          {title.toUpperCase()}
        </Text>
      )
    }

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.title}>
          {title.toUpperCase()}
        </Text>
      </View>
    )
  }
}

SectionHeader.propTypes = {
  title: PropTypes.string,
  isDark: PropTypes.bool,
}

