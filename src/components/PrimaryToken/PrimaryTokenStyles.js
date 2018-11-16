/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import normalize from '../../common/utils/responseveSize'

export default StyleSheet.create({
  balanceText: {
    fontSize: normalize(22),
    fontWeight: '700',
  },
  balanceContainer: {
    flexDirection: 'row',
    marginTop: normalize(24),
  },
  balanceNumber: {
    marginLeft: normalize(4),
  },
})
