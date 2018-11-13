/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../common/colors'

export default StyleSheet.create({
  action: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  actions: {
    flexDirection: 'row',
  },
  actionTitle: {
    color: colors.primaryLight,
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
  },
  actionTitleMain: {
    fontWeight: '700',
  },
  container: {
    backgroundColor: colors.background,
    borderRadius: 3,
    //Test size of container
    width: '80%',
    height: '80%',
  },
  content: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
})
