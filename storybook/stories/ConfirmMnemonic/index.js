/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import ConfirmMnemonic from '../../../src/screens/Login/ConfirmMnemonic'

const StoryConfirmMnemonic = ({ mnemonic,password,privateKey }) => (
  <ConfirmMnemonic
    navigation={{
      navigate: () => { },
      state: {
        params:{
          mnemonic,
          password,
          privateKey,
        },
      },
    }} />
)

StoryConfirmMnemonic.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  usePinProtection: PropTypes.bool,
}

export default StoryConfirmMnemonic
