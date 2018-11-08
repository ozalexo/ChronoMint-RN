/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  container: {
    minHeight: 10,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  label: {
    color: colors.light,
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
  },
})
