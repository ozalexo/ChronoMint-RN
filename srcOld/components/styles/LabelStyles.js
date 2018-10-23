/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import {
  StyleSheet,
} from 'react-native'
import colors from '../../utils/colors'

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  defaultText: {
    color: colors.mainGrey,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 19,
  },
  currencyText: {
    color: colors.activeBlue,
    fontSize: 22,
    lineHeight: 26, 
  },
  rightSidedText: {
    textAlign: 'right',
  },
  leftSidedText: {
    textAlign: 'left',
  },
})

export default styles
