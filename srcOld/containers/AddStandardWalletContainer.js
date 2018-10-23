/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import AddStandardWallet from '../screens/AddStandardWallet'

export type TAddStandardWalletContainerProps = {
  navigator: any,
}

class AddStandardWalletContainer extends PureComponent<TAddStandardWalletContainerProps, {}> {
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

  constructor (props: TAddStandardWalletContainerProps) {
    super(props)

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
  }

  handleNavigatorEvent = ({ type, id }: { type: string, id: string }) => {
    if (type === 'NavBarButtonPress' && id === 'cancel') {
      this.props.navigator.pop()
    }
  }

  render () {
    return (<AddStandardWallet />)
  }
}

export default AddStandardWalletContainer
