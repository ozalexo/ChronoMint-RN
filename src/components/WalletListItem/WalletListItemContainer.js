/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { selectCurrentCurrency } from '@chronobank/market/redux/selectors'
import { DUCK_ETHEREUM } from '@chronobank/ethereum/redux/constants'
// import { selectWallet } from '@chronobank/core/redux/wallet/actions'
import { selectBitcoinWallet } from '@chronobank/bitcoin/redux/thunks'
import WalletListItem from './WalletListItem'

const mapStateToProps = (state) => {
  return {
    selectedCurrency: selectCurrentCurrency(state),
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

    blockchain === DUCK_ETHEREUM ? null : selectBitcoinWallet({ address })
    navigation.navigate('Wallet', params)
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
  navigation: PropTypes.shape({}),
  parentAddress: PropTypes.string,
  address: PropTypes.string,
  blockchain: PropTypes.string,
  selectedCurrency: PropTypes.string,
  selectBitcoinWallet: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletListItemContainer)
