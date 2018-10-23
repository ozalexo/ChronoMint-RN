/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

// #region imports

import { connect } from 'react-redux'
import WalletTokensTab from '../screens/WalletTokensTab'
import {
  getSelectedWalletStore,
  getMarketPricesSelectedCurrencyStore,
} from '../redux/wallet/selectors'
import {
  tokensAndAmountsSelector,
} from '../redux/mainWallet/selectors'

// #endregion

// #region maps

const makeMapStateToProps = (origState) => {
  const { blockchain } = getSelectedWalletStore(origState)
  const getTokens = tokensAndAmountsSelector(blockchain)
  const mapStateToProps = (state) => {
    return {
      blockchain,
      selectedCurrency: getMarketPricesSelectedCurrencyStore(state),
      tokens: getTokens(state)
    }
  }
  return mapStateToProps
}

// #endregions

export default connect(makeMapStateToProps, null)(WalletTokensTab)
