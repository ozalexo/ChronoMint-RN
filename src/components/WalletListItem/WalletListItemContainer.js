/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectCurrentCurrency } from '@chronobank/market/redux/selectors'
// import { selectWallet } from '@chronobank/core/redux/wallet/actions'
import WalletListItem from './WalletListItem'

const mapStateToProps = (state) => {
  return {
    selectedCurrency: selectCurrentCurrency(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectWallet: (blockchain, address) => { }, // dispatch(selectWallet(blockchain, address))
})
/* eslint-enable no-unused-vars */

class WalletListItemContainer extends PureComponent {
  handleItemPress = () => {
    const {
      selectWallet,
      address,
      blockchain,
      navigate,
      selectedCurrency,
    } = this.props
    const params = {
      blockchain,
      address,
      selectedCurrency,
    }
    // selectWallet(blockchain, address)
    navigate('Wallet', params)
  }

  render () {
    const {
      address,
      blockchain,
      selectedCurrency,
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
  navigate: PropTypes.func,
  address: PropTypes.string,
  blockchain: PropTypes.string,
  selectedCurrency: PropTypes.string,
  selectWallet: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletListItemContainer)
