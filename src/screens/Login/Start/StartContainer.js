/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Start from './Start'

/* eslint-disable no-unused-vars */
const mapStateToProps = (ownState, ownProps) => {
  return {
    accounts: null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigateToImportWallet: () => { },
  }
}
/* eslint-enable no-unused-vars */

class StartContainer extends PureComponent {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  handleUseExistingButtonClick = () => {
    this.props.navigation.navigate('ImportMethod')
  }

  handleCreateWalletButtonClick = (values, { setSubmitting }) => {
    setSubmitting(false)
    this.props.navigation.navigate('GenerateMnemonic')
  }

  render () {
    return (
      <Start
        onClickUseExistingButton={this.handleUseExistingButtonClick}
        onClickCreateWalletButton={this.handleCreateWalletButtonClick}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartContainer)
