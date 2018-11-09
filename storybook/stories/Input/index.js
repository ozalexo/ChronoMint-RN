import React from 'react'
import PropTypes from 'prop-types'
import Input from '../../../src/components/Input'

export default function StoryInput({onChangeText, style, error, ...restProps}) {
  return <Input {...restProps} onChangeText={onChangeText} style={style} error={error} />
}

StoryInput.propTypes = {
  onChangeText: PropTypes.func,
  error: PropTypes.string,
}
