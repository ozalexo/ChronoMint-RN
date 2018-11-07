/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import { Header } from 'react-navigation'

export default StyleSheet.create({
  container: {
    marginTop: Header.HEIGHT,
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    marginBottom: 20,
  },
  logoText: {
    marginBottom: 30,
  },
  copyright: {
    alignSelf: 'center',
    color: '#9997B2',
    fontSize: 12,
    marginVertical: 30,
    textAlign: 'center',
  },
  input: {
    margin: 20,
    textAlign: 'center',
  },
  orText: {
    alignSelf: 'center',
    color: '#A3A3CC',
    fontSize: 16,
  },
})
