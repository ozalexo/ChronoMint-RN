/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Alert,
} from 'react-native'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import PropTypes from 'prop-types'
import Wallet from './Wallet'

const mapStateToProps = (state) => {
  return {
    currentWallet: getCurrentWallet(state),
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

class WalletContainer extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    getAccountTransactions: PropTypes.func,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      state: PropTypes.shape({
        params: PropTypes.shape({
          address: PropTypes.string,
          blockchain: PropTypes.string,
          selectedCurrency: PropTypes.string,
          parentAddress: PropTypes.string,
        }),
      }),
    }),
  }

  handleSend = () => {
    // TODO: [AO] This is temporary limitation. At the moment we can't send not-ETH funds
    const {
      navigate,
      state,
    } = this.props.navigation
    const {
      address,
      blockchain,
      selectedCurrency,
      parentAddress,
    } = state.params

    const params = {
      address,
      blockchain,
      selectedCurrency,
      parentAddress,
    }

    navigate('Send', params)
  }

  handleReceive = () => {
    Alert.alert(
      'Work in progress',
      'Sorry, receiving is under construction still.',
      [{ text: 'Ok', onPress: () => { }, style: 'cancel' }]
    )
  }

  handleIndexChange = (index) =>
    this.setState({
      // [AO] This state is using via onIndexChange below
      // eslint-disable-next-line react/no-unused-state
      index,
    })

  render () {
    const {
      blockchain,
      address,
      selectedCurrency,
    } = this.props.navigation.state.params
    return (
      <Wallet
        blockchain={blockchain}
        address={address}
        selectedCurrency={selectedCurrency}
        onSend={this.handleSend}
        onReceive={this.handleReceive}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer)
