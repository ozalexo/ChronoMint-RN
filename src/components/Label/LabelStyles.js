/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  StyleSheet,
} from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },
  defaultText: {
    color: colors.greySubLight,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 19,
  },
  currencyText: {
    color: colors.activeBlue,
    fontSize: 22,
    lineHeight: 26,
  },
  rightSidedText: {
    textAlign: 'right',
  },
  leftSidedText: {
    textAlign: 'left',
  },
})
