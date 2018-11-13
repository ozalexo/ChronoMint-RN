/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../../common/colors/index'

export default StyleSheet.create({
  container: {
    // TODO: to investigate a "magic" with this 20
    marginTop: 20,
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
    // Default header heights: ios = 64, android = 56
    marginBottom: 64,
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
  primaryButon: {
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
