/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../common/colors'
import normalize from '../../common/utils/responseveSize'

export default StyleSheet.create({
  action: {
    flex: 1,
    justifyContent: 'center',
    padding: normalize(16),
  },
  actions: {
    flexDirection: 'row',
  },
  actionTitle: {
    color: colors.primaryLight,
    fontSize: normalize(16),
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
    padding: normalize(24),
    paddingBottom: normalize(16),
  },
  title: {
    paddingHorizontal: normalize(24),
    paddingVertical: normalize(8),
  },
})
