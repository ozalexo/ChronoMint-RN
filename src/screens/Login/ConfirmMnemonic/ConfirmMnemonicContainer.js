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
import { getEthAccounts } from '@chronobank/ethereum/redux/selectors'
import { MNEMONIC_LENGTH } from '../../../common/constants/globals'
import i18n from '../../../locales/translation'
import ConfirmMnemonic from './ConfirmMnemonic'

const mapStateToProps = (state) => {
  return {
    accounts: getEthAccounts(state),
  }
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
      accounts,
    } = this.props

    // if (mnemonic !== this.state.mnemonic.join(' ')) {
    //   this.addError(i18n.t('ConfirmMnemonic.wrongMnemonicError'))
    //   return this.resetState()
    // }

    createAccount(mnemonic, password)
      .then(() => {
        const [account] = accounts.slice(-1) // get last created account
        const params = account ? { account } : null
        const page = params ? 'Login' : 'Start' // need to verify that account is falsy here
        navigation.navigate(page, params)
      })
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
  accounts: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string,
  })),
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
