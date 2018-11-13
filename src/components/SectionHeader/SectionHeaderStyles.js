/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  titleDark: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.background,
    fontWeight: '900',
  },
  container: {
    backgroundColor: colors.sectionHeaderContainer,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    borderTopColor: colors.ghost,
    borderBottomColor: colors.ghost,
  }
})
