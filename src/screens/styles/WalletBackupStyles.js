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
  or: {
    alignSelf: 'center',
    color: '#A3A3CC',
    fontSize: 16
  },
  separator: {
    backgroundColor: '#424066'
  },
  subtitle: {
    color: '#A3A3CC',
    fontSize: 16,
    marginBottom: 30,
    marginHorizontal: 20,
    textAlign: 'center'
  },
  switchRow: {
    flexDirection: 'row',
    margin: 20
  },
  switchRowLabel: {
    color: '#6EE289',
    flex: 1,
    fontSize: 16,
    fontWeight: '900'
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: '900',
    margin: 20,
    textAlign: 'center'
  }
})

export default styles
