/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import {
  StyleSheet,
} from 'react-native'
import colors from '../../utils/colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 4,
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 8,
    paddingBottom: 40,
  },
  transactions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 4,
    minHeight: 20,
  },
  transactionsNumberContainer: {
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 10,
    display: 'flex',
    height: 20,
    justifyContent: 'center',
    minWidth: 20,
  },
  image: {
    marginLeft: 8,
    marginRight: 16,
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
    fontWeight: '700',
    marginTop: 8,
  },
  address: {
    fontSize: 12,
    fontWeight: '200',
    marginTop: 4,
  },
  balance: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 24,
  },
  tokens: {
    color: colors.foregroundLighter,
    fontWeight: '200',
    marginTop: 4,
  },
  exchange: {
    color: colors.foregroundLighter,
    fontWeight: '200',
    marginTop: 4,
  },
})

export default styles
