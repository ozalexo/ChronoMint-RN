/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { createAccount } from '@chronobank/ethereum/redux/thunks'
import { MNEMONIC_LENGTH } from '../../../common/constants/globals'
import i18n from '../../../locales/translation'
import ConfirmMnemonic from './ConfirmMnemonic'

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createAccount,
}, dispatch)

class ConfirmMnemonicContainer extends PureComponent {
  constructor (props) {
    super(props)
    this.state = this.createInitialState()
  }

  handleDone = () => {
    const {
      mnemonic,
      password,
    } = this.props.navigation.state.params
    const {
      navigation,
      createAccount,
    } = this.props

    // if (mnemonic !== this.state.mnemonic.join(' ')) {
    //   this.addError(i18n.t('ConfirmMnemonic.wrongMnemonicError'))
    //   return this.resetState()
    // }

    createAccount(mnemonic, password)
    navigation.navigate('WalletList')
  }

  handleWord = (word) => () => {
    // if (word) {
    //   this.setState(({ words, mnemonic }) => {
    //     words[words.indexOf(word)] = ''

    //     return {
    //       mnemonic: [...mnemonic, word],
    //       words: [...words],
    //     }
    //   }, () => {
    //     if (this.state.mnemonic.length === MNEMONIC_LENGTH) {
          this.handleDone()
    //     }
    //   })
    // }
  }

  createInitialState = () => {
    const { mnemonic } = this.props.navigation.state.params
    return {
      mnemonic: [],
      words: mnemonic.split(' ').sort(() => Math.random() - 0.5),
    }
  }

  addError = (error) => {
    Alert.alert(error)
  }

  resetState = () => {
    this.setState(this.createInitialState())
  }

  render () {
    const { words, mnemonic } = this.state
    return (
      <ConfirmMnemonic
        onDone={this.handleDone}
        onWord={this.handleWord}
        mnemonic={mnemonic}
        words={words}
      />
    )
  }
}

ConfirmMnemonicContainer.propTypes = {
  createAccount: PropTypes.func,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        mnemonic: PropTypes.string,
        password: PropTypes.string,
      }),
    }),
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmMnemonicContainer)
