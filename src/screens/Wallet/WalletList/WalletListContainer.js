/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { rmqSubscribe } from '@chronobank/network/redux/thunks'
import { getSections } from '@chronobank/ethereum/redux/selectors'
import { getBitcoinWalletsList } from '@chronobank/bitcoin/redux/selectors'
import * as apiBTC from '@chronobank/bitcoin/service/api'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { updateBitcoinBalance, dropBitcoinSelectedWallet } from '@chronobank/bitcoin/redux/thunks'
import { parseByDefaultBitcoinLikeBlockchainBalanceData } from '@chronobank/bitcoin/utils/amount'
import WalletList from './WalletList'


const mapStateToProps = (state) => ({
  sections: getSections(state),
  currentWallet: getCurrentWallet(state),
  BTCwalletsList: getBitcoinWalletsList(state),
})

const ActionCreators = { ...apiBTC, rmqSubscribe, updateBitcoinBalance, dropBitcoinSelectedWallet }

const mapDispatchToProps = (dispatch) => bindActionCreators(ActionCreators, dispatch)

class WalletListContainer extends PureComponent {

  static propTypes = {
    BTCwalletsList: PropTypes.arrayOf(
      PropTypes.string
    ),
    dropBitcoinSelectedWallet: PropTypes.func,
    requestBitcoinSubscribeWalletByAddress: PropTypes.func,
    requestBitcoinBalanceByAddress: PropTypes.func,
    rmqSubscribe: PropTypes.func,
    getAccountTransactions: PropTypes.func,
    updateBitcoinBalance: PropTypes.func,
    currentWallet: PropTypes.string,
    navigation: PropTypes.shape({}),
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.arrayOf(
          PropTypes.shape({
            address: PropTypes.string,
            blockchain: PropTypes.string,
          })
        ),
        title: PropTypes.string,
      })
    ),
  }

  handleRemoveSelectedWallet = () => {
    this.props.dropBitcoinSelectedWallet()
  }

  componentDidMount () {
    const {
      requestBitcoinSubscribeWalletByAddress,
      requestBitcoinBalanceByAddress,
      updateBitcoinBalance,
      rmqSubscribe,
      currentWallet,
      BTCwalletsList,
    } = this.props
    BTCwalletsList.forEach((address) => {
      rmqSubscribe({
        channel: `/exchange/events/internal-testnet-bitcoin-middleware-chronobank-io_balance.${address}`,
        handler: (data) => {
          console.log("data: ...............", data)
          updateBitcoinBalance({
            address: data.account,
            parentAddress: currentWallet,
            balance: data.balance.balance6.satoshis,
            amount: data.balance.balance6.amount,
          })
        },
      })
      requestBitcoinSubscribeWalletByAddress(address)
        .then(() => {
          requestBitcoinBalanceByAddress(address)
            .then((balance) => {
              updateBitcoinBalance({
                address,
                parentAddress: currentWallet,
                balance: balance.payload.data.confirmations6.satoshis,
                amount: balance.payload.data.confirmations6.amount,
              })
              console.log('balance: ', parseByDefaultBitcoinLikeBlockchainBalanceData(balance).toNumber())
            })
        })
        .catch((error) => { console.log('HTTP response ERROR:', error) })
    })
  }

  render () {
    const { navigation, sections, currentWallet } = this.props
    return (
      <WalletList
        navigation={navigation}
        sections={sections}
        parentWallet={currentWallet}
        onRemoveSelectedWallet={this.handleRemoveSelectedWallet}
      />
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WalletListContainer)
