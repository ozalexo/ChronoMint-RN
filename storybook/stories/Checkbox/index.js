import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../../../src/components/Checkbox'

export default function StoryCheckbox ({ label, isDark, isChecked, onPress }) {
  return <Checkbox label={label} isDark={isDark} isChecked={isChecked} onPress={onPress} />;
}

StoryCheckbox.defaultProps = {
  label: 'Text label',
  isDark: true,
  isChecked: false,
  onPress: () => { },
}

StoryCheckbox.propTypes = {
  label: PropTypes.string,
  isDark: PropTypes.bool,
  isChecked: PropTypes.bool,
  onPress: PropTypes.func,
}
