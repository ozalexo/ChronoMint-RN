/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../../common/colors'
import { headerHeight } from '../../../common/constants/screens'

export default StyleSheet.create({
  container: {
    marginTop: headerHeight,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  logo: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  logoText: {
    marginBottom: headerHeight,
    alignSelf: 'center',
  },
  copyright: {
    alignSelf: 'center',
    color: colors.dustygray,
    fontSize: 12,
    textAlign: 'center',
  },
  inputsContainer: {
    paddingHorizontal: 20,
    flex: 1,
    alignSelf: 'stretch',
  },
  input: {
    marginBottom: 10,
    textAlign: 'center',
  },
  primaryButton: {
    marginBottom: 20,
  },
  orText: {
    alignSelf: 'center',
    color: colors.textOnPurple,
    fontSize: 16,
    marginBottom: 20,
  },
  kavContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
})
