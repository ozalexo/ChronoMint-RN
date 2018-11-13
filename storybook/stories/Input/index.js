import React from 'react'
import PropTypes from 'prop-types'
import Input from '../../../src/components/Input'

const StoryInput = ({ onChangeText, style, error, ...restProps }) => (
  <Input
    {...restProps}
    onChangeText={onChangeText}
    style={style} error={error}
  />
)

StoryInput.propTypes = {
  onChangeText: PropTypes.func,
  error: PropTypes.string,
}

export default StoryInput
