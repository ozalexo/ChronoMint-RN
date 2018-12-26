/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../../../../common/colors'

export default StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
  },
  actions: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
  },
  goback: {
    alignSelf: 'flex-start',
    padding: 16,
  },
  gobackText: {
    fontSize: 17,
    fontWeight: '500',
  },
  authButton: {
    color: colors.primary,
  },
})
