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
    backgroundColor: '#302D59',
    borderRadius: 3,
    alignItems: 'center',
    padding: 24,
  },
  walletDetails: {
    color: '#A3A3CC',
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

export default styles
