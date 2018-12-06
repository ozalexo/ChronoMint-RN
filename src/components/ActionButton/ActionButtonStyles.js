/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  StyleSheet,
} from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 4,
  },
  actionIcon: {
    tintColor: colors.background,
  },
  actionTitle: {
    color: colors.background,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
})