/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import { headerHeight } from '../../../common/constants/screens'
import colors from '../../../common/colors'


export default StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: headerHeight + 30,
  },
  item: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 3,
    height: 105,
    justifyContent: 'center',
    margin: 5,
    width: 105,
  },
  itemImage: {
    height: 48,
    width: 48,
  },
  itemLabel: {
    color: colors.light,
    fontSize: 14,
    fontWeight: '700',
  },
  or: {
    marginVertical: 20,
    alignSelf: 'center',
    color: colors.darkpurple,
    fontSize: 16,
  },
})
