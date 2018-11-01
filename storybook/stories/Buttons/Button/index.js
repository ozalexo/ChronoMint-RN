import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../src/components/Button'

export default ButtonStory = ({ label, icon, isDark, isDisabled, handlePress, iconPosition }) => {
  return (
    <Button
      label={'Test Label'}
      icon={icon}
      isDark={isDark}
      isDisabled={isDisabled}
      onPress={handlePress}
      iconPosition={iconPosition}
    />
  )
}

ButtonStory.defaultProps = {
  label: 'Test Label',
  icon: 1,
  isDark: false,
  isDisabled: false,
  handlePress: () => { },
  iconPosition: 'right',
};

ButtonStory.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.number,
  isDark: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handlePress: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  iconPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
}
