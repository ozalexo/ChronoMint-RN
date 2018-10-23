/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import * as React from 'react'
import {
  Slider,
  Text,
  View,
} from 'react-native'
import styles from './styles/FeeSliderStyles'

type FeeSliderProps = {|
  tokenSymbol?: string,
  selectedCurrency?: string,
  value: number,
  calculatedFeeValue?: ?number,
  calculatedFeeValueInSelectedCurrency?: ?number,
  maximumValue?: number,
  minimumValue?: number,
  step?: number,
  handleValueChange(value: number): void,
|}

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

/**
 * Update fee value on each slider's change
 *
 * @callback handleFeeUpdate
 * @param {number} value
 */

/**
 * Component for the 'Send' screen: to adjust fee/gas before sending a transaction
 * @param {string} tokenSymbol Token's ID (e.g. ETH or BTC)
 * @param {string} selectedCurrency For example, USD
 * @param {number} value
  calculatedFeeValue?: number,
  calculatedFeeValueInSelectedCurrency?: number,
 * @param {string} tokenID Selected token ID
 * @param {number} [averageFee=0.1] Minimum fee value
 * @param {number} [maximumValue=1.9] Maximum fee value
 * @param {number} [step=0.1] Slider's step
 * @param {number} [value=1] Recommended fee/gas value
 * @param {handleFeeUpdate} handleValueChange Update fee value on each slider's change
 */
const FeeSlider = ({
  tokenSymbol,
  selectedCurrency,
  value = 1,
  calculatedFeeValue = null,
  calculatedFeeValueInSelectedCurrency = null,
  maximumValue = 1.9,
  minimumValue = 0.1,
  step = 0.1,
  handleValueChange = () => {}, // [AO] Do nothing by default
}: FeeSliderProps) => {
  const tokenInfo = tokenSymbol &&
     calculatedFeeValue &&
     [tokenSymbol, calculatedFeeValue.toFixed(8)].join(' ') || '-.--'

  const currencyInfo = tokenSymbol &&
    selectedCurrency &&
    calculatedFeeValueInSelectedCurrency &&
    ('≈' + [selectedCurrency, calculatedFeeValueInSelectedCurrency.toFixed(2)].join(' ')) || ''

  return (
    <View style={styles.feeSliderContainer}>
      <FeeSliderTitle />
      <Slider
        maximumValue={maximumValue}
        minimumTrackTintColor='#786AB7'
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

export default FeeSlider
