/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  navigateToLoginPage
} from '@chronobank/login/redux/network/actions'
import GenerateWallet from '../screens/GenerateWallet'

function mapDispatchToProps (dispatch) {
  return {
    navigateToLoginPage: () => dispatch(navigateToLoginPage())
  }
}

export default connect(null, mapDispatchToProps)(GenerateWallet)
