/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../common/colors'
import normalize from '../../common/utils/responseveSize'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(4),
  },
  bullet: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: colors.red,
    margin: normalize(4),
  },
  bulletFetching: {
    backgroundColor: colors.grayDark,
  },
  bulletSyncing: {
    backgroundColor: colors.orange,
  },
  bulletSynced: {
    backgroundColor: colors.green,
  },
  label: {
    fontSize: normalize(12),
    color: colors.background,
  },
})
