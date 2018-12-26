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
    color: colors.light,
    fontSize: 17,
  },
  confirmButtons: {
    marginVertical: 50,
  },
  header: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 17,
  },
})
