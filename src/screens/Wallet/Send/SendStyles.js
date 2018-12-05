/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import { headerHeight } from '../../../common/constants/screens'
import colors from '../../../common/colors'

export default StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
  },
  confirmButtons: {
    marginVertical: 50,
  },
  screenView: {
    marginTop: headerHeight + 20,
    marginBottom: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  actions: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
  },
})
