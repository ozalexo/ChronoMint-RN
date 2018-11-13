import React from 'react'
import PropTypes from 'prop-types'
import Label from '../../../src/components/Label'

export default StoryLabel = ({ labelTextAlign, labelType, text }) => {
  return <Label labelTextAlign={labelTextAlign} labelType={labelType} text={text} />;
}

StoryLabel.propTypes = {
  labelTextAlign: PropTypes.oneOf(['left', 'right']),
  labelType: PropTypes.oneOf(['currencyColored']),
  text: PropTypes.string,
}
