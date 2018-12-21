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
import { selectBitcoinWallet } from '@chronobank/bitcoin/redux/thunks'
import { ethereumSelectWallet } from '@chronobank/ethereum/redux/thunks'
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
  ethereumSelectWallet,
}, dispatch)

class WalletListItemContainer extends PureComponent {

  handleItemPress = () => {
    const {
      address,
      blockchain,
      navigation,
      selectedCurrency,
      selectBitcoinWallet,
      ethereumSelectWallet,
      masterWalletAddress,
    } = this.props

    const params = {
      blockchain,
      address,
      selectedCurrency,
      masterWalletAddress,
    }

    blockchain === BLOCKCHAIN_ETHEREUM
      ? ethereumSelectWallet({ address })
      : selectBitcoinWallet({ address })
    navigation.navigate('Wallet', params)
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
        onItemPress={this.handleItemPress}
        selectedCurrency={selectedCurrency}
        wallet={wallet}
      />
    )
  }
}

WalletListItemContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  wallet: PropTypes.shape({}),
  masterWalletAddress: PropTypes.string,
  address: PropTypes.string,
  blockchain: PropTypes.string,
  selectedCurrency: PropTypes.string,
  selectBitcoinWallet: PropTypes.func,
  ethereumSelectWallet: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletListItemContainer)
