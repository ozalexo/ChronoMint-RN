/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../common/colors'
import normalize from '../../common/utils/responseveSize'

export default StyleSheet.create({
  container: {
    minHeight: normalize(44),
    borderRadius: normalize(50),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextLabel: {
    color: colors.light,
    fontSize: normalize(16),
    fontWeight: '900',
    paddingVertical: normalize(14),
    marginHorizontal: normalize(20),
    lineHeight: normalize(20),
  },
  disabled: {
    backgroundColor: colors.mainGrey,
  },
})
