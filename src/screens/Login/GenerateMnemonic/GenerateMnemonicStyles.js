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
  description: {
    color: colors.darkpurple,
    fontSize: 16,
    margin: 20,
  },
  mnemonic: {
    color: colors.darkYellow,
    fontSize: 16,
    fontWeight: '900',
  },
  mnemonicContainer: {
    backgroundColor: colors.textContainer,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  primaryButton: {
    margin: 20,
  },
  warningContainer: {
    backgroundColor: colors.textContainer,
    borderRadius: 3,
    borderTopColor: colors.warningTitle,
    borderTopWidth: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingBottom: 30,
  },
  warningTitle: {
    color:  colors.warningTitle,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 10,
    marginHorizontal: 20,
    marginTop: 30,
  },
  warningItem: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  warningItemContent: {
    color: colors.darkpurple,
    flex: 1,
    fontSize: 16,
  },
  warningItemTitle: {
    color: colors.light,
    fontSize: 16,
    fontWeight: '900',
  },
  warningNumber: {
    color: colors.light,
    fontSize: 16,
    fontWeight: '900',
    marginRight: 5,
  },
})
