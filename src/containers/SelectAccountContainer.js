/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { connect } from 'react-redux'
import {
  navigateToCreateAccount,
  navigateToSelectImportMethod
} from '@chronobank/login/redux/network/actions'
import SelectAccount from '../screens/SelectAccount'

function mapDispatchToProps (dispatch) {
  return {
    navigateToCreateAccount: () => dispatch(navigateToCreateAccount()),
    navigateToSelectImportMethod: () => dispatch(navigateToSelectImportMethod())
  }
}

export default connect(null, mapDispatchToProps)(SelectAccount)
