/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { connect } from 'react-redux'
import { reduxForm } from 'redux-form/immutable'
import {
  isTestRPC,
} from '@chronobank/login/network/settings'
import {
  onSubmitLoginForm,
  onSubmitLoginFormFail,
  initLoginPage,
  navigateToSelectWallet,
  initAccountsSignature,
  DUCK_NETWORK,
  FORM_LOGIN_PAGE,
} from '@chronobank/login/redux/network/actions'
import LoginForm from '../screens/LoginForm'

function mapStateToProps (state) {
  const network = state.get(DUCK_NETWORK)

  const selectedWallet = state.get('persistAccount')?.selectedWallet

  console.log({ selectedWallet })
  return {
    selectedWallet: selectedWallet,
    isLoginSubmitting: network?.isLoginSubmitting,
    selectedNetworkId: network?.selectedNetworkId,
    selectedProvider: network?.selectedProviderId,
    selectedAccount: network?.selectedAccount,
    accounts: network?.accounts,
    isTestRPC: network && isTestRPC(network?.selectedProviderId, network?.selectedNetworkId),
  }
}

function mapDispatchToProps (dispatch: (() => any) => any) {
  return {
    onSubmit: async (values) => {
      const password = values.get('password')

      await dispatch(onSubmitLoginForm(password))
    },
    onSubmitFail: (errors, dispatch, submitErrors) => dispatch(onSubmitLoginFormFail(errors, dispatch, submitErrors)),
    initLoginPage: async () => dispatch(initLoginPage()),
    navigateToSelectWallet: () => dispatch(navigateToSelectWallet()),
    initAccountsSignature: () => dispatch(initAccountsSignature()),
  }
}

export type TAccount = {
  image: any,
  address: string,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: FORM_LOGIN_PAGE })(LoginForm)
)
