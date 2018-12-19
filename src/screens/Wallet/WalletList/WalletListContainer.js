/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { rmqSubscribe } from '@chronobank/network/redux/thunks'
import { getSections, getEthereumWalletList } from '@chronobank/ethereum/redux/selectors'
import { getBitcoinWalletsList } from '@chronobank/bitcoin/redux/selectors'
import { getBalance } from '@chronobank/ethereum/middleware/thunks'
import { updateEthereumBalance } from '@chronobank/ethereum/redux/thunks'
import * as apiBTC from '@chronobank/bitcoin/service/api'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { updateBitcoinBalance, dropBitcoinSelectedWallet } from '@chronobank/bitcoin/redux/thunks'
import { convertSatoshiToBTC } from '@chronobank/bitcoin/utils/amount'
import { parseBitcoinBalanceData } from '@chronobank/bitcoin/utils/amount'
import WalletList from './WalletList'
import * as EthAmountUtils from '@chronobank/ethereum/utils/amount'

const ActionCreators = {
  ...apiBTC,
  rmqSubscribe,
  updateBitcoinBalance,
  dropBitcoinSelectedWallet,
  getBalance,
  updateEthereumBalance,
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ActionCreators, dispatch)

const mapStateToProps = (state) => {
  return {
    sections: getSections(state),
    currentWallet: getCurrentWallet(state),
    BTCwalletsList: getBitcoinWalletsList(state),
    ETHwalletsList: getEthereumWalletList(state),
  }
}

class WalletListContainer extends PureComponent {

  static propTypes = {
    BTCwalletsList: PropTypes.arrayOf(
      PropTypes.string
    ),
    dropBitcoinSelectedWallet: PropTypes.func,
    requestBitcoinSubscribeWalletByAddress: PropTypes.func,
    requestBitcoinBalanceByAddress: PropTypes.func,
    rmqSubscribe: PropTypes.func,
    getBalance: PropTypes.func,
    updateBitcoinBalance: PropTypes.func,
    currentWallet: PropTypes.string,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
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
      getBalance,
      updateEthereumBalance,
    } = this.props

    getBalance(currentWallet)
      .then((amount) => {
        const balance = EthAmountUtils.amountToBalance(amount)
        updateEthereumBalance({ tokenSymbol: 'ETH', address: currentWallet, balance, amount })
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('Requiesting ETH balance error', error)
      })

    BTCwalletsList.forEach((address) => {
      rmqSubscribe({
        // TODO: need to get channel name from store
        channel: `/exchange/events/testnet-bitcoin-middleware-chronobank-io_balance.${address}`,
        handler: ({ body }) => {
          if (!body) {
            // TODO: need to handle possible errors in reply
            return
          }
          try {
            const data = JSON.parse(body)
            const confirmations0 = data.balances.confirmations0 
            const confirmations6 = data.balances.confirmations6
            const balance0 = convertSatoshiToBTC(confirmations0)
            const balance6 = convertSatoshiToBTC(confirmations6)

            updateBitcoinBalance({
              address: data.address,
              parentAddress: currentWallet,
              balance: balance0 || balance6,
              amount: confirmations0 || confirmations6,
            })
          } catch (error) {
            // TODO: to handle any errors here
            // Silently ignore any errors for now.
            // eslint-disable-next-line no-console
            console.log(error)
          }
        },
      })

      requestBitcoinSubscribeWalletByAddress(address)
        .then(() => {
          requestBitcoinBalanceByAddress(address)
            .then((balance) => {
              updateBitcoinBalance({
                address,
                parentAddress: currentWallet,
                balance: parseBitcoinBalanceData(balance).toNumber(),
                amount: balance.payload.data.confirmations0.amount || balance.payload.data.confirmations6.amount,
              })
            })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn('HTTP response ERROR:', error)
        })
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
