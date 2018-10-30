/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
// import colors from '../../common/colors'

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  itemImage: {
    borderRadius: 20,
    height: 40,
    marginRight: 20,
    width: 40,
  },
  address: {
    color: '#A3A3CC',
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 20,
    tintColor: 'rgba(255, 255, 255, 0.25)',
  },
})
