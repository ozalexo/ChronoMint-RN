/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import colors from '../utils/colors'

type SectionHeaderProps = {
  title: string,
  isDark?: boolean,
  style?: StyleObj,
}

export default class SectionHeader extends React.Component<SectionHeaderProps, void> {
  render () {
    const { title, isDark = false, style } = this.props

    if (isDark) {
      return (
        <Text style={[ styles.titleDark, style ]}>
          {title.toUpperCase()}
        </Text>
      )
    }

    return (
      <View style={[ styles.container, style ]}>
        <Text style={styles.title}>
          {title.toUpperCase()}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleDark: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.background,
    fontWeight: '900'
  },
  container: {
    backgroundColor: '#EFEFF3',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#C7C7CC',
    borderBottomColor: '#C7C7CC'
  }
})
