import React from 'react'
import PropTypes from 'prop-types'
import Input from '../../../src/components/Input'

export default function StoryInput ({ onChangeText, style }) {
  return <Input onChangeText={onChangeText} style={style} />
}

StoryInput.defaultProps = {
  onChangeText: () => { },
}

StoryInput.propTypes = {
  onChangeText: PropTypes.func,
}
