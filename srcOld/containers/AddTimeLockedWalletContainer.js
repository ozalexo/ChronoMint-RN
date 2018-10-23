/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import AddTimeLockedWallet from '../screens/AddTimeLockedWallet'

export type TAddTimeLockedWalletContainerProps = {
  navigator: any
}

class AddTimeLockedWalletContainer extends PureComponent<TAddTimeLockedWalletContainerProps, {}> {
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

  constructor (props: TAddTimeLockedWalletContainerProps) {
    super(props)

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
  }

  handleNavigatorEvent = ({ type, id }: { type: string, id: string }) => {
    if (type === 'NavBarButtonPress' && id === 'cancel') {
      this.props.navigator.pop()
    }
  }
  render () {
    return (<AddTimeLockedWallet />)
  }
}

export default AddTimeLockedWalletContainer
