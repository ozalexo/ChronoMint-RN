/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { rmqSubscribe } from '@chronobank/network/redux/thunks'
import { getSections } from '@chronobank/ethereum/redux/selectors'
import { getBitcoinWalletsList } from '@chronobank/bitcoin/redux/selectors'
import * as apiBTC from '@chronobank/bitcoin/service/api'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { updateBitcoinWalletBalance } from '@chronobank/bitcoin/redux/thunks'
import { parseByDefaultBitcoinLikeBlockchainBalanceData } from '@chronobank/bitcoin/utils/amount'
import PropTypes from 'prop-types'
import WalletList from './WalletList'


const mapStateToProps = (state) => ({
  sections: getSections(state),
  currentWallet: getCurrentWallet(state),
  BTCwallets: getBitcoinWalletsList(state),
})

const ActionCreators = { ...apiBTC, rmqSubscribe, updateBitcoinWalletBalance }

const mapDispatchToProps = (dispatch) => bindActionCreators(ActionCreators, dispatch)

class WalletListContainer extends PureComponent {

  static propTypes = {
    BTCwallets: PropTypes.arrayOf(
      PropTypes.string
    ),
    requestBitcoinSubscribeWalletByAddress: PropTypes.func,
    requestBitcoinBalanceByAddress: PropTypes.func,
    rmqSubscribe: PropTypes.func,
    getAccountTransactions: PropTypes.func,
    updateBitcoinWalletBalance: PropTypes.func,
    currentWallet: PropTypes.string,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
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


  componentDidMount () {
    const {
      requestBitcoinSubscribeWalletByAddress,
      requestBitcoinBalanceByAddress,
      updateBitcoinWalletBalance,
      rmqSubscribe,
      currentWallet,
      BTCwallets,
    } = this.props
    BTCwallets.forEach((address) => {
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
                handler: (data) => {
                  console.log("data: ...............",data)
                  updateBitcoinWalletBalance({
                    address: data.account,
                    parentAddress: currentWallet,
                    balance: data.balance.balance6.satoshis,
                    amount: data.balance.balance6.amount,
                  })
                },
              })
            })
        })
        .catch((error) => { console.log('HTTP response ERROR:', error) })
    })
  }

  render () {
    const { navigation, sections } = this.props
    return (
      <WalletList
        navigate={navigation.navigate}
        sections={sections}
      />
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WalletListContainer)
