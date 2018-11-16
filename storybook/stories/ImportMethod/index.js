/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import ImportMethod from '../../../src/screens/Login/ImportMethod'

const StoryImportMethod = () => (
  <ImportMethod navigation={{ navigate: () => { } }} />
)

StoryImportMethod.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

export default StoryImportMethod
