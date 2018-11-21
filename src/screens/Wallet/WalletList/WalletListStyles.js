/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import { headerHeight } from '../../../common/constants/screens'

export default StyleSheet.create({
  activityIndicatorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  walletItemHorizontalPaddings: {
    paddingHorizontal: 0,
  },
  screenWrapper: {
    marginTop: headerHeight + 20,
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
  },
})
