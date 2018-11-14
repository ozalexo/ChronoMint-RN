/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  walletBadge: {
    position: 'absolute',
    zIndex: 1,
  },
  walletImageShape: {
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletImage: {
    tintColor: colors.background,
    width: 24,
    height: 24,
  },
})
