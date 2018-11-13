/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  container: {
    padding: 8,
    minWidth: 20,
    minHeight: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    color: colors.primaryLight,
  },
  labelDark: {
    color: colors.primaryDarkest,
  },
  checkboxContainer: {
    marginRight: 8
  }
})
