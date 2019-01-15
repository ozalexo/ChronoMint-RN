/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import BigNumber from 'bignumber.js'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { getCurrentEthWallet } from '@chronobank/ethereum/redux/selectors'
import { updateEthereumTxDraftSignedTx, updateEthereumTxDraftData, updateEthereumTxDraftGasLimit } from '@chronobank/ethereum/redux/thunks'
import {
  sendToken,
} from '@chronobank/ethereum/middleware/thunks'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TouchID from 'react-native-touch-id'
import * as Keychain from 'react-native-keychain'
import { ETH_PRIMARY_TOKEN } from '@chronobank/ethereum/constants'
import { decryptWallet, signEthTransaction } from '@chronobank/ethereum/utils'
import { balanceToAmount } from '@chronobank/ethereum/utils/amount'
import { name as appName } from '../../../../../../app.json'
import PasswordEnterModal from './PasswordEnterModal'

const authenticateErrors = {
  'NOT_SUPPORTED': 'Not supported.',
  'NOT_AVAILABLE': 'Not supported.',
  'NOT_PRESENT': 'Not supported.',
  'NOT_ENROLLED': 'Not supported.',
  'AUTHENTICATION_FAILED': 'Authenticate failed.',
  'AUTHENTICATION_CANCELED': 'Authenticate cancelled.',
  'FINGERPRINT_ERROR_LOCKOUT': 'Too many attempts.Try again Later.',
  'FINGERPRINT_ERROR_LOCKOUT_PERMANENT': 'Too many attempts.Fingerprint sensor disabled',
}

const mapStateToProps = (state) => {
  const masterWalletAddress = getCurrentWallet(state)

  return {
    masterWalletAddress,
    currentEthWallet: getCurrentEthWallet(masterWalletAddress)(state),
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateEthereumTxDraftSignedTx,
  updateEthereumTxDraftData,
  updateEthereumTxDraftGasLimit,
  sendToken,
}, dispatch)

class PasswordEnterModalContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      password: '',
      error: null,
      biometryType: null,
    }
  }

  componentDidMount () {
    this.handleScan()
  }


  handlePasswordChange = (name, value) => {
    const { error } = this.state
    if (error !== null) {
      this.setState({ error: null })
    }
    this.setState({ [name]: value })
  }

  handleScan = () => {
    TouchID.isSupported()
      .then((biometryType) => {
        this.setState({ biometryType })
        if (biometryType === true) {
          this.setState({ biometryType: 'TouchID' }) //For Android
        }
      })
      .then(this.authenticate)
      // eslint-disable-next-line no-console
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  }


  authenticate = () => {
    return TouchID.authenticate(`${appName} Application`)
      .then(() => {
        const { masterWalletAddress } = this.props
        Keychain.getInternetCredentials(masterWalletAddress)
          .then((keychain) => {
            this.handleConfirmClick({ password: keychain.password })
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.warn(error)
          })
      })
      .catch((error) => {
        if (authenticateErrors[error.code]) {
          if (error.code !== 'AUTHENTICATION_CANCELED') {
            Alert.alert(authenticateErrors[error.code])
          }
        }
      })
  }

  handleConfirmClick = async ({ password }) => {
    const {
      currentEthWallet,
    } = this.props
    const pass = password ? password : this.state.password
    decryptWallet(currentEthWallet.encrypted, pass)
      .then((results) => {
        this.handleSign({
          privateKey: results.privateKey,
        })
      })
      .catch((error) => {
        this.setState({ error: error.message })
      })
  }

  handleSign = ({ privateKey }) => {
    const {
      updateEthereumTxDraftData,
      updateEthereumTxDraftGasLimit,
      currentEthWallet,
      masterWalletAddress,
      sendToken,
      token,
    } = this.props
    const {
      nonce,
      gasLimit,
      gasPrice,
      chainId,
      to,
      from,
      value,
      data,
    } = currentEthWallet.txDraft
    let tx = {}
    if (token.symbol === ETH_PRIMARY_TOKEN) {
      tx = {
        to,
        from,
        data,
        value: balanceToAmount(value).toNumber(),
        nonce,
        gas: new BigNumber(gasLimit),
        gasPrice,
        chainId,
      }
      this.signEthereumTransaction({
        tx,
        privateKey,
      })
    } else {
      sendToken({
        from,
        to,
        tokenSymbol: token.symbol,
        value: balanceToAmount(value, token.decimals),
      })
        .then((tokenSend) => {
          updateEthereumTxDraftGasLimit({
            masterWalletAddress,
            gasLimit: tokenSend.gasLimit,
          })
          updateEthereumTxDraftData({
            masterWalletAddress,
            data: tokenSend.data,
          })
          tx = {
            to: tokenSend.to,
            from: tokenSend.from,
            data: tokenSend.data,
            value: tokenSend.value,
            nonce,
            gas: new BigNumber(tokenSend.gasLimit),
            gasPrice,
            chainId,
          }
          this.signEthereumTransaction({
            tx,
            privateKey,
          })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    }
  }

  signEthereumTransaction = ({ tx, privateKey }) => {
    const {
      updateEthereumTxDraftSignedTx,
      masterWalletAddress,
      confirmPassword,
    } = this.props
    signEthTransaction({
      tx,
      privateKey,
    })
      .then((signedTXresults) => {
        updateEthereumTxDraftSignedTx({
          masterWalletAddress,
          signedTx: signedTXresults.rawTransaction,
        })
          .then(() => confirmPassword())
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  }

  render () {
    const {
      biometryType,
    } = this.state
    const {
      visible,
      modalToggle,
      error,
    } = this.props

    return (
      <PasswordEnterModal
        onPasswordChange={this.handlePasswordChange}
        onConfirmPassword={this.handleConfirmClick}
        onScan={this.handleScan}
        biometryType={biometryType}
        visible={visible}
        modalToggle={modalToggle}
        error={error}
      />
    )
  }
}

PasswordEnterModalContainer.propTypes = {
  confirmPassword: PropTypes.func,
  currentEthWallet: PropTypes.func,
  error: PropTypes.string,
  masterWalletAddress: PropTypes.string,
  modalToggle: PropTypes.func,
  sendToken: PropTypes.func,
  updateEthereumTxDraftData: PropTypes.func,
  updateEthereumTxDraftGasLimit: PropTypes.func,
  updateEthereumTxDraftSignedTx: PropTypes.func,
  visible: PropTypes.bool,
  token: PropTypes.shape({
    decimals: PropTypes.number,
    symbol: PropTypes.string,
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordEnterModalContainer)
