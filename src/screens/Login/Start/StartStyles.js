/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../../common/colors/index'
import normalize from '../../../common/utils/responseveSize'

export default StyleSheet.create({
  container: {
    // TODO: to investigate a "magic" with this 20
    marginTop: normalize(20),
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  logo: {
    marginBottom: normalize(20),
    alignSelf: 'center',
  },
  logoText: {
    // Default header heights: ios = 64, android = 56
    marginBottom: normalize(64),
    alignSelf: 'center',
  },
  copyright: {
    alignSelf: 'center',
    color: colors.dustygray,
    fontSize: normalize(12),
    textAlign: 'center',
  },
  inputsContainer: {
    paddingHorizontal: normalize(20),
    flex: 1,
    alignSelf: 'stretch',
  },
  input: {
    marginBottom: normalize(10),
    textAlign: 'center',
  },
  primaryButton: {
    marginBottom: normalize(20),
  },
  orText: {
    alignSelf: 'center',
    color: colors.textOnPurple,
    fontSize: normalize(16),
    marginBottom: normalize(20),
  },
  kavContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
})
