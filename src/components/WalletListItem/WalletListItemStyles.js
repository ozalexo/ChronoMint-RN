/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../common/colors'
import normalize from '../../common/utils/responseveSize'

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: normalize(4),
    padding: normalize(8),
    marginHorizontal: normalize(16),
    marginVertical: normalize(4),
    paddingBottom: normalize(40),
  },
  transactions: {
    flexDirection: 'row',
    margin: normalize(4),
    minHeight: normalize(20),
    justifyContent: 'flex-end',
  },
  transactionsNumberContainer: {
    height: normalize(20),
    minWidth: normalize(20),
    backgroundColor: colors.red,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(10),
  },
  image: {
    marginRight: normalize(16),
    marginLeft: normalize(8),
  },
  transactionsNumber: {
    color: colors.background,
    fontWeight: '900',
  },
  content: {
    flexDirection: 'row',
  },
  contentColumn: {
    flex: 1,
  },
  title: {
    marginTop: normalize(8),
    fontWeight: '700',
  },
  address: {
    marginTop: normalize(4),
    fontWeight: '200',
    fontSize: normalize(12),
  },
  balanceAndTokensRow: {
    flexDirection: 'row',
  },
  exchange: {
    color: colors.foregroundLighter,
    fontWeight: '200',
    marginTop: normalize(4),
  },
})
