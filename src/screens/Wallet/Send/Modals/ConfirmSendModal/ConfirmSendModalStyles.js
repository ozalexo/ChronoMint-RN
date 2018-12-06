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
  confirmButtons: {
    marginVertical: 50,
  },
  actions: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
  },
})
