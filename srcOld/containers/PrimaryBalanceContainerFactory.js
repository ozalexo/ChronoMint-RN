/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { connect } from 'react-redux'

import {
  walletPrimaryBalanceSelector
} from '../redux/mainWallet/selectors'

// incoming props
export type TPrimaryBalanceFactoryProps = {
  blockchain: string,
  selectedCurrency: string,
}

// outgoing props
export type TPrimaryBalanceProps = {
  balance: number,
  selectedCurrency: string,
}

const makeMapStateToProps = (origState, origProps) => {
  const getPrimaryBalance = walletPrimaryBalanceSelector(origProps.blockchain)
  const mapStateToProps = (state) => {
    const balance = getPrimaryBalance(state)
    return {
      balance
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, null)
