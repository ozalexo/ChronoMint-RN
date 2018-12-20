/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getBitcoinWallets } from '@chronobank/bitcoin/redux/selectors'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import WalletInfo from './WalletInfo'

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    bitcoinWallets: getBitcoinWallets(masterWalletAddress)(state),
  }
}

class WalletInfoContainer extends PureComponent {

  render () {
    const {
      address,
      blockchain,
      selectedCurrency,
      bitcoinWallets,
    } = this.props

    return (
      <WalletInfo
        address={address}
        blockchain={blockchain}
        selectedCurrency={selectedCurrency}
        bitcoinWallet={bitcoinWallets[address]}
      />
    )
  }
}

WalletInfoContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  bitcoinWallets: PropTypes.shape({}),
  masterWalletAddress: PropTypes.string,
  address: PropTypes.string,
  blockchain: PropTypes.string,
  selectedCurrency: PropTypes.string,
  selectBitcoinWallet: PropTypes.func,
}

export default connect(mapStateToProps, null)(WalletInfoContainer)
