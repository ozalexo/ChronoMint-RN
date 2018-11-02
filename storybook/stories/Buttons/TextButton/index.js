import React from 'react'
import PropTypes from 'prop-types'
import TextButton from '../../../../src/components/TextButton'

const Button = ({ onPress, label }) => {
  return (
    <TextButton onPress={onPress} label={label} />
  )
}

Button.defaultProps = {
  label: 'Test label',
  onPress: () => {},
};

Button.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
}

export default Button
