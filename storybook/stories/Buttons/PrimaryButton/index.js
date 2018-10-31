import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../../../../src/components/PrimaryButton';
console.log('PrimaryButton', PrimaryButton)
export default Button = ({ onPress, label }) => {
  return (
    <PrimaryButton onPress={onPress} label='Test label' />
  )
}

Button.defaultProps = {
  label: 'Test label',
  onPress: () => {},
};

Button.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
};
