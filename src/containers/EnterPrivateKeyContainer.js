/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import type {
  NavigationScreenProp,
  NavigationState
} from 'react-navigation'
import EnterPrivateKey from '../screens/EnterPrivateKey'
import withLogin, { type TWithLoginProps } from '../components/withLogin'

export type TEnterPrivateKeyContainerProps = TWithLoginProps & {
  navigation: NavigationScreenProp<NavigationState>
}

type TEnterPrivateKeyContainerState = {
  privateKey: string,
}

class EnterPrivateKeyContainer extends PureComponent<TEnterPrivateKeyContainerProps, TEnterPrivateKeyContainerState> {
  state = {
    privateKey: ''
  }

  handleChangePrivateKey = (privateKey: string): void => {
    this.setState({ privateKey })
  }

  handleDone = (): void => {
    const {
      privateKey
    } = this.state

    this.props.onPrivateKeyLogin(privateKey, (err, res) => {
      if (!err) {
        this.props.navigation.navigate('SetAccountPassword', {
          isCreatingNewWallet: false,
          title: 'Set Account Password',
          privateKey
        })
      }
    })
  }

  render () {
    return (
      <EnterPrivateKey
        onChangePrivateKey={this.handleChangePrivateKey}
        onDone={this.handleDone}
      />
    )
  }
}

export default withLogin(EnterPrivateKeyContainer)
