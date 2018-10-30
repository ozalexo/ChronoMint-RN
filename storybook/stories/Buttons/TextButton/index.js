import React from 'react';
import PropTypes from 'prop-types';
import TextButton from '../../../../src/components/TextButton';
console.log('TextButton', TextButton)
export default Button = ({ onPress, label }) => {
  return (
    <TextButton onPress={onPress} label='Test label' />
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
