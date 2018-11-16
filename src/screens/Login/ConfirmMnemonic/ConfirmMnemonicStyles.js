/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import { headerHeight } from '../../../common/constants/screens'
import colors from '../../../common/colors'
import normalize from '../../../common/utils/responseveSize'

export default StyleSheet.create({
  screenView: {
    marginTop: headerHeight,
    flex: 1,
    flexDirection: 'column',
  },
  emptyWordContainer: {
    backgroundColor: colors.shadowDark,
    borderRadius: normalize(3),
    height: normalize(40),
    marginVertical: normalize(3),
    paddingHorizontal: normalize(5),
    paddingVertical: normalize(10),
    width: '32%',
  },
  primaryButton: {
    marginVertical: normalize(10),
    marginHorizontal: normalize(50),
  },
  mnemonic: {
    color: colors.emerald,
    fontSize: normalize(16),
    fontWeight: '900',
  },
  mnemonicContainer: {
    backgroundColor: colors.shadowDark,
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: normalize(160),
    margin: normalize(20),
    padding: normalize(20),
  },
  word: {
    color: colors.light,
    fontSize: normalize(16),
    fontWeight: '900',
    textAlign: 'center',
  },
  wordButtons: {
    marginHorizontal: normalize(20),
    marginVertical: normalize(10),
  },
  wordColumns: {
    justifyContent: 'space-between',
  },
  wordContainer: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: normalize(3),
    height: normalize(40),
    marginVertical: normalize(3),
    paddingHorizontal: normalize(5),
    paddingVertical: normalize(10),
    width: '32%',
  },
})
