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
  item: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
  },
  itemText: {
    flexShrink: 1,
    marginHorizontal: 8,
    fontSize: 13,
  },
  receiving: {
    color: colors.green,
  },
  sending: {
    color: colors.foreground,
  },
  transactionsListContainer: {
    backgroundColor: colors.background,
    borderRadius: 3,
    marginBottom: 32,
    marginTop: 8,
    paddingVertical: 8,
  },
  transactionsListTitle: {
    paddingBottom: 8,
    paddingHorizontal: 24,
    paddingTop: 4,
  },
  refreshTouch: {
    flexDirection: 'row',
  },
  refreshText: {
    flex: 1,
  },
  refreshImage: {
    marginLeft: 4,
    marginRight: 4,
  },
})

export default styles
