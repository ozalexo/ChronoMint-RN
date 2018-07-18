/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  navigateToCreateAccount,
  navigateToMnemonicImportMethod,
  navigateToSelectImportMethod
} from '@chronobank/login/redux/network/actions'
import LoginWithOptions from '../screens/LoginWithOptions'

const accountImportMethods = [
  {
    id: 'mnemonic',
    screen: 'LoginWithMnemonic',
    title: 'Enter mnemonic',
    image: require('../images/mnemonic.png')
  },
  {
    id: 'privateKey',
    screen: 'EnterPrivateKey',
    title: 'Enter private key',
    image: require('../images/private-key.png')
  }
]

function mapStateToProps () {
  return {
    accountImportMethods
  }
}

function mapDispatchToProps (dispatch) {
  return {
    navigateToCreateAccount: () => dispatch(navigateToCreateAccount()),
    navigateToSelectImportMethod: () => dispatch(navigateToSelectImportMethod())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithOptions)
