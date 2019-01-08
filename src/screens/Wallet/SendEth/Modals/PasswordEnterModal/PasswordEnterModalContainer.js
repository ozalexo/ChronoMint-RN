/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import { strToBytes32 } from '@chronobank/ethereum/utils'
import BigNumber from 'bignumber.js'
import { getCurrentWallet } from '@chronobank/session/redux/selectors'
import { getCurrentEthWallet } from '@chronobank/ethereum/redux/selectors'
import { updateEthereumTxDraftSignedTx } from '@chronobank/ethereum/redux/thunks'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TouchID from 'react-native-touch-id'
import * as Keychain from 'react-native-keychain'
import { ETH_PRIMARY_TOKEN } from '@chronobank/ethereum/constants'
import { decryptWallet, signEthTransaction } from '@chronobank/ethereum/utils'
import { balanceToAmount } from '@chronobank/ethereum/utils/amount'
import { name as appName } from '../../../../../../app.json'
import PasswordEnterModal from './PasswordEnterModal'
import {
  sendSignedTransaction,
  getContractByName,
} from '@chronobank/ethereum/middleware/thunks'

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
  getContractByName,
  sendSignedTransaction,
  updateEthereumTxDraftSignedTx,
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
      .then(() => {
        this.authenticate()
      })
      .catch(() => {
        Alert.alert('You do not support the ability to scan.')
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
        // eslint-disable-next-line no-console
        if (authenticateErrors[error.code]) {
          Alert.alert(authenticateErrors[error.code])
        } else {
          Alert.alert('Authenticate error.')
        }
      })
  }

  handleConfirmClick = async ({ password }) => {
    const {
      currentEthWallet,
    } = this.props
    console.log('THIS STATE', this.state)
    const pass = password ? password : this.state.password

    decryptWallet(currentEthWallet.encrypted, pass)
      .then((results) => {
        console.log('Got PK', results)
        this.handleSign({
          privateKey: results.privateKey,
        })
      })
      .catch((error) => {
        this.setState({ error: error.message })
      })
  }

  handleSign = async ({ privateKey }) => {
    console.log('Signing...', privateKey)
    const {
      updateEthereumTxDraftSignedTx,
      currentEthWallet,
      masterWalletAddress,
      token,
    } = this.props
    console.log('1')
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
    console.log('2')
    const tx = {
      to,
      from,
      data,
      value: balanceToAmount(value).toNumber(),
      nonce,
      gas: new BigNumber(gasLimit),
      gasPrice,
      chainId,
    }
    console.log('3')
    // export const strToBytes32 = (str) => web3.utils.padRight(web3.utils.utf8ToHex(str), 32)
    const tokenAddress = '0x5240682f204ec9dc7ce771f4483db7611d380b2c'
    console.log('4.1')
    const tokenName = strToBytes32('AOZ Token')
    console.log('4.2')
    const tokenSym = strToBytes32('AOZ')
    const tokenUrl = strToBytes32('')
    const tokenIpfs = strToBytes32('')
    const tokenSwarm = strToBytes32('')
    console.log('5')

    const er20man = this.props.getContractByName({ contractName: 'ERC20Manager' })
    console.log('6 er20man', er20man)
    try {
      const call = await er20man.methods.addToken(
        tokenAddress,
        tokenSym,
        tokenName,
        tokenUrl,
        18,
        tokenIpfs,
        tokenSwarm
      ).call()
      console.log('CALL:', call)
      const recipie = await er20man.methods.addToken(
        tokenAddress,
        tokenSym,
        tokenName,
        tokenUrl,
        18,
        tokenIpfs,
        tokenSwarm
      ).encodeABI()
      console.log('7 recipie', recipie)
      const addTokenTx = {
        to: '0x5a3134530f85dc8f6e27bd1977348c0b54f39f62',
        from,
        data: recipie,
        value: 0,
        nonce,
        gas: new BigNumber(gasLimit*40),
        gasPrice,
        chainId,
      }
      signEthTransaction({
        tx: addTokenTx,
        privateKey,
      })
        .then((signedTx) => {
          console.log('>>>>>>>>>>>> Sending add token signed TX', signedTx)
          // signedTXresults.rawTransaction
          this.props.sendSignedTransaction({ signedTx: signedTx.rawTransaction })
            .then((sendTxResponse) => {
              console.log('TOKEN ADDED:', sendTxResponse)
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log('TOKEN not ADDED :((', error)
            })
        })
        .catch((error) => {
          console.log('Error Add Token:', error)
        })
      console.log('addTokenTx', addTokenTx)
    } catch (e) {
      console.log('e0004', e)
    }

    // console.log('Sending regular TX...')
    // token.symbol === ETH_PRIMARY_TOKEN
    //   ? signEthTransaction({
    //     tx,
    //     privateKey,
    //   })
    //     .then((signedTXresults) => {
    //       console.log('Signed regular  TX...')
    //       updateEthereumTxDraftSignedTx({
    //         masterWalletAddress,
    //         signedTx: signedTXresults.rawTransaction,
    //       })
    //         .then(() => this.props.confirmPassword())
    //         // eslint-disable-next-line no-console
    //         .catch((error) => console.log(error))
    //     })
    //     // eslint-disable-next-line no-console
    //     .catch((error) => console.log(error))
    //   : this.props.confirmPassword()
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
  visible: PropTypes.bool,
  modalToggle: PropTypes.func,
  passwordChange: PropTypes.func,
  error: PropTypes.string,
  confirmPassword: PropTypes.func,
  styles: PropTypes.shape({}),
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordEnterModalContainer)
