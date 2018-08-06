/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form/immutable'
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
    onSubmit: (values) => {
      const confirmMnemonic = values.get('mnemonic')

      dispatch(onSubmitMnemonicLoginForm(confirmMnemonic))
    },
    onSubmitSuccess: () => dispatch(onSubmitMnemonicLoginFormSuccess()),
    onSubmitFail: () => dispatch(onSubmitMnemonicLoginFormFail()),
  }
}

const withForm = reduxForm({ form: FORM_MNEMONIC_LOGIN_PAGE })(LoginWithMnemonic)

export default connect(null, mapDispatchToProps)(withForm)
