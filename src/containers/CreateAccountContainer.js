/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form/immutable'
import { router } from '@chronobank/core-dependencies/router'
import {
  onSubmitCreateAccountPage,
  onSubmitCreateAccountPageSuccess,
  onSubmitCreateAccountPageFail,
  navigateToSelectWallet,
  FORM_CREATE_ACCOUNT
} from '@chronobank/login/redux/network/actions'
import isValid from '../utils/validators'
import CreateAccount from '../screens/CreateAccount'

function mapStateToProps (state) {
  return {
    isImportMode: state.get('network')?.importAccountMode,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  router.setNavigator(ownProps.navigator)

  return {
    onSubmit: async (values) => {
      const walletName = values.get('walletName')
      const password = values.get('password')

      await dispatch(onSubmitCreateAccountPage(walletName, password))
    },
    onSubmitSuccess: () => dispatch(onSubmitCreateAccountPageSuccess()),
    onSubmitFail: (errors, dispatch, submitErrors) => dispatch(onSubmitCreateAccountPageFail(errors, dispatch, submitErrors)),
    navigateToSelectWallet: () => dispatch(navigateToSelectWallet())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: FORM_CREATE_ACCOUNT })(
    CreateAccount
  )
)
