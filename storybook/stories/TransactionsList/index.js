import React from 'react'
import PropTypes from 'prop-types'
import TransactionsList from '../../../src/components/TransactionsList'

export default function StoryTransactionsList ({
  transactions,
  refreshTransactionsList,
  mainWalletTransactionLoadingStatus,
  latestTransactionDate,
  navigator,
}) {
  return (
    <TransactionsList
      transactions={transactions}
      refreshTransactionsList={refreshTransactionsList}
      mainWalletTransactionLoadingStatus={mainWalletTransactionLoadingStatus}
      latestTransactionDate={latestTransactionDate}
      navigator={navigator}
    />
  )
}

StoryTransactionsList.defaultProps = {
  mainWalletTransactionLoadingStatus: false,
  latestTransactionDate: '1541506809717',
  transactions: [
    {
      address: 'test address',
      amount: 0.001,
      confirmations: 0,
      symbol: 'BCC',
      type: 'sending',
    },
    {
      address: 'test address',
      amount: 100,
      confirmations: 1,
      symbol: 'WAVES',
      type: 'sending',
    },
    {
      address: '0xf1106d1eb597ef2f14c8f5343c1b4203fa0f2e9b',
      amount: 99,
      confirmations: 2,
      symbol: 'BTC',
      type: 'receiving',
    }, {
      address: 'test address',
      amount: 0.001,
      confirmations: 3,
      symbol: 'LHT',
      type: 'sending',
    },
    {
      address: 'second test address',
      amount: 45,
      confirmations: 4,
      symbol: 'LTC',
      type: 'receiving',
    }, {
      address: '0xf1106d1eb597ef2f14c8f5343c1b4203fa0f2e9b',
      amount: 0.001,
      confirmations: 4,
      symbol: 'ETH',
      type: 'sending',
    },
  ],
  refreshTransactionsList: () => { },
}

StoryTransactionsList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
      amount: PropTypes.number,
      confirmations: PropTypes.number,
      symbol: PropTypes.string,
      type: PropTypes.oneOf(['receiving', 'sending']),
    })
  ),
  refreshTransactionsList: PropTypes.func,
}
