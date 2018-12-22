/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getBitcoinWallets } from '@chronobank/bitcoin/redux/selectors'
import { getEthereumWalletList } from '@chronobank/ethereum/redux/selectors'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'
import WalletInfo from './WalletInfo'

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    bitcoinWallets: getBitcoinWallets(masterWalletAddress)(state),
    ethereumWallets: getEthereumWalletList(state),
  }
}

class WalletInfoContainer extends PureComponent {

  render () {
    const {
      address,
      blockchain,
      selectedCurrency,
      bitcoinWallets,
      ethereumWallets,
    } = this.props

    const wallet = blockchain === BLOCKCHAIN_ETHEREUM
      ? ethereumWallets[address]
      : bitcoinWallets[address]

    return (
      <WalletInfo
        address={address}
        blockchain={blockchain}
        selectedCurrency={selectedCurrency}
        wallet={wallet}
      />
    )
  }
}

WalletInfoContainer.propTypes = {
  bitcoinWallets: PropTypes.shape({}),
  ethereumWallets: PropTypes.shape({}),
  address: PropTypes.string,
  blockchain: PropTypes.string,
  selectedCurrency: PropTypes.string,
}

export default connect(mapStateToProps, null)(WalletInfoContainer)
