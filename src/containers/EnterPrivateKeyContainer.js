/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import EnterPrivateKey from '../screens/EnterPrivateKey'
import withLogin, { type TWithLoginProps } from '../components/withLogin'

export type TEnterPrivateKeyContainerProps = TWithLoginProps & {
  navigator: any,
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
      navigator,
      onPrivateKeyLogin
    } = this.props
    const {
      privateKey
    } = this.state

    onPrivateKeyLogin(privateKey)

    navigator.push({
      screen: 'CreateAccount',
      title: 'Set Account Password',
      passProps: {
        privateKey: privateKey
      }
    })
  }

  render () {
    return (<EnterPrivateKey
      onChangePrivateKey={this.handleChangePrivateKey}
      onDone={this.handleDone}
    />)
  }
}

export default withLogin(EnterPrivateKeyContainer)
