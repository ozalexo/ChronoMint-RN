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
    marginTop: 60,
  },
  tokenSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#424066',
  },
  tokenSelectorLabel: {
    color: colors.background,
    fontSize: 17,
    fontWeight: '700',
  },
  symbolColumn: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'left',
  },
  amountColumn: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'right',
  },
  zeroAmount: {
    color: '#C25351',
  },
})

export default styles
