import React from 'react'
import PropTypes from 'prop-types'
import PrimaryButton from '../../../../src/components/PrimaryButton'

const Button = ({ onPress, label }) => {
  return (
    <PrimaryButton onPress={onPress} label={label} />
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  label: PropTypes.string,
}

export default Button
