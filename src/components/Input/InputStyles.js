/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {StyleSheet} from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  inputWrapper: {
    flexDirection: 'column',
    height: 60, // 44 - input + 16 - error text
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderBottomColor: colors.dustygray,
    color: colors.dustygray,
    fontSize: 16,
  },
  error: {
    borderBottomColor: colors.error,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
  },
  errorContainer: {
    height: 16,
  },
})
