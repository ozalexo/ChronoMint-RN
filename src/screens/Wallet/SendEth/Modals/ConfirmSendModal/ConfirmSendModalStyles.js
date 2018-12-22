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
  container: {
    backgroundColor: colors.light,
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingTop: 40, // why not 20? Dunno, there is 40 in prototype.
  },
  lightGreyText: {
    color: colors.greySub,
  },
  screenLabel: {
    paddingVertical: 10,
    color: colors.light,
  },
  confirmButtons: {
    marginVertical: 50,
  },
  actions: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
