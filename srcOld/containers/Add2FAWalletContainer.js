/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import Add2FAWallet from '../screens/Add2FAWallet'

export type TAdd2FAWalletContainerProps = {
  navigator: any,
}

class Add2FAWalletContainer extends PureComponent<TAdd2FAWalletContainerProps, {}> {
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

  constructor (props: TAdd2FAWalletContainerProps) {
    super(props)

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
  }

  handleNavigatorEvent = ({ type, id }: { type: string, id: string }) => {
    if (type === 'NavBarButtonPress' && id === 'cancel') {
      this.props.navigator.pop()
    }
  }

  render () {
    return (<Add2FAWallet />)
  }
}

export default Add2FAWalletContainer
