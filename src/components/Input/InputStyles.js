/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {StyleSheet} from 'react-native'
import colors from '../../common/colors'
import normalize from '../../common/utils/responseveSize'

export default StyleSheet.create({
  inputWrapper: {
    width: '100%',
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    alignSelf: 'stretch',
    alignItems: 'center',
    height: normalize(44),
    borderBottomColor: colors.dustygray,
    color: colors.dustygray,
    fontSize: normalize(16),
  },
  error: {
    borderBottomColor: colors.error,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
  },
  errorContainer: {
    height: normalize(16),
  },
})
