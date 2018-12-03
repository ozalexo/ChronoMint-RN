/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getEthAccounts } from '@chronobank/ethereum/redux/selectors'
import Start from './Start'

/* eslint-disable no-unused-vars */
const mapStateToProps = (state) => {
  return {
    accounts: getEthAccounts(state),
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
    accounts: PropTypes.arrayOf(PropTypes.shape({
      address: PropTypes.string,
    })),
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  handleUseExistingButtonClick = () => {
    this.props.navigation.navigate('ImportMethod')
  }

  handleCreateWalletButtonClick = (values, { setSubmitting }) => {
    setSubmitting(false)
    const params = {
      password: values.password,
    }
    this.props.navigation.navigate('GenerateMnemonic', params)
  }

  handleSelectAccount = (account) => () => {
    const { navigate } = this.props.navigation
    const params = {
      account,
    }
    navigate('Login', params)
  }

  render () {
    const { accounts } = this.props
    return (
      <Start
        onClickUseExistingButton={this.handleUseExistingButtonClick}
        onClickCreateWalletButton={this.handleCreateWalletButtonClick}
        onSelectAccount={this.handleSelectAccount}
        accounts={accounts}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartContainer)
