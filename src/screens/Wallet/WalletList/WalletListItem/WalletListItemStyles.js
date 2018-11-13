/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../../../common/colors'

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 16,
    marginVertical: 4,
    paddingBottom: 40,
  },
  transactions: {
    flexDirection: 'row',
    margin: 4,
    minHeight: 20,
    justifyContent: 'flex-end',
  },
  transactionsNumberContainer: {
    height: 20,
    minWidth: 20,
    backgroundColor: colors.red,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    marginRight: 16,
    marginLeft: 8,
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
    marginTop: 8,
    fontWeight: '700',
  },
  address: {
    marginTop: 4,
    fontWeight: '200',
    fontSize: 12,
  },
  balanceText: {
    fontSize: 22,
    fontWeight: '700',
  },
  tokens: {
    color: colors.foregroundLighter,
    fontWeight: '200',
    marginTop: 4,
  },
  balanceContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  balanceNumber: {
    marginLeft: 4,
  },
  exchange: {
    color: colors.foregroundLighter,
    fontWeight: '200',
    marginTop: 4,
  },
  balanceAndTokensRow: {
    flexDirection: 'row',
  },
})
