import React from 'react'
import PropTypes from 'prop-types'
import FeeSlider from '../../../src/components/FeeSlider'

export default function StoryFeeSlider({
    tokenSymbol,
    selectedCurrency,
    value,
    calculatedFeeValue,
    calculatedFeeValueInSelectedCurrency,
    maximumValue,
    minimumValue,
    step,
    handleValueChange,
}) {
    return <FeeSlider
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
}

StoryFeeSlider.defaultProps = {
    tokenSymbol: 'ETH',
    selectedCurrency: 'USD',
    value: 1,
    calculatedFeeValue: 1,
    calculatedFeeValueInSelectedCurrency: 1,
    maximumValue: 10,
    minimumValue: 0,
    step: 0.5,
    handleValueChange: () => { },
};

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
};
