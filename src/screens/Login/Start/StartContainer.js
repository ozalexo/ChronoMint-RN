/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import configureStore from '../../../store/configureStore'
import { loginThunk, logoutThunk } from '../../../redux/session/thunks'
import Start from './Start'

const { store } = configureStore()

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

class StartContainer extends PureComponent {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount () {
    store.dispatch(loginThunk('0xf1106d1eb597ef2f14c8f5343c1b4203fa0f2e9b')) //check login
    store.dispatch(logoutThunk()) //check login
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
