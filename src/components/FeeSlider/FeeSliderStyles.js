/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  StyleSheet,
} from 'react-native'
import colors from '../../common/colors'
import normalize from '../../common/utils/responseveSize'

export default StyleSheet.create({
  feeSliderContainer: {
    marginHorizontal: normalize(20),
    marginVertical: normalize(30),
  },
  feeSliderLabel: {
    bottom: normalize(-8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feeSliderLabelText: {
    color: colors.foreground,
    fontSize: normalize(16),
  },
  feeSliderDetailsContainer: {
    flexDirection: 'column',
  },
  feeSliderDetails: {
    color: colors.foreground,
    fontSize: normalize(14),
    fontWeight: '200',
    marginTop: normalize(8),
  },
  feeSliderDetailsBold: {
    fontWeight: '700',
  },
})
