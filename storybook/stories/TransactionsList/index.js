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
  transactions: [
    {
      address: 'test address',
      amount: 1,
      confirmations: 1,
      symbol: 'test symbol',
      type: 'sending',
    },
    {
      address: 'second test address',
      amount: 2,
      confirmations: 2,
      symbol: 'second test symbol',
      type: 'receiving',
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
