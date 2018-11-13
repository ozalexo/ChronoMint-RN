/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import EnterPrivateKey from '../../../src/screens/EnterPrivateKey'

const StoryEnterPrivateKey = () => (
  <EnterPrivateKey navigation={{ navigate: () => { } }} />
)

StoryEnterPrivateKey.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

export default StoryEnterPrivateKey
