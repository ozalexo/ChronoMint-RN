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
  mainSection: {
    flexGrow: 1,
    paddingHorizontal: 8,
    paddingTop: 16,
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
  walletAlert: {
    marginTop: 8,
  },
  walletAlertContent: {
    flexDirection: 'row',
  },
  walletAlertImage: {
    height: 32,
    marginRight: 8,
    marginTop: 4,
    width: 32,
  },
  walletAlertText: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: '200',
    lineHeight: 18,
  },
})

export default styles
