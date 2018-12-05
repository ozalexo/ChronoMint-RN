/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  StyleSheet,
} from 'react-native'
import colors from '../../../common/colors'
import { headerHeight } from '../../../common/constants/screens'

export default StyleSheet.create({
  actions: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
  },
  screenView: {
    flex: 1,
    marginTop: headerHeight,
  },
  separator: {
    backgroundColor: colors.primary,
  },
  tabItem: {
    fontSize: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  tabsContainer: {
    backgroundColor: colors.primary,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
})
