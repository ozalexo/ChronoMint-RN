/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  StyleSheet,
} from 'react-native'
import colors from '../../common/colors'
import normalize from '../../common/utils/responseveSize'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultText: {
    color: colors.greySubLight,
    fontSize: normalize(16),
    fontWeight: 'bold',
    lineHeight: normalize(19),
  },
  currencyText: {
    color: colors.activeBlue,
    fontSize: normalize(22),
    lineHeight: normalize(26),
  },
  rightSidedText: {
    textAlign: 'right',
  },
  leftSidedText: {
    textAlign: 'left',
  },
})
