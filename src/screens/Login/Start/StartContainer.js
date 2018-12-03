/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { getEthAccounts } from '@chronobank/ethereum/redux/selectors'
import Start from './Start'

const mapStateToProps = (state) => {
  return {
    accounts: getEthAccounts(state),
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

class StartContainer extends PureComponent {
  constructor (props) {
    super(props)
    this.state={
      showAccountsList: props.accounts && props.accounts.length !== 0 ? true : false,
    }
  }

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

  handleContentToggle = () => {
    this.setState({ showAccountsList: !this.state.showAccountsList })
  }

  render () {
    const { accounts } = this.props
    const { showAccountsList } = this.state
    return (
      <Start
        onClickUseExistingButton={this.handleUseExistingButtonClick}
        onClickCreateWalletButton={this.handleCreateWalletButtonClick}
        onSelectAccount={this.handleSelectAccount}
        accounts={accounts}
        showAccountsList={showAccountsList}
        onToggleScreenContent={this.handleContentToggle}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartContainer)
