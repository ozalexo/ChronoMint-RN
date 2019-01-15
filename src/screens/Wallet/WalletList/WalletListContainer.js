/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { getSections } from '@chronobank/session/redux/selectors'
import { dropEthereumSelectedWallet } from '@chronobank/ethereum/redux/thunks'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { dropBitcoinSelectedWallet } from '@chronobank/bitcoin/redux/thunks'
import WalletList from './WalletList'

const ActionCreators = {
  dropBitcoinSelectedWallet,
  dropEthereumSelectedWallet,
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ActionCreators, dispatch)

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    sections: getSections(masterWalletAddress)(state),
  }
}

class WalletListContainer extends PureComponent {

  static propTypes = {
    dropBitcoinSelectedWallet: PropTypes.func,
    dropEthereumSelectedWallet: PropTypes.func,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.arrayOf(
          PropTypes.shape({
            address: PropTypes.string,
            blockchain: PropTypes.string,
          })
        ),
        title: PropTypes.string,
      })
    ),
  }

  handleRemoveSelectedWallet = () => {
    this.props.dropBitcoinSelectedWallet()
    this.props.dropEthereumSelectedWallet()
  }

  render () {
    const { navigation, sections } = this.props

    return (
      <WalletList
        navigation={navigation}
        sections={sections}
        onRemoveSelectedWallet={this.handleRemoveSelectedWallet}
      />
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WalletListContainer)
