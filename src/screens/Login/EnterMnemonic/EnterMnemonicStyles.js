/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import { headerHeight } from '../../../common/constants/screens'

export default StyleSheet.create({
  input: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: headerHeight + 20,
  },
  screenView: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 60,
  },
  button: {
    margin: 20,
  },
})
