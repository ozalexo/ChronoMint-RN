import React from 'react'
import PropTypes from 'prop-types'
import Input from '../../../src/components/Input'

export default function StoryInput ({ onChangeText, style, error}) {
  return <Input onChangeText={onChangeText} style={style} error={error} />
}

StoryInput.defaultProps = {
  onChangeText: () => { },
}

StoryInput.propTypes = {
  onChangeText: PropTypes.func,
  error: PropTypes.bool,
}
