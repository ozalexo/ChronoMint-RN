/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-native'
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

  selectWallet = ({ blockchain, address }) => {
    const {
      selectBitcoinWallet,
      selectEthereumWallet,
    } = this.props
    return blockchain === BLOCKCHAIN_ETHEREUM
      ? selectEthereumWallet({ address })
      : selectBitcoinWallet({ address })
  }

  handleItemPress = () => {
    const {
      address,
      blockchain,
      navigation,
      selectedCurrency,
      masterWalletAddress,
    } = this.props

    const params = {
      blockchain,
      address,
      selectedCurrency,
      masterWalletAddress,
    }

    this.selectWallet({ blockchain, address })
      .then(() => {
        navigation.navigate('Wallet', params)
      })
      .catch((error) => {
        Alert.alert('Can\'t select wallet. ', error)
      })
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
  selectEthereumWallet: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletListItemContainer)
