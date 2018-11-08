/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as React from 'react'
import {
  Slider,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './FeeSliderStyles'
import colors from '../../common/colors';

/**
 * Title on top of slider: Slow <-> Fast.
 */
const FeeSliderTitle = () => (
  <View style={styles.feeSliderLabel}>
    <Text style={styles.feeSliderLabelText}>
      Slow transaction
    </Text>
    <Text style={styles.feeSliderLabelText}>
      Fast transaction
    </Text>
  </View>
)

const FeeSlider = ({
  style,
  tokenSymbol,
  selectedCurrency,
  value = 1,
  calculatedFeeValue = null,
  calculatedFeeValueInSelectedCurrency = null,
  maximumValue = 1.9,
  minimumValue = 0.1,
  step = 0.1,
  handleValueChange = () => {}, // [AO] Do nothing by default
}) => {
  const tokenInfo = tokenSymbol &&
    calculatedFeeValue &&
    [tokenSymbol, calculatedFeeValue.toFixed(8)].join(' ') || '-.--'

  const currencyInfo = tokenSymbol &&
    selectedCurrency &&
    calculatedFeeValueInSelectedCurrency &&
    ('≈' + [selectedCurrency, calculatedFeeValueInSelectedCurrency.toFixed(2)].join(' ')) || ''

  return (
    <View style={[styles.feeSliderContainer, style]}>
      <FeeSliderTitle />
      <Slider
        maximumValue={maximumValue}
        minimumTrackTintColor={colors.lightpurple}
        thumbTintColor={colors.lightpurple}
        minimumValue={minimumValue}
        step={step}
        value={value}
        onValueChange={(value) => {
          handleValueChange(Number(value.toFixed(1)))
        }}
      />
      <View style={styles.feeSliderDetailsContainer}>
        <Text style={[styles.feeSliderDetails, styles.feeSliderDetailsBold]}>
          {`Transaction fee: ${tokenInfo} ${currencyInfo}`}
        </Text>
        <Text style={styles.feeSliderDetails}>
          {`${value.toFixed(1)}x of average fee`}
        </Text>
      </View>
    </View>
  )

}

FeeSlider.propTypes = {
  tokenSymbol: PropTypes.string,
  selectedCurrency: PropTypes.string,
  value: PropTypes.number,
  calculatedFeeValue: PropTypes.number,
  calculatedFeeValueInSelectedCurrency: PropTypes.number,
  maximumValue: PropTypes.number,
  minimumValue: PropTypes.number,
  step: PropTypes.number,
  handleValueChange: PropTypes.func,
}

export default FeeSlider
