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
import {
  requestEthereumTransactionsHistoryByAddress,
} from '@chronobank/ethereum/service/api'
import { getCurrentEthWallet } from '@chronobank/ethereum/redux/selectors'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { updateBitcoinTxHistory } from '@chronobank/bitcoin/redux/thunks'
import { updateEthereumTxHistory } from '@chronobank/ethereum/redux/thunks'
import { convertSatoshiToBTC } from '@chronobank/bitcoin/utils/amount'
import { amountToBalance } from '@chronobank/ethereum/utils/amount'
import { getBitcoinCurrentWallet } from '@chronobank/bitcoin/redux/selectors'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'
import Wallet from './Wallet'

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    currentBTCWallet: getBitcoinCurrentWallet(masterWalletAddress)(state),
    currentETHWallet: getCurrentEthWallet(masterWalletAddress)(state),
    masterWalletAddress: getCurrentWallet(state),
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  requestBitcoinTransactionsHistoryByAddress,
  requestEthereumTransactionsHistoryByAddress,
  updateBitcoinTxHistory,
  updateEthereumTxHistory,
}, dispatch)

class WalletContainer extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    requestBitcoinTransactionsHistoryByAddress: PropTypes.func,
    requestEthereumTransactionsHistoryByAddress: PropTypes.func,
    updateBitcoinTxHistory: PropTypes.func,
    updateEthereumTxHistory: PropTypes.func,
    currentBTCWallet: PropTypes.shape({}),
    currentETHWallet: PropTypes.shape({}),
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
    const { address, blockchain, masterWalletAddress } = this.props.navigation.state.params
    const {
      requestBitcoinTransactionsHistoryByAddress,
      requestEthereumTransactionsHistoryByAddress,
      updateBitcoinTxHistory,
      updateEthereumTxHistory,
    } = this.props
    blockchain !== BLOCKCHAIN_ETHEREUM
      ? requestBitcoinTransactionsHistoryByAddress(address)
        .then((response) => {
          const timestamps = []
          const txList = response.payload.data.map((tx) => {
            timestamps.push(tx.timestamp)
            return {
              from: tx.inputs[0].address,
              to: tx.outputs[0].address,
              amount: tx.outputs[0].value,
              balance: convertSatoshiToBTC(tx.outputs[0].value),
              timestamp: tx.timestamp,
              hash: tx.hash,
              confirmations: tx.confirmations,
            }
          })
          updateBitcoinTxHistory({
            address,
            masterWalletAddress,
            txList,
            latestTxDate: Math.max(...timestamps),
          })
        })
      : requestEthereumTransactionsHistoryByAddress(address)
        .then((response) => {
          const timestamps = []
          const txList = response.payload.data.map((tx) => {
            timestamps.push(tx.timestamp)
            return {
              balance: amountToBalance(tx.value).toString(),
              blockNumber: tx.blockNumber,
              confirmations: tx.confirmations,
              from: tx.from,
              gas: tx.gas,
              gasPrice:tx. gasPrice,
              hash: tx.hash,
              index: tx.index,
              nonce: tx.nonce,
              timestamp: tx.timestamp,
              to: tx.to,
              value: tx.value,
            }
          })
          updateEthereumTxHistory({
            address,
            masterWalletAddress,
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


    const path = blockchain === BLOCKCHAIN_ETHEREUM ? 'SendEth' : 'Send'
    navigate(path, params)
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
    const { currentBTCWallet, currentETHWallet, navigation } = this.props
    const currentWallet = blockchain === BLOCKCHAIN_ETHEREUM
      ? currentETHWallet
      : currentBTCWallet
    const latestTransactionDate =
      currentWallet &&
      currentWallet.transactions &&
      currentWallet.transactions.latestTxDate
      || null
    const transactions =
      currentWallet &&
      currentWallet.transactions &&
      currentWallet.transactions.txList
      || []
    return (
      <Wallet
        blockchain={blockchain}
        navigation={navigation}
        latestTransactionDate={latestTransactionDate}
        transactions={transactions}
        address={address}
        selectedCurrency={selectedCurrency}
        onSend={this.handleSend}
        onReceive={this.handleReceive}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer)
