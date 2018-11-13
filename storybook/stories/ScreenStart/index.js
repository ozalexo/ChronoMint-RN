/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import StartContainer from '../../../src/screens/Login/Start/StartContainer'

const StoryInput = () => (
  <StartContainer navigation={{ navigate: () => { } }}/>
)

StoryInput.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  onChangeText: PropTypes.func,
  error: PropTypes.string,
}

export default StoryInput
