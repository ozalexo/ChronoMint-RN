import React from 'react'
import PropTypes from 'prop-types'
import TransactionIcon from '../../../src/components/TransactionIcon'

export default function StoryTransactionIcon ({ confirmations, type, mode }) {
  return (
    <TransactionIcon
      confirmations={confirmations}
      type={type}
      mode={mode}
    />
  )
}

StoryTransactionIcon.propTypes = {
  confirmations: PropTypes.number,
  type: PropTypes.oneOf(['receiving', 'sending']),
  mode: PropTypes.oneOf(['big', 'small']),
}
