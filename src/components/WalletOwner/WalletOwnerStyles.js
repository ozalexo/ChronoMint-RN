/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  StyleSheet,
} from 'react-native'
import colors from '../../common/colors'
import normalize from '../../common/utils/responseveSize'

export default StyleSheet.create({
  address: {
    color: colors.foregroundLighter,
    fontSize: normalize(12),
    fontWeight: '200',
  },
  image: {
    height: normalize(32),
    margin:normalize(8),
    width: normalize(32),
  },
  name: {
    fontSize: normalize(12),
    fontWeight: '700',
  },
  owner: {
    backgroundColor: colors.background,
    borderRadius: normalize(3),
    flexDirection: 'row',
    margin: normalize(8),
    padding: normalize(8),
  },
  ownerContent: {
    flex: 1,
    margin: normalize(8),
  },
})
