/* Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { connect } from 'react-redux'
import { selectCurrentCurrency } from '@chronobank/market/redux/selectors'
import WalletInfo from './WalletInfo'

const mapStateToProps = (state) => {
  return {
    address: '0xcasd5ad456a46qw45asd46asd', //for testing
    blockchain: 'ETH', //for testing
    selectedCurrency: selectCurrentCurrency(state),
  }
}

export default connect(mapStateToProps, null)(WalletInfo)
