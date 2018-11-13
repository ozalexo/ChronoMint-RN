/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  separator: {
    backgroundColor: colors.gray,
    minHeight: StyleSheet.hairlineWidth,
    minWidth: StyleSheet.hairlineWidth,
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'stretch',
  },
})
