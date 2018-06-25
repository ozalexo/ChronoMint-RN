/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import I18n from 'react-native-i18n'
import colors from '../utils/colors'

type FetchingStatus = 'FETCHING' | 'SYNCING' | 'SYNCED'

export const STATUS = {
  'FETCHING': 'FETCHING',
  'SYNCING': 'SYNCING',
  'SYNCED': 'SYNCED'
}

type FetchingIndicatorProps = {
  status?: FetchingStatus,
  style?: number | Object
}

const FetchingIndicator = (props: FetchingIndicatorProps) => {
  const { status, style } = props

  const bulletStyle = {
    [STATUS.FETCHING]: styles.bulletFetching,
    [STATUS.SYNCING]: styles.bulletSyncing,
    [STATUS.SYNCED]: styles.bulletSynced
  }[status]

  return (
    <View style={[styles.container, style]} >
      <View style={[styles.bullet, bulletStyle]} />
      <Text style={styles.label}>{I18n.t(['FetchingIndicator', status])}</Text>
    </View>
  )
}

FetchingIndicator.defaultProps = {
  status: STATUS.FETCHING
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.red,
    margin: 4
  },
  bulletFetching: {
    backgroundColor: colors.grayDark
  },
  bulletSyncing: {
    backgroundColor: colors.orange
  },
  bulletSynced: {
    backgroundColor: colors.green
  },
  label: {
    fontSize: 12,
    color: colors.background
  }
})

export default FetchingIndicator
