/* Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import TransactionsList from '../components/TransactionsList'
import {
  selWalletSelector,
  type TSelectedWallet,
} from '../redux/wallet/selectors'
import {
  listEQTransactions,
  mwTxFetchingStatus,
} from '../redux/mainWallet/selectors'
import { getAccountTransactions } from '@chronobank/core/redux/mainWallet/actions'

const makeMapStateToProps = (origState, origProps) => {
  const selectedWallet: TSelectedWallet = selWalletSelector(origState)
  const getTransactionsData = listEQTransactions(selectedWallet.blockchain, selectedWallet.address)
  const mapStateToProps = (state) => {
    const {
      transactions,
      latestTransactionDate
    } = getTransactionsData(state)
    return {
      latestTransactionDate,
      mainWalletTransactionLoadingStatus: mwTxFetchingStatus(state),
      transactions,
      navigator: origProps.navigator
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  refreshTransactionsList: () => dispatch(getAccountTransactions())
})

export default connect(makeMapStateToProps, mapDispatchToProps)(TransactionsList)
