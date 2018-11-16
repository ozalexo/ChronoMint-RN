/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import GenerateMnemonic from '../../../src/screens/Login/GenerateMnemonic'

const StoryGenerateMnemonic = () => (
  <GenerateMnemonic navigation={{ navigate: () => { } }} />
)

StoryGenerateMnemonic.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  mnemonic: PropTypes.string,
  password: PropTypes.string,
  privateKey: PropTypes.string,
}

export default StoryGenerateMnemonic
