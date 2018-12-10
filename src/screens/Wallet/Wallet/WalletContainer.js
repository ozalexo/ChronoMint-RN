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
import { rmqSubscribe } from '@chronobank/network/redux/thunks'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import * as apiBTC from '@chronobank/bitcoin/service/api'
import { updateBitcoinWalletBalance } from '@chronobank/bitcoin/redux/thunks'
import { parseByDefaultBitcoinLikeBlockchainBalanceData } from '@chronobank/bitcoin/utils/amount'
import PropTypes from 'prop-types'
import Wallet from './Wallet'

const mapStateToProps = (state) => {
  return {
    currentWallet: getCurrentWallet(state),
  }
}

const ActionCreators = { ...apiBTC, rmqSubscribe, updateBitcoinWalletBalance }

const mapDispatchToProps = (dispatch) => bindActionCreators(ActionCreators, dispatch)

class WalletContainer extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    getAccountTransactions: PropTypes.func,
    updateBitcoinWalletBalance: PropTypes.func,
    currentWallet: PropTypes.string,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      state: PropTypes.shape({
        params: PropTypes.shape({
          address: PropTypes.string,
          blockchain: PropTypes.string,
          selectedCurrency: PropTypes.string,
        }),
      }),
    }),
  }

  componentDidMount () {
    const {
      navigation,
      requestBitcoinSubscribeWalletByAddress,
      requestBitcoinBalanceByAddress,
      updateBitcoinWalletBalance,
      rmqSubscribe,
      currentWallet,
    } = this.props
    const {
      address,
    } = navigation.state.params
    requestBitcoinSubscribeWalletByAddress(address)
      .then(() => {
        requestBitcoinBalanceByAddress(address)
          .then((balance) => {
            updateBitcoinWalletBalance({
              address,
              parentAddress: currentWallet,
              balance: balance.payload.data.confirmations6.satoshis,
              amount: balance.payload.data.confirmations6.amount,
            })
            console.log('balance: ', parseByDefaultBitcoinLikeBlockchainBalanceData(balance))
            rmqSubscribe({
              channel: `/exchange/events/internal-testnet-bitcoin-middleware-chronobank-io_balance.${address}`,
              handler: (data) => { console.log('HERE IS DATA FROM WEBSOCKET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ', data) },
            })
          })
      })
      .catch((error) => { console.log('HTTP response ERROR:', error) })
  }

  handleSend = () => {
    // TODO: [AO] This is temporary limitation. At the moment we can't send not-ETH funds
    const {
      navigate,
      state,
    } = this.props.navigation
    const { address, blockchain } = state.params

    const params = {
      address,
      blockchain,
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
