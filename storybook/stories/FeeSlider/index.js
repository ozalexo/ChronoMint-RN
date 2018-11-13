import React from 'react'
import PropTypes from 'prop-types'
import FeeSlider from '../../../src/components/FeeSlider'

export default StoryFeeSlider = ({
  tokenSymbol,
  selectedCurrency,
  value,
  calculatedFeeValue,
  calculatedFeeValueInSelectedCurrency,
  maximumValue,
  minimumValue,
  step,
  handleValueChange,
  style,
}) => {
  return (
    <FeeSlider
      style={style}
      tokenSymbol={tokenSymbol}
      selectedCurrency={selectedCurrency}
      value={value}
      calculatedFeeValue={calculatedFeeValue}
      calculatedFeeValueInSelectedCurrency={calculatedFeeValueInSelectedCurrency}
      maximumValue={maximumValue}
      minimumValue={minimumValue}
      step={step}
      handleValueChange={handleValueChange}
    />
  )
}

StoryFeeSlider.propTypes = {
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
