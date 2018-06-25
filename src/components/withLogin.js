/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent, type ComponentType } from 'react'
import { Alert } from 'react-native'
import type { Dispatch } from 'redux'
import { connect } from 'react-redux'
import Web3 from 'web3'
import { createDecipher, createHash } from 'crypto'
import { login } from '@chronobank/core/redux/session/actions'
import {
  addError,
  clearErrors,
  DUCK_NETWORK,
  loading,
} from '@chronobank/login/redux/network/actions'
import networkService from '@chronobank/login/network/NetworkService'
import mnemonicProvider from '@chronobank/login/network/mnemonicProvider'
import privateKeyProvider from '@chronobank/login/network/privateKeyProvider'
import web3Provider from '@chronobank/login/network/Web3Provider'
import { ethereumProvider } from '@chronobank/login/network/EthereumProvider'
import {
  bccProvider,
  btcProvider,
  btgProvider,
  ltcProvider,
} from '@chronobank/login/network/BitcoinProvider'
import { nemProvider } from '@chronobank/login/network/NemProvider'
import startAppRoot from '../app'
import {
  addAccount,
  DUCK_SENSITIVE,
  setUsePinProtection,
  setLastAccount
} from '../redux/sensitive/actions'
import isValid from '../utils/validators'
import salt from '../utils/salt'
import { type TStoredAccount } from '../redux/sensitive/reducer'

type TLoginHOCProps = {
  accounts: Array<any>,
  addAccount: (account: { address: string, privateKey: string }, password: string, pin?: string) => Promise<void>,
  addError: (error: string) => void,
  checkNetwork: typeof networkService.checkNetwork,
  children (login: any): any,
  clearErrors (): void,
  createNetworkSession: typeof networkService.createNetworkSession,
  errors: string[],
  getProviderSettings: () => void,
  getProviderURL: () => void,
  loadAccounts: () => void,
  loading: () => void,
  login (account: any): void,
  navigator: any,
  onSetUsePinProtection: (value: boolean) => void,
  setLastAccount: (address: string) => void,
  selectAccount: (account: any) => void,
  selectedAccount: string,
  selectedNetworkId: number,
  selectedProviderId: number,
  selectNetwork: (network: number) => void,
  selectProvider: (providerId: number) => void,
  storedAccounts: any,
  usePinProtection: boolean,
}

type TLoginHOCState = {
  password: string,
}

export type TWithLoginProps = TLoginHOCProps & {
  isCreatingNewWallet?: boolean,
  generateMnemonic: () => string,
  onLogin: () => Promise<void>,
  onMnemonicLogin: (mnemonic: string) => Promise<{ mnemonic: string, privateKey: string }>,
  onPasswordLogin: (account: TStoredAccount, password: string) => Promise<void>,
  onPinLogin: (account: TStoredAccount, pin: string) => Promise<void>,
  onPrivateKeyLogin: (privateKey: string) => Promise<void>,
  onSetPassword: (password: string, passwordConfirmation: string) => Promise<void>,
  onStoreAccount: (privateKey: string, password?: string, pin?: string) => Promise<void>
}

export default function withLogin (Screen: ComponentType<any>): ComponentType<any> {
  class LoginHOC extends PureComponent<TLoginHOCProps, TLoginHOCState> {
    state = {
      password: ''
    }

    loginSetup = async ({ ethereum, btc, bcc, btg, ltc, nem }): Promise<void> => {
      const web3 = new Web3()
      const eProvider = ethereum.getProvider()

      web3Provider.setWeb3(web3)
      web3Provider.setProvider(eProvider)
      web3Provider.reinit(web3, eProvider)

      try {
        await this.props.loadAccounts()
        await this.props.selectAccount(this.props.accounts[ 0 ])
        ethereumProvider.setEngine(ethereum, nem)
        bccProvider.setEngine(bcc)
        btcProvider.setEngine(btc)
        btgProvider.setEngine(btg)
        ltcProvider.setEngine(ltc)
        nemProvider.setEngine(nem)
      } catch (e) {
        this.props.addError(e.message)
      }
    }

    onLogin = async (): Promise<void> => {
      this.props.clearErrors()

      const isPassed = await this.props.checkNetwork()

      if (isPassed) {
        this.props.createNetworkSession(
          this.props.selectedAccount,
          this.props.selectedProviderId,
          this.props.selectedNetworkId
        )

        this.props.login(this.props.selectedAccount)

        startAppRoot('wallet')

        this.props.setLastAccount(this.props.selectedAccount)
      }
    }

    generateMnemonic = mnemonicProvider.generateMnemonic

    onMnemonicLogin = async (mnemonic: string = mnemonicProvider.generateMnemonic()): Promise<{ mnemonic: string, privateKey: string }> => {
      this.props.loading()
      this.props.clearErrors()

      const providerSettings = this.props.getProviderSettings()
      const provider = mnemonicProvider.getMnemonicProvider(mnemonic, providerSettings)

      await this.loginSetup(provider)

      const privateKey = provider.ethereum.getPrivateKey()

      return { mnemonic, privateKey }
    }

    onPrivateKeyLogin = async (privateKey: string): Promise<void> => {
      this.props.loading()
      this.props.clearErrors()

      try {
        const providerSettings = networkService.getProviderSettings()
        const provider = privateKeyProvider.getPrivateKeyProvider(privateKey, providerSettings)

        await this.loginSetup(provider)
      } catch (e) {
        this.props.addError(e.message)
      }
    }

    onPasswordLogin = async (account, password: string): Promise<void> => {
      const {
        encryptedWithPasswordPrivateKey,
        passwordHash
      } = account
      try {
        this.props.clearErrors()

        if (!isValid.password(password)) {
          throw ('Invalid password')
        }

        const hash = createHash('sha256')
        hash.update(salt(password))

        if (hash.digest('hex') !== passwordHash) {
          throw ('Incorrect password')
        }

        const decipher = createDecipher('aes-256-cbc', password)
        let privateKey = decipher.update(encryptedWithPasswordPrivateKey, 'hex', 'utf8')
        privateKey += decipher.final('utf8')

        await this.onPrivateKeyLogin(privateKey)

        this.onLogin()
      } catch (error) {
        this.props.addError(error)
      }
    }

    onPinLogin = async (account, pin: string): Promise<void> => {
      const {
        encryptedWithPinPrivateKey,
        pinHash
      } = account
      try {
        this.props.clearErrors()

        if (!isValid.pin(pin)) {
          throw ('Invalid password')
        }

        const hash = createHash('sha256')
        hash.update(salt(pin))

        if (hash.digest('hex') !== pinHash) {
          throw ('Incorrect password')
        }

        const decipher = createDecipher('aes-256-cbc', salt(pin))
        let privateKey = decipher.update(encryptedWithPinPrivateKey, 'hex', 'utf8')
        privateKey += decipher.final('utf8')

        await this.onPrivateKeyLogin(privateKey)

        this.onLogin()
      } catch (error) {
        this.props.addError(error)
      }
    }

    onSetPassword = (password: string, passwordConfirmation: string): Promise<void> =>
      new Promise((resolve, reject) => {
        this.props.clearErrors()

        if (password !== passwordConfirmation) {
          reject('Passwords mismatch')
        }
        if (!isValid.password(password)) {
          reject('Invalid password')
        }

        this.setState({ password }, resolve)
      })

    storeAccount = (privateKey: string, password?: string = this.state.password, pin?: string): Promise<void> => {
      const {
        storedAccounts,
        selectedAccount,
        addAccount
      } = this.props

      if (storedAccounts.has(selectedAccount)) {
        return Promise.resolve()
      }

      return addAccount({
        address: selectedAccount,
        privateKey
      }, password, pin)
    }

    renderError = (error: string): void => {
      Alert.alert(
        'Error',
        error,
        [
          { text: 'OK', onPress: this.props.clearErrors }
        ],
        { cancelable: false }
      )
    }

    render () {

    render () {
      if (this.props.errors) {
        this.props.errors.forEach(this.renderError)
      }

      const props = {
        ...this.props,
        generateMnemonic: this.generateMnemonic,
        isCreatingNewWallet: !this.props.selectedAccount,
        onLogin: this.onLogin,
        onMnemonicLogin: this.onMnemonicLogin,
        onPasswordLogin: this.onPasswordLogin,
        onPinLogin: this.onPinLogin,
        onPrivateKeyLogin: this.onPrivateKeyLogin,
        onSetPassword: this.onSetPassword,
        onStoreAccount: this.storeAccount
      }

      return <Screen {...props} />
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginHOC)
}

function mapStateToProps (state: any) {
  const network = state.get(DUCK_NETWORK) || {}
  const sensitive = state.get(DUCK_SENSITIVE) || {}

  return {
    lastAccount: sensitive.lastAccount,
    storedAccounts: sensitive.accounts,
    accounts: network.accounts,
    errors: network.errors,
    isLoading: network.isLoading,
    isLocal: network.isLocal,
    isMetamask: network.isMetamask,
    networks: network.networks,
    selectedAccount: network.selectedAccount,
    selectedNetworkId: network.selectedNetworkId,
    selectedProviderId: network.selectedProviderId,
    usePinProtection: sensitive.usePinProtection
  }
}

function mapDispatchToProps (dispatch: Dispatch<any>) {
  return {
    addError: (error) => dispatch(addError(error)),
    checkNetwork: () => networkService.checkNetwork(),
    clearErrors: () => dispatch(clearErrors()),
    createNetworkSession: (account, provider, network) => networkService.createNetworkSession(account, provider, network),
    getProviderSettings: () => networkService.getProviderSettings(),
    getProviderURL: () => networkService.getProviderURL(),
    loadAccounts: () => networkService.loadAccounts(),
    loading: () => dispatch(loading()),
    login: (account) => dispatch(login(account)),
    onSetUsePinProtection: (value) => dispatch(setUsePinProtection(value)),
    selectAccount: (value) => networkService.selectAccount(value),
    selectNetwork: (network) => networkService.selectNetwork(network),
    selectProvider: (providerId) => networkService.selectProvider(providerId),
    setLastAccount: (address) => dispatch(setLastAccount(address)),
    addAccount: (account, password, pin) => dispatch(addAccount(account, password, pin))
  }
}
