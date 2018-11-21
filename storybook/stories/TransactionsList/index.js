import React from 'react'
import PropTypes from 'prop-types'
import TransactionsList from '../../../src/components/TransactionsList'

const StoryTransactionsList = ({
  transactions,
  refreshTransactionsList,
  mainWalletTransactionLoadingStatus,
  latestTransactionDate,
  navigator,
}) => {
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

export default StoryTransactionsList
