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
  feeSliderContainer: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
  feeSliderLabel: {
    bottom: -8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feeSliderLabelText: {
    color: colors.foreground,
    fontSize: 16,
  },
  feeSliderDetailsContainer: {
    flexDirection: 'column',
  },
  feeSliderDetails: {
    color: colors.foreground,
    fontSize: 14,
    fontWeight: '200',
    marginTop: 8,
  },
  feeSliderDetailsBold: {
    fontWeight: '700',
  },
})

export default styles
