/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {
  Alert,
} from 'react-native'
import {
  requestBitcoinTransactionsHistoryByAddress,
} from '@chronobank/bitcoin/service/api'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { updateBitcoinTxHistory } from '@chronobank/bitcoin/redux/thunks'
import { convertSatoshiToBTC } from '@chronobank/bitcoin/utils/amount'
import { getBitcoinCurrentWallet } from '@chronobank/bitcoin/redux/selectors'
import PropTypes from 'prop-types'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'
import Wallet from './Wallet'

const mapStateToProps = (state) => {
  return {
    currentBTCWallet: getBitcoinCurrentWallet(state),
    masterWalletAddress: getCurrentWallet(state),
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  requestBitcoinTransactionsHistoryByAddress,
  updateBitcoinTxHistory,
}, dispatch)

class WalletContainer extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    requestBitcoinTransactionsHistoryByAddress: PropTypes.func,
    createBitcoinTxHistory: PropTypes.func,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      state: PropTypes.shape({
        params: PropTypes.shape({
          address: PropTypes.string,
          blockchain: PropTypes.string,
          selectedCurrency: PropTypes.string,
          masterWalletAddress: PropTypes.string,
        }),
      }),
    }),
  }

  componentDidMount () {
    const { address, parentAddress } = this.props.navigation.state.params
    const { updateBitcoinTxHistory, requestBitcoinTransactionsHistoryByAddress } = this.props
    requestBitcoinTransactionsHistoryByAddress(address)
      .then((response) => {
        const timestamps = []
        const txList = response.payload.data.map((tx) => {
          timestamps.push(tx.timestamp)
          return {
            from: tx.inputs[0].address,
            to: tx.outputs[0].address,
            amount: tx.outputs[0].value,
            balance: convertSatoshiToBTC(tx.outputs[0].value).toNumber(),
            timestamp: tx.timestamp,
            hash: tx.hash,
            confirmations: tx.confirmations,
          }
        })
        updateBitcoinTxHistory({
          address,
          parentAddress,
          txList,
          latestTxDate: Math.max(...timestamps),
        })
      })
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
      masterWalletAddress,
    } = state.params

    const params = {
      address,
      blockchain,
      selectedCurrency,
      masterWalletAddress,
    }

    blockchain === BLOCKCHAIN_ETHEREUM
      ? navigate('SendEth', params)
      : navigate('Send', params)
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
    const { currentBTCWallet, navigation } = this.props
    return (
      <Wallet
        blockchain={blockchain}
        navigation={navigation}
        latestTransactionDate={
          currentBTCWallet &&
          currentBTCWallet.transactions &&
          currentBTCWallet.transactions.latestTxDate
          || null
        }
        transactions={
          currentBTCWallet &&
          currentBTCWallet.transactions &&
          currentBTCWallet.transactions.txList
          || []
        }
        address={address}
        selectedCurrency={selectedCurrency}
        onSend={this.handleSend}
        onReceive={this.handleReceive}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer)
