/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {StyleSheet} from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  inputWrapper: {
    width: '100%',
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 44,
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
})
