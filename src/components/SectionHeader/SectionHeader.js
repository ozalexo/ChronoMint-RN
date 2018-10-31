/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import * as React from 'react';
import { View, Text } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import styles from './SectionHeaderStyles';

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
