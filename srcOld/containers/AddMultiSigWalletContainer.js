/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import AddMultiSigWallet from '../screens/AddMultiSigWallet'

export type TAddMultiSigWalletContainerProps = {
  navigator: any,
}

export type TWalletOwner = {
  id: string,
  name: string,
  address: string,
  image: string,
}

class AddMultiSigWalletContainer extends PureComponent<TAddMultiSigWalletContainerProps, {}> {
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

  constructor (props: TAddMultiSigWalletContainerProps) {
    super(props)

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
  }

  handleNavigatorEvent = ({ type, id }: { type: string, id: string }) => {
    if (type === 'NavBarButtonPress' && id === 'cancel') {
      this.props.navigator.pop()
    }
  }

  render () {
    return (<AddMultiSigWallet
      walletOwners={walletOwners}
    />)
  }
}

export default AddMultiSigWalletContainer

const walletOwners: Array<TWalletOwner> = [
  {
    id: 'you',
    name: 'You',
    address: '0x19e7e376e7c213b7e7e7e46cc70a5dd086daff2as',
    image: require('../images/profile-circle-small.png')
  }
]
