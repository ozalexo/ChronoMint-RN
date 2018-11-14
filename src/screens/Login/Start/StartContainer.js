/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { connect } from 'react-redux'
import { Alert } from 'react-native'
import Start from './Start'

const mapStateToProps = (ownState, ownProps) => {
  return {
    accounts: null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigateToImportWallet: () => {},
    handleEnterPasswordSubmit: (values, { setSubmitting }) => {
      Alert.alert(JSON.stringify(values))
      setSubmitting(false)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Start)
