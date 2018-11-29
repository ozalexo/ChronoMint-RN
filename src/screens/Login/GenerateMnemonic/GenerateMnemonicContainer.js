/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { generateMnemonic } from '@chronobank/ethereum/utils'
import PropTypes from 'prop-types'
import GenerateMnemonic from './GenerateMnemonic'

class GenerateMnemonicContainer extends PureComponent {

  state = {
    mnemonic: '',
  }

  componentDidMount () {
    generateMnemonic()
      .then((resolve) => {
        this.setState({ mnemonic: resolve })
      })
  }


  handleConfirm = () => {
    const { mnemonic } = this.state
    const { navigation } = this.props
    const { password } = navigation.state.params

    const params = {
      mnemonic,
      password,
    }

    navigation.navigate('ConfirmMnemonic', params)

  }

  render () {
    const { mnemonic } = this.state
    return (
      <GenerateMnemonic
        mnemonic={mnemonic}
        onConfirm={this.handleConfirm}
      />
    )
  }
}

GenerateMnemonicContainer.propTypes = {
  password: PropTypes.string,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        password: PropTypes.string,
      }),
    }),
  }),
}

export default GenerateMnemonicContainer
