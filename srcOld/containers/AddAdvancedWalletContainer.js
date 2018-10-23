/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import AddAdvancedWallet from '../screens/AddAdvancedWallet'

export type TToken = {
  id: string,
  image: any,
  isChecked?: boolean,
  title: string,
}

export type TAddAdvancedWalletContainerProps = {
  navigator: any,
}

class AddAdvancedWalletContainer extends PureComponent<TAddAdvancedWalletContainerProps, {}> {
    static navigatorButtons = {
      leftButtons: [
        {
          title: 'Cancel',
          id: 'cancel'
        }
      ],
      rightButtons: [
        {
          title: 'Done',
          id: 'done'
        }
      ]
    }

    constructor (props: TAddAdvancedWalletContainerProps) {
      super(props)

      this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
    }

    handleNavigatorEvent = ({ type, id }: { type: string, id: string }) => {
      if (type === 'NavBarButtonPress' && id === 'cancel') {
        this.props.navigator.pop()
      }
    }

    handleAddNewToken = () => {
      this.props.navigator.push({
        screen: 'AddTokenToAdvancedWallet'
      })
    }

    render () {
      return (<AddAdvancedWallet
        onAddNewToken={this.handleAddNewToken}
        tokens={tokens}
      />)
    }
}

export default AddAdvancedWalletContainer

const tokens: Array<TToken> = [
  {
    id: 'eth',
    image: require('../images/coin-bitcoin-small.png'),
    isChecked: true,
    title: 'Ethereum'
  },
  {
    id: 'time',
    image: require('../images/coin-time-small.png'),
    title: 'Time'
  }
]
