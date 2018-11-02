/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 10,
    backgroundColor: colors.blue,
    paddingVertical: 8,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerDisabled: {
    backgroundColor: colors.blueDark
  },
  leftSection: {
    marginRight: 8
  },
  label: {
    color: colors.foreground,
    height: 24
  },
  labelDark: {
    color: colors.backgroundLight,
    height: 24
  }
})
