/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { rmqSubscribe } from '@chronobank/network/redux/thunks'
import { getEthereumWalletList } from '@chronobank/ethereum/redux/selectors'
import { getSections } from '@chronobank/session/redux/selectors'
import { getBitcoinWalletsList } from '@chronobank/bitcoin/redux/selectors'
import { getBalance } from '@chronobank/ethereum/middleware/thunks'
import { updateEthereumBalance } from '@chronobank/ethereum/redux/thunks'
import * as apiBTC from '@chronobank/bitcoin/service/api'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { updateBitcoinBalance, updateBitcoinTxHistory, dropBitcoinSelectedWallet } from '@chronobank/bitcoin/redux/thunks'
import { convertSatoshiToBTC } from '@chronobank/bitcoin/utils/amount'
import { parseBitcoinBalanceData } from '@chronobank/bitcoin/utils/amount'
import WalletList from './WalletList'
import * as EthAmountUtils from '@chronobank/ethereum/utils/amount'

const ActionCreators = {
  ...apiBTC,
  rmqSubscribe,
  updateBitcoinBalance,
  updateBitcoinTxHistory,
  dropBitcoinSelectedWallet,
  getBalance,
  updateEthereumBalance,
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ActionCreators, dispatch)

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    sections: getSections(masterWalletAddress)(state),
    masterWalletAddress,
    BTCwalletsList: getBitcoinWalletsList(masterWalletAddress)(state),
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
    updateBitcoinTxHistory: PropTypes.func,
    requestBitcoinBalanceByAddress: PropTypes.func,
    rmqSubscribe: PropTypes.func,
    getBalance: PropTypes.func,
    updateBitcoinBalance: PropTypes.func,
    updateEthereumBalance: PropTypes.func,
    masterWalletAddress: PropTypes.string,
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
      updateBitcoinTxHistory,
      rmqSubscribe,
      masterWalletAddress,
      BTCwalletsList,
      getBalance,
      updateEthereumBalance,
    } = this.props

    getBalance(masterWalletAddress)
      .then((amount) => {
        const balance = EthAmountUtils.amountToBalance(amount)
        updateEthereumBalance({ tokenSymbol: 'ETH', address: masterWalletAddress, balance, amount })
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
              masterWalletAddress,
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

      //subscribe on transactions
      rmqSubscribe({
        // TODO: need to get channel name from store
        channel: `/exchange/events/testnet-bitcoin-middleware-chronobank-io_transaction.${address}`,
        handler: ({ body }) => {
          if (!body) {
            // TODO: need to handle possible errors in reply
            return
          }
          try {
            const data = JSON.parse(body)
            const txList = [
              {
                from: data.inputs[0].address,
                to: data.outputs[0].address,
                amount: data.outputs[0].value,
                balance: convertSatoshiToBTC(data.outputs[0].value),
                timestamp: data.timestamp,
                hash: body.hash,
                confirmations: data.confirmations,
              },
            ]
            updateBitcoinTxHistory({
              address,
              masterWalletAddress,
              txList,
              latestTxDate: data.timestamp,
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
                masterWalletAddress,
                balance: parseBitcoinBalanceData(balance),
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
    const { navigation, sections, masterWalletAddress } = this.props

    return (
      <WalletList
        navigation={navigation}
        sections={sections}
        masterWalletAddress={masterWalletAddress}
        onRemoveSelectedWallet={this.handleRemoveSelectedWallet}
      />
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WalletListContainer)
