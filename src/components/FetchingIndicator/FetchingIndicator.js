/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * 
 */
import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import I18n from 'react-native-i18n'
import styles from './FetchingIndicatorStyles'

export const STATUS = {
  'FETCHING': 'FETCHING',
  'SYNCING': 'SYNCING',
  'SYNCED': 'SYNCED',
}

const FetchingIndicator = (props) => {
  const { status, style } = props

  const bulletStyle = {
    [STATUS.FETCHING]: styles.bulletFetching,
    [STATUS.SYNCING]: styles.bulletSyncing,
    [STATUS.SYNCED]: styles.bulletSynced,
  }[status]

  return (
    <View style={[styles.container, style]} >
      <View style={[styles.bullet, bulletStyle]} />
      <Text style={styles.label}>{I18n.t(['FetchingIndicator', status])}</Text>
    </View>
  )
}

FetchingIndicator.propTypes = {
  status: PropTypes.oneOf(['FETCHING', 'SYNCING', 'SYNCED']),
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
}

FetchingIndicator.defaultProps = {
  status: STATUS.FETCHING,
}

export default FetchingIndicator
