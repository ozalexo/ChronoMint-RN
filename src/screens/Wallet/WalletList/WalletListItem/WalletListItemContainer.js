/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { DUCK_MARKET } from '@chronobank/core/redux/market/actions'
// import { selectWallet } from '@chronobank/core/redux/wallet/actions'
import WalletListItem from './WalletListItem'

const DUCK_MARKET = 'DUCK_MARKET'
const selectWallet = () => { }
const makeMapStateToProps = (origState, origProps) => {
  const blockchain = origProps.blockchain
  const address = origProps.address
  const selectedCurrency = 'ETH'
  // const selectedCurrency = origState.get(DUCK_MARKET).selectedCurrency

  const mapStateToProps = (state) => {
    return {
      address,
      blockchain,
      selectedCurrency
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => ({
  selectWallet: (blockchain, address) =>
    {}
    // dispatch(selectWallet(blockchain, address))
})

class WalletListItemContainer extends PureComponent {
  handleItemPress = () => {
    const { selectWallet, address, blockchain, navigation } = this.props
    selectWallet(blockchain, address)
    // navigation.navigate('Wallet')
  }

  render () {
    const {
      address,
      blockchain,
      selectedCurrency
    } = this.props

    return (
      <WalletListItem
        address={address}
        blockchain={blockchain}
        onItemPress={this.handleItemPress}
        selectedCurrency={selectedCurrency}
      />
    )
  }
}

WalletListItemContainer.propTypes = {
  address: PropTypes.string,
  blockchain: PropTypes.string,
  selectedCurrency: PropTypes.string,
  selectWallet: PropTypes.func,
}

export default connect(makeMapStateToProps, mapDispatchToProps)(WalletListItemContainer)
