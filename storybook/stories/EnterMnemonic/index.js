/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import EnterMnemonic from '../../../src/screens/Login/EnterMnemonic'

const StoryEnterMnemonic = () => (
  <EnterMnemonic navigation={{ navigate: () => { } }} />
)

StoryEnterMnemonic.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

export default StoryEnterMnemonic
