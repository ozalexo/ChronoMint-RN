import React from 'react'
import PropTypes from 'prop-types'
import TextButton from '../../../../src/components/TextButton'

const Button = ({ onPress, label }) => {
  return (
    <TextButton onPress={onPress} label={label} />
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  label: PropTypes.string,
}

export default Button
