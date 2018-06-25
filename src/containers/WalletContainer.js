/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

// #region imports

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Alert
} from 'react-native'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/core/dao/EthereumDAO'
import { BLOCKCHAIN_NEM } from '@chronobank/core/dao/NemDAO'
import {
  getSelectedWalletStore,
  type TSelectedWallet,
} from '../redux/wallet/selectors'
import Wallet, {
  type TWalletProps,
} from '../screens/Wallet'
import WalletTokensTab from '../containers/WalletTokensTabContainer'
import WalletTransactionsTab from '../screens/WalletTransactionsTab'
import {
  SceneMap,
  type Route,
  type NavigationState
} from 'react-native-tab-view'

// #endregion

// #region types
type TTabRoute = {
  key: string,
  title: string,
}

export type TWalletContainerState = NavigationState<Route<TTabRoute>>

type TWalletContainerProps = TWalletProps & {
  getAccountTransactions(): void,
  address: string,
}

// #endregion

// #region maps

const makeMapStateToProps = (origState) => {
  const selectedWallet: TSelectedWallet = getSelectedWalletStore(origState)

  const mapStateToProps = () => {
    return {
      address: selectedWallet.address,
      blockchain: selectedWallet.blockchain
    }
  }
  return mapStateToProps
}

// #endregion

class WalletContainer extends Component<TWalletContainerProps, TWalletContainerState> {
  constructor (props) {
    super(props)
    this.props.navigator.setTitle({ title: `My ${props.blockchain} Wallet` }) // TODO: to fix bug with blinking header
    const defaultState = {
      index: 0,
      routes: [
        { key: 'transactions', title: 'Transactions' }
      ]
    }
    if (this.props.blockchain === BLOCKCHAIN_ETHEREUM || this.props.blockchain === BLOCKCHAIN_NEM) {
      defaultState.routes.push({ key: 'tokens', title: 'Tokens' })
    }
    this.state = { ...defaultState }
  }

  handleSend = () => {
    // TODO: [AO] This is temporary limitation. At the moment we can't send not-ETH funds
    if (this.props.blockchain === BLOCKCHAIN_NEM) {
      Alert.alert(
        'Work in progress',
        'Sorry, sending NEM funds still in development. Please choose Ethereum or BitCoin-like wallet to continue.',
        [{ text: 'Ok', onPress: () => {}, style: 'cancel' }])
    } else {
      const {
        address,
        blockchain
      } = this.props

      this.props.navigator.push({
        screen: 'Send',
        title: 'Send Funds',
        passProps: {
          address: address,
          blockchain: blockchain
        }
      })
    }
  }

  handleReceive = () => {
    Alert.alert(
      'Work in progress',
      'Sorry, receiving is under construction still.',
      [{ text: 'Ok', onPress: () => {}, style: 'cancel' }]
    )
  }

  handleIndexChange = (index: number) =>
    this.setState({
      // [AO] This state is using via onIndexChange below
      // eslint-disable-next-line react/no-unused-state
      index
    })

  render () {
    const {
      blockchain,
      navigator
    } = this.props
    return (
      <Wallet
        blockchain={blockchain}
        onIndexChange={this.handleIndexChange}
        navigationState={this.state}
        navigator={navigator}
        renderScene={SceneMap({
          transactions: () => <WalletTransactionsTab navigator={this.props.navigator} />,
          tokens: WalletTokensTab
        })}
        onSend={this.handleSend}
        onReceive={this.handleReceive}
      />
    )
  }
}

export default connect(makeMapStateToProps, null)(WalletContainer)
