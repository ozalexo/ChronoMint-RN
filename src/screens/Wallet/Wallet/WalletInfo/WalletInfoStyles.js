/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  StyleSheet,
} from 'react-native'
import colors from '../../../../common/colors'

export default StyleSheet.create({
  walletImageShape: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  walletImageIcon: {
    width: 38,
    height: 38,
  },
  walletDetailsSection: {
    // backgroundColor: colors.textContainer,
    borderRadius: 3,
    alignItems: 'center',
    padding: 24,
  },
  walletDetails: {
    color: colors.darkpurple,
  },
  address: {
    color: colors.background,
    fontSize: 11,
    fontWeight: '600',
    marginVertical: 16,
  },
  balance: {
    color: colors.background,
    fontSize: 22,
    fontWeight: '700',
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
  balanceAndTokensRow: {
    flexDirection: 'row',
  },
})
