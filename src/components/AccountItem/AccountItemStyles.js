/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import normalize from '../../common/utils/responseveSize'
// import colors from '../../common/colors'

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginVertical: normalize(20),
  },
  itemImage: {
    borderRadius: normalize(20),
    height: normalize(40),
    marginRight: normalize(20),
    width: normalize(40),
  },
  address: {
    color: '#A3A3CC',
    flex: 1,
    fontSize: normalize(16),
    fontWeight: '700',
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: normalize(20),
    tintColor: 'rgba(255, 255, 255, 0.25)',
  },
})
