/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  onSubmitMnemonicLoginForm,
  onSubmitMnemonicLoginFormSuccess,
  onSubmitMnemonicLoginFormFail,
  FORM_MNEMONIC_LOGIN_PAGE,
} from '@chronobank/login/redux/network/actions'
import { MNEMONIC_LENGTH } from '../utils/globals'
import LoginWithMnemonic from '../screens/LoginWithMnemonic'

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: (mnemonic) => () => {
      dispatch(onSubmitMnemonicLoginForm(mnemonic))
    },
    onSubmitSuccess: () => dispatch(onSubmitMnemonicLoginFormSuccess()),
    onSubmitFail: () => dispatch(onSubmitMnemonicLoginFormFail()),
  }
}

export default connect(null, mapDispatchToProps)(LoginWithMnemonic)
