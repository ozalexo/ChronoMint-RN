/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import { headerHeight } from '../../../common/constants/screens'

export default StyleSheet.create({
  screenView: {
    marginTop: headerHeight,
    flex: 1,
    flexDirection: 'column',
  },
  description: {
    color: '#A3A3CC',
    fontSize: 16,
    margin: 20,
  },
  mnemonic: {
    borderRadius: 3,
    color: '#FFB54E',
    fontSize: 16,
    fontWeight: '900',
  },
  mnemonicContainer: {
    backgroundColor: '#302D59',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  primaryButton: {
    marginHorizontal: '20%',
  },
  warningContainer: {
    backgroundColor: '#302D59',
    borderRadius: 3,
    borderTopColor: '#FFB54E',
    borderTopWidth: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingBottom: 30,
  },
  warningItem: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  warningItemContent: {
    color: '#A3A3CC',
    flex: 1,
    fontSize: 16,
  },
  warningItemTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },
  warningNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    marginRight: 5,
  },
  warningTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 10,
    marginHorizontal: 20,
    marginTop: 30,
  },
})
