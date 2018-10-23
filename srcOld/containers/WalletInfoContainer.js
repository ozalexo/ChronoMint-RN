/* Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { connect } from 'react-redux'
import {
  getSelectedWalletStore,
  getMarketPricesSelectedCurrencyStore,
  type TSelectedWallet
} from '@chronobank/core/redux/wallet/selectors'
import WalletInfo from '../components/WalletInfo'

const mapStateToProps = (state) => {
  const selectedWallet: TSelectedWallet = getSelectedWalletStore(state)
  return {
    address: selectedWallet.address,
    blockchain: selectedWallet.blockchain,
    selectedCurrency: getMarketPricesSelectedCurrencyStore(state)
  }
}

export default connect(mapStateToProps, null)(WalletInfo)
