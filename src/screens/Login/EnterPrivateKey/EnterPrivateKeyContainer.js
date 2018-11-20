/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import EnterPrivateKey from './EnterPrivateKey'

class EnterPrivateKeyContainer extends PureComponent {
  state = {
    privateKey: '',
    error: '',
  }

  handleChangePrivateKey = (privateKey) => {
    this.setState({ privateKey })
  }

  handleDone = () => {
    const { navigation, onPrivateKeyLogin } = this.props
    const { privateKey } = this.state

    // onPrivateKeyLogin(privateKey)
    if (privateKey.length <= 6) {
      this.setState({ error: 'Private Key is too short' })
    } else {
      this.setState({ error: '' })
      navigation.navigate('StartPage')
    }
  }

  render () {
    const { error } = this.state
    return (
      <EnterPrivateKey
        onChangePrivateKey={this.handleChangePrivateKey}
        onDone={this.handleDone}
        error={error}
      />
    )
  }
}

export default EnterPrivateKeyContainer
