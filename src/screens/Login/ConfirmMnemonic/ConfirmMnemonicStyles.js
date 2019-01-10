/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import { headerHeight } from '../../../common/constants/screens'
import colors from '../../../common/colors'

export default StyleSheet.create({
  screenView: {
    marginTop: headerHeight,
    flex: 1,
    flexDirection: 'column',
  },
  emptyWordContainer: {
    backgroundColor: colors.shadowDark,
    borderRadius: 3,
    height: 40,
    marginVertical: 3,
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: '32%',
  },
  doneWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  primaryButton: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 50,
  },
  mnemonic: {
    color: colors.emerald,
    fontSize: 16,
    fontWeight: '900',
  },
  mnemonicContainer: {
    backgroundColor: colors.shadowDark,
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 160,
    margin: 20,
    padding: 20,
  },
  word: {
    color: colors.light,
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  wordButtons: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
  wordColumns: {
    justifyContent: 'space-between',
  },
  buttonsLine: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-around',
  },
  undoAndClear: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  wordContainer: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 3,
    height: 40,
    marginVertical: 3,
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: '32%',
  },
})
