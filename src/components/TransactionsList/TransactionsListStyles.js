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
  item: {
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(24),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftPart: {
    flexShrink: 1,
    flexDirection: 'row',
  },
  itemText: {
    flexShrink: 1,
    marginHorizontal: normalize(8),
    fontSize: normalize(13),
  },
  receiving: {
    color: colors.green,
  },
  sending: {
    color: colors.foreground,
  },
  transactionsListContainer: {
    backgroundColor: colors.background,
    borderRadius: normalize(3),
    marginBottom: normalize(32),
    marginTop: normalize(8),
    paddingVertical: normalize(8),
  },
  transactionsListTitle: {
    paddingBottom: normalize(8),
    paddingHorizontal: normalize(24),
    paddingTop: normalize(4),
  },
  refreshTouch: {
    flexDirection: 'row',
  },
  refreshText: {
    flex: 1,
  },
  refreshImage: {
    marginLeft: normalize(4),
    marginRight: normalize(4),
  },
})
