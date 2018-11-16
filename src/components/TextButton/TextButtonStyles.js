/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../common/colors'
import normalize from '../../common/utils/responseveSize'

export default StyleSheet.create({
  container: {
    minHeight: normalize(10),
    alignSelf: 'center',
  },
  label: {
    color: colors.light,
    fontWeight: '900',
    textAlign: 'center',
    fontSize: normalize(16),
    lineHeight: normalize(22),
  },
})
