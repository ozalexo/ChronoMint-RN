/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { type Dispatch } from 'redux'
import { DUCK_MARKET } from '@chronobank/core/redux/market/action'
import { selectWallet } from '@chronobank/core/redux/wallet/actions'
import WalletsListItem, {
  type TWalletsListItemProps,
} from '../components/WalletsListItem'

type TWalletsListItemContainerProps = TWalletsListItemProps & {
  selectWallet(blockchain: string, address: string): void,
  navigator: any,
}

const makeMapStateToProps = (origState, origProps) => {
  const blockchain = origProps.blockchain
  const address = origProps.address
  const selectedCurrency = origState.get(DUCK_MARKET).selectedCurrency

  const mapStateToProps = (state) => {
    return {
      address,
      blockchain,
      selectedCurrency
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  selectWallet: (blockchain: string, address: string) =>
    dispatch(selectWallet(blockchain, address))
})

class WalletsListItemContainer extends PureComponent<TWalletsListItemContainerProps> {
  handleItemPress = (): void => {
    this.props.selectWallet(this.props.blockchain, this.props.address)
    this.props.navigator.push({ screen: 'Wallet' })
  }

  render () {
    const {
      address,
      blockchain,
      selectedCurrency
    } = this.props

    return (
      <WalletsListItem
        address={address}
        blockchain={blockchain}
        onItemPress={this.handleItemPress}
        selectedCurrency={selectedCurrency}
      />
    )
  }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(WalletsListItemContainer)
