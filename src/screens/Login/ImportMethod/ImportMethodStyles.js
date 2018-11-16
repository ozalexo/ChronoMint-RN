/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import { headerHeight } from '../../../common/constants/screens'
import colors from '../../../common/colors'
import normalize from '../../../common/utils/responseveSize'


export default StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: headerHeight + normalize(30),
  },
  item: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: normalize(3),
    height: normalize(105),
    justifyContent: 'center',
    margin: normalize(5),
    width: normalize(105),
  },
  itemImage: {
    height: normalize(48),
    width: normalize(48),
  },
  itemLabel: {
    color: colors.light,
    fontSize: normalize(14),
    fontWeight: '700',
  },
  or: {
    marginVertical:normalize(20),
    alignSelf: 'center',
    color: colors.darkpurple,
    fontSize: normalize(16),
  },
})
