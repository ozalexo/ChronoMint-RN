/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { selectCurrentCurrency } from '@chronobank/market/redux/selectors'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'
// import { selectWallet } from '@chronobank/core/redux/wallet/actions'
import { selectBitcoinWallet } from '@chronobank/bitcoin/redux/thunks'
import { getBitcoinWallets } from '@chronobank/bitcoin/redux/selectors'
import WalletListItem from './WalletListItem'

const mapStateToProps = (state) => {
  return {
    selectedCurrency: selectCurrentCurrency(state),
    bitcoinWallets: getBitcoinWallets(state),
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  selectBitcoinWallet,
}, dispatch)
/* eslint-enable no-unused-vars */

class WalletListItemContainer extends PureComponent {

  handleItemPress = () => {
    const {
      address,
      blockchain,
      navigation,
      selectedCurrency,
      selectBitcoinWallet,
      parentAddress,
    } = this.props
    const params = {
      blockchain,
      address,
      selectedCurrency,
      parentAddress,
    }

    blockchain === BLOCKCHAIN_ETHEREUM ? null : selectBitcoinWallet({ address })
    navigation.navigate('Wallet', params)
  }

  render () {
    const {
      address,
      blockchain,
      selectedCurrency,
      bitcoinWallets,
    } = this.props

    return (
      <WalletListItem
        address={address}
        blockchain={blockchain}
        onItemPress={this.handleItemPress}
        selectedCurrency={selectedCurrency}
        bitcoinWallet={bitcoinWallets[address]}
      />
    )
  }
}

WalletListItemContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  bitcoinWallets: PropTypes.shape({}),
  parentAddress: PropTypes.string,
  address: PropTypes.string,
  blockchain: PropTypes.string,
  selectedCurrency: PropTypes.string,
  selectBitcoinWallet: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletListItemContainer)
