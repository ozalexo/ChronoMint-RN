/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import {
  StyleSheet
} from 'react-native'
// import colors from '../../utils/colors'

const styles = StyleSheet.create({
  copyright: {
    alignSelf: 'center',
    color: '#9997B2',
    fontSize: 12,
    marginVertical: 30,
    textAlign: 'center'
  },
  input: {
    margin: 20,
    textAlign: 'center'
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: -20
  },
  logoText: {
    alignSelf: 'center',
    marginBottom: 30
  },
  or: {
    alignSelf: 'center',
    color: '#A3A3CC',
    fontSize: 16
  },
  spacer: {
    flex: 1
  },
  topBarActions: {
    flexDirection: 'row',
    margin: 20,
    top: -44
  },
  topBarButton: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  topBarButtonImage: {
    marginRight: 10,
    tintColor: '#ffffff'
  },
  topBarButtonLabel: {
    color: '#FFFFFF'
  }
})

export default styles
