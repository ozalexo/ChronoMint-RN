/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import EnterPrivateKey from './EnterPrivateKey'

class EnterPrivateKeyContainer extends PureComponent {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    privateKey: '',
    error: '',
  }

  handleChangePrivateKey = (name, value) => {
    this.setState({ [name]: value })
  }

  handleDone = () => {
    const {
      navigation,
      // onPrivateKeyLogin,
    } = this.props
    const { privateKey } = this.state

    // onPrivateKeyLogin(privateKey)
    if (privateKey.length <= 6) {
      this.setState({ error: 'Private Key is too short' })
    } else {
      navigation.navigate('SetAccountPassword')
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
