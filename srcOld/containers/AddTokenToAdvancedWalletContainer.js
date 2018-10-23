/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import AddTokenToAdvancedWallet from '../screens/AddTokenToAdvancedWallet'

export type TAddTokenToAdvancedWalletContainerProps = {
  navigator: any,
}

class AddTokenToAdvancedWalletContainer extends PureComponent<TAddTokenToAdvancedWalletContainerProps, {}> {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Cancel',
        id: 'cancel'
      }
    ],
    rightButtons: [
      {
        title: 'Add',
        id: 'add'
      }
    ]
  }

  constructor (props: TAddTokenToAdvancedWalletContainerProps) {
    super(props)

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
  }

  handleNavigatorEvent = ({ type, id }: { type: string, id: string }) => {
    if (type === 'NavBarButtonPress' && id === 'cancel') {
      this.props.navigator.pop()
    }
    if (type === 'NavBarButtonPress' && id === 'addWallet') {
      alert('Token Added')
    }
  }

  render () {
    return (<AddTokenToAdvancedWallet />)
  }
}

export default AddTokenToAdvancedWalletContainer
