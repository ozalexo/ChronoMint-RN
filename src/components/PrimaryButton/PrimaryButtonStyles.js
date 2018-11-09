/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  container: {
    minHeight: 44,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.light,
    fontSize: 16,
    fontWeight: '900',
    paddingVertical: 14,
    marginHorizontal: 20,
    lineHeight: 20,
  },
})
