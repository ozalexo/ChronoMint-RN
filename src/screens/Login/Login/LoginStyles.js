/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import colors from '../../../common/colors'
import { headerHeight } from '../../../common/constants/screens'

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
    marginBottom: headerHeight,
    alignSelf: 'center',
  },
  loginButtonLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  biometryTypeWrapper: {
    alignItems: 'center',
  },
  biometryType: {
    marginLeft: 10,
    width: 32,
    height: 32,
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
    marginBottom: 50,
    textAlign: 'center',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
  },
  forgotButton: {
    marginBottom: 30,
  },
  kavContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
})
