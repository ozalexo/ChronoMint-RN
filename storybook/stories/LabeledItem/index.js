import React from 'react'
import PropTypes from 'prop-types'
import LabeledItem from '../../../src/components/LabeledItem'

export default StoryLabeledItem = ({ children, labelAlign, labelTextAlign, labelType, labelText }) => {
  return (
    <LabeledItem
      labelAlign={labelAlign}
      labelTextAlign={labelTextAlign}
      labelType={labelType}
      labelText={labelText}
    >
      {children}
    </LabeledItem>
  )
}

StoryLabeledItem.propTypes = {
  labelAlign: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  labelTextAlign: PropTypes.oneOf(['left', 'right']),
  labelType: PropTypes.oneOf(['currencyColored']), // May be extended in the future like 'currencyColored' | 'otherTypeOfLabel'
  labelText: PropTypes.string,
}
