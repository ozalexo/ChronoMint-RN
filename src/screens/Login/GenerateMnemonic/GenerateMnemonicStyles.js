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
  description: {
    color: colors.darkpurple,
    fontSize: normalize(16),
    margin: normalize(20),
  },
  mnemonic: {
    color: colors.darkYellow,
    fontSize: normalize(16),
    fontWeight: '900',
  },
  mnemonicContainer: {
    backgroundColor: colors.textContainer,
    marginHorizontal: normalize(20),
    marginVertical: normalize(10),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(30),
  },
  primaryButton: {
    marginHorizontal: '20%',
  },
  warningContainer: {
    backgroundColor: colors.textContainer,
    borderRadius: normalize(3),
    borderTopColor: colors.warningTitle,
    borderTopWidth: normalize(5),
    marginHorizontal: normalize(20),
    marginVertical: normalize(10),
    paddingBottom: normalize(30),
  },
  warningTitle: {
    color:  colors.warningTitle,
    fontSize: normalize(22),
    fontWeight: '900',
    marginBottom: normalize(10),
    marginHorizontal: normalize(20),
    marginTop: normalize(30),
  },
  warningItem: {
    flexDirection: 'row',
    marginHorizontal: normalize(20),
    marginVertical: normalize(10),
  },
  warningItemContent: {
    color: colors.darkpurple,
    flex: 1,
    fontSize: normalize(16),
  },
  warningItemTitle: {
    color: colors.light,
    fontSize: normalize(16),
    fontWeight: '900',
  },
  warningNumber: {
    color: colors.light,
    fontSize: normalize(16),
    fontWeight: '900',
    marginRight: normalize(5),
  },
})
