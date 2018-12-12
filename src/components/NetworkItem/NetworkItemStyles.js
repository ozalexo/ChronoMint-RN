/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemName: {
    flex: 1,
    marginHorizontal: 10,
  },
  networkStatus: {
    backgroundColor: colors.gray,
    borderRadius: 5.5,
    height: 11,
    width: 11,
  },
  networkStatusOnline: {
    backgroundColor: colors.emerald,
  },
  networkStatusOffline: {
    backgroundColor: colors.red,
  },
})
