/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { type ComponentType } from 'react'
import { connect } from 'react-redux'
import {
  walletPrimaryBalanceSelector
} from 'redux/mainWallet/selectors'

export type TWalletBalanceContainerProps = {
  blockchain: string,
  render(balance: number): ComponentType<TWalletBalanceContainerProps>,
}

const makeMapStateToProps = (origState, origProps) => {
  const getWalletPrimaryBalance = walletPrimaryBalanceSelector(origProps.blockchain)

  const mapStateToProps = (state) => {
    return {
      balance: getWalletPrimaryBalance(state)
    }
  }
  return mapStateToProps
}

const WalletBalanceContainer = ({ render, balance }) =>
  render(balance)

export default connect(makeMapStateToProps, null)(WalletBalanceContainer)
