/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { createAccountByMnemonic } from '@chronobank/ethereum/redux/thunks'
import { getEthAccountList } from '@chronobank/ethereum/redux/selectors'
import i18n from '../../../locales/translation'
import { MNEMONIC_LENGTH } from '../../../common/constants/globals'
import ConfirmMnemonic from './ConfirmMnemonic'

const mapStateToProps = (state) => {
  return {
    accounts: getEthAccountList(state),
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createAccountByMnemonic,
}, dispatch)

class ConfirmMnemonicContainer extends PureComponent {
  constructor (props) {
    super(props)
    this.state = this.createInitialState()
  }

  handleClear = () => {
    this.resetState()
  }

  handleUndo = () => {
    const { words, mnemonic, prevWords, prevMnemonic } = this.state
    if (words != prevWords && mnemonic !== prevMnemonic) {
      this.setState({
        words: this.state.prevWords,
        mnemonic: this.state.prevMnemonic,
        disabled: true,
      })
    }
  }


  handleDone = () => {
    const {
      mnemonic,
      password,
    } = this.props.navigation.state.params
    const {
      createAccountByMnemonic,
    } = this.props

    if (mnemonic !== this.state.mnemonic.join(' ')) {
      Alert.alert(i18n.t('ConfirmMnemonic.wrongMnemonicError'))
      return this.resetState()
    }
    createAccountByMnemonic(mnemonic, password)
      .then(() => {
        this.navigateToStartPage()
      })
      .catch((error) => {
        Alert.alert(error)
      })
  }

  navigateToStartPage () {
    const {
      navigation,
      accounts,
    } = this.props
    const [account] = accounts.slice(-1)
    const params = account ? { account } : null
    const page = params ? 'Login' : 'Start'
    navigation.navigate(page, params)
  }

  handleWord = (word) => {
    if (word) {
      const { mnemonic, words, disabled } = this.state
      if (disabled) {
        this.setState({ disabled: false })
      }
      const newWords = [...words]
      newWords[newWords.indexOf(word)] = ''
      this.setState({
        prevMnemonic: mnemonic,
        prevWords: words,
        mnemonic: [...mnemonic, word],
        words: [...newWords],
      }, () => {
        if (this.state.mnemonic.length === MNEMONIC_LENGTH) {
          this.handleDone()
        }
      })
    }
  }

  createInitialState = () => {
    const { mnemonic } = this.props.navigation.state.params
    return {
      disabled: true,
      mnemonic: [],
      words: mnemonic.split(' ').sort(() => Math.random() - 0.5),
    }
  }

  resetState = () => {
    this.setState(this.createInitialState())
  }

  render () {
    const { words, mnemonic, disabled } = this.state
    return (
      <ConfirmMnemonic
        onDone={this.handleDone}
        onClear={this.handleClear}
        onUndo={this.handleUndo}
        onWord={this.handleWord}
        mnemonic={mnemonic}
        words={words}
        disabled={disabled}
      />
    )
  }
}

ConfirmMnemonicContainer.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string,
  })),
  createAccountByMnemonic: PropTypes.func,
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
