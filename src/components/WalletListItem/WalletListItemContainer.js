/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Clipboard } from 'react-native'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { selectCurrentCurrency } from '@chronobank/market/redux/selectors'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'
import { selectBitcoinWallet } from '@chronobank/bitcoin/redux/thunks'
import { selectEthereumWallet } from '@chronobank/ethereum/redux/thunks'
import { getCurrentWallet, getWalletByBlockchainAndAddress } from '@chronobank/session/redux/selectors'
import WalletListItem from './WalletListItem'

const mapStateToProps = (state, props) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    selectedCurrency: selectCurrentCurrency(state),
    wallet: getWalletByBlockchainAndAddress(props.blockchain, props.address, masterWalletAddress)(state),
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  selectBitcoinWallet,
  selectEthereumWallet,
}, dispatch)

class WalletListItemContainer extends PureComponent {

  handleItemPress = () => {
    const {
      address,
      blockchain,
      navigation,
      selectBitcoinWallet,
      selectEthereumWallet,
      masterWalletAddress,
    } = this.props

    const params = {
      blockchain,
    }

    blockchain === BLOCKCHAIN_ETHEREUM
      ? selectEthereumWallet({ address, masterWalletAddress })
      : selectBitcoinWallet({ address, masterWalletAddress })
    navigation.navigate('Wallet', params)
  }

  handleCopyAddress = () => {
    Clipboard.setString(this.props.address)
  }

  render () {
    const {
      address,
      blockchain,
      selectedCurrency,
      wallet,
    } = this.props

    return (
      <WalletListItem
        address={address}
        blockchain={blockchain}
        selectedCurrency={selectedCurrency}
        wallet={wallet}
        onItemPress={this.handleItemPress}
        onCopyAddress={this.handleCopyAddress}
      />
    )
  }
}

WalletListItemContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  wallet: PropTypes.shape({}),
  address: PropTypes.string,
  blockchain: PropTypes.string,
  selectedCurrency: PropTypes.string,
  masterWalletAddress: PropTypes.string,
  selectBitcoinWallet: PropTypes.func,
  selectEthereumWallet: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletListItemContainer)
