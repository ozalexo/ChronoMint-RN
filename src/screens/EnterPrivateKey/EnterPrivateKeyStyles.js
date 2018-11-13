/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { StyleSheet } from 'react-native'
import {headerHeight} from '../../common/constants/screens'

export default StyleSheet.create({
  screenView: {
    marginTop: headerHeight + 20,
    marginBottom: 20,
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
})
