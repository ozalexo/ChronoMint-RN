/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

// #region imports

import React from 'react'
import type { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Alert } from 'react-native'
import { BigNumber } from 'bignumber.js'
import { getGasPriceMultiplier } from '@chronobank/core/redux/session/selectors'
import { getTokens } from '@chronobank/core/redux/tokens/selectors'
import { DUCK_TOKENS } from '@chronobank/core/redux/tokens/actions'
import {
  getSelectedWalletStore,
  makeGetWalletInfoByBockchainAndAddress,
  selectMarketPricesSelectedCurrencyStore,
  selectMarketPricesListStore,
  type TSelectedWallet
} from '../redux/wallet/selectors'
import * as EthereumDAO from '@chronobank/core/dao/EthereumDAO'
import Amount from '@chronobank/core/models/Amount'
import tokenService from '@chronobank/core/services/TokenService'
import Web3Converter from '@chronobank/core/utils/Web3Converter'
import Send, {
  type TCalculatedTokenCollection,
  type TPrices,
  type TSelectedToken,
  type TTokenModel,
  type TTokensCollectionModel,
  type TWalletTokensAndBalanceByAddress
} from '../screens/Send'
import { getPrimaryToken } from '../redux/mainWallet/selectors/utils'

// #endregion

// #region types

type TSendContainerProps = {
  blockchain: string,
  gasPriceMultiplier: number,
  navigator: any, // TODO: to implement a flow type for navigator
  prices: ?TPrices,
  selectedCurrency: string,
  token: TTokenModel,
  tokens: TCalculatedTokenCollection,
  tokensDuck: TTokensCollectionModel,
  walletTokensAndBalance: TWalletTokensAndBalanceByAddress,
  selectedWallet: TSelectedWallet,
  estimateBtcFee(params: any, callback: any): void,
}

type TSendState = {
  amount: ?number,
  amountInCurrency: number,
  feeMultiplier: number,
  gasFee: ?BigNumber,
  gasFeeAmount: ?number,
  gasFeeAmountInCurrency: ?number,
  isAmountInputValid: boolean,
  isRecipientInputValid: boolean,
  recipient: string,
  selectedDAO: ?EthereumDAO, // TODO: to describe type of a Dao.
  selectedToken: ?TSelectedToken,
}

// #endregion

// #region maps

const makeMapStateToProps = origState => {
  const selectedWallet: TSelectedWallet = getSelectedWalletStore(origState)
  const getWalletTokensAndBalance = makeGetWalletInfoByBockchainAndAddress(
    selectedWallet.blockchain,
    selectedWallet.address
  )
  const token: TTokenModel = origState
    .get(DUCK_TOKENS)
    .item(getPrimaryToken(selectedWallet.blockchain))
  const mapStateToProps = (state, ownProps) => {
    const prices = selectMarketPricesListStore(state)
    const walletTokensAndBalance = getWalletTokensAndBalance(state, ownProps)
    return {
      gasPriceMultiplier: getGasPriceMultiplier(token.blockchain())(state),
      selectedCurrency: selectMarketPricesSelectedCurrencyStore(state),
      token,
      walletData: getWalletTokensAndBalance(state),
      tokensDuck: getTokens(state),
      walletTokensAndBalance,
      address: selectedWallet.address,
      selectedWallet: selectedWallet,
      prices,
      blockchain: selectedWallet.blockchain
    }
  }

  return mapStateToProps
}

function mapDispatchToProps (dispatch: Dispatch<any>) {
  return {
    // estimateGas: (tokenId, params, callback, gasPriseMultiplier, address) => dispatch(estimateGas(tokenId, params, callback, gasPriseMultiplier, address)),
    estimateBtcFee: (params, callback) => dispatch(this.props.estimateBtcFee(params, callback))
  }
}

// #endregion

class SendContainer extends React.PureComponent<TSendContainerProps, TSendState> {
  // #region navigation
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Cancel',
        id: 'cancel'
      }
    ],
    rightButtons: [
      {
        title: 'Done',
        id: 'done'
      }
    ]
  }
  // #endregion

  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
    const firtsAvailableToken = props.walletTokensAndBalance.tokens[0]
    const firstAvailableTokenSymbol = Object.keys(firtsAvailableToken)[0]
    const selectedToken = {
      symbol: firstAvailableTokenSymbol,
      amount: firtsAvailableToken[firstAvailableTokenSymbol].amount
    }
    const selectedDAO =
      tokenService.getDAO(props.tokensDuck.getBySymbol(firstAvailableTokenSymbol)) || null
    this.state = {
      amount: null,
      amountInCurrency: 0,
      feeMultiplier: 1,
      gasFee: null,
      gasFeeAmount: null,
      gasFeeAmountInCurrency: null,
      isAmountInputValid: false,
      isRecipientInputValid: false,
      recipient: '',
      selectedDAO,
      selectedToken
    }
  }

  handleGotoConfirmScreen = (selectedTokenSymbol, amount, balance) => {
    if (this.state.isRecipientInputValid && this.state.isAmountInputValid) {
      this.props.navigator.push({
        screen: 'ConfirmSend',
        title: 'Confirm Send',
        passProps: {
          recipientAddress: this.state.recipient,
          selectedCurrency: this.props.selectedCurrency,
          currentToken: selectedTokenSymbol,
          amountToSend: {
            token: this.state.amount,
            currency: this.state.amountInCurrency
          },
          fee: {
            token: this.state.gasFeeAmount,
            currency: this.state.gasFeeAmountInCurrency
          },
          balance: {
            token: amount,
            currency: balance
          },
          feeMultiplier: this.state.feeMultiplier
        }
      })
    } else {
      Alert.alert('Input error', 'Please fill address and amount', [
        { text: 'Ok', onPress: () => {}, style: 'cancel' }
      ])
    }
  }

  handleNavigatorEvent = ({ type, id }) => {
    if (type === 'NavBarButtonPress') {
      const selectedTokenSymbol: string | null =
        (this.state.selectedToken && this.state.selectedToken.symbol) || null

      const CT =
        this.props.walletTokensAndBalance &&
        selectedTokenSymbol &&
        this.props.walletTokensAndBalance.tokens.find(tObj => {
          return Object.keys(tObj)[0] === selectedTokenSymbol
        })

      const { balance, amount } =
        CT && selectedTokenSymbol
          ? CT[this.state.selectedToken.symbol]
          : { balance: null, amount: null }

      switch (id) {
        case 'cancel': {
          this.props.navigator.pop()
          break
        }
        case 'done': {
          this.handleGotoConfirmScreen(selectedTokenSymbol, amount, balance)
        }
      }
    }
  }

  handleChangeRecipient = (value: string) => {
    // Check for Ethereum
    let dummyValidationOfRecipientInput: boolean =
      value !== null &&
      value !== '' &&
      (value.length >= 40 || value.length <= 44) &&
      value.startsWith('0x')

    // Check for BitCoin-based
    if (this.props.blockchain !== EthereumDAO.BLOCKCHAIN_ETHEREUM) {
      dummyValidationOfRecipientInput = value !== null && value !== '' && value.length === 34
    }
    this.setState(
      {
        recipient: value,
        isRecipientInputValid: dummyValidationOfRecipientInput
      },
      () => {
        if (this.state.isAmountInputValid) {
          if (this.props.blockchain === EthereumDAO.BLOCKCHAIN_ETHEREUM) {
            this.requestGasEstimations(this.state.recipient, this.state.amount)
          } else {
            this.requestBcFeeEstimations()
          }
        }
      }
    )
  }

  // eslint-disable-next-line complexity
  handleChangeAmount = (value: string) => {
    if (!(value.endsWith(',') || value.endsWith('.'))) {
      const localeValue = parseFloat(value.replace(',', '.').replace(' ', ''))
      const tokenPrice =
        (this.props.prices &&
          this.state.selectedToken &&
          this.props.prices[this.state.selectedToken.symbol] &&
          this.props.prices[this.state.selectedToken.symbol][this.props.selectedCurrency]) ||
        0 // TODO: handle wrong values correctly
      const dummyValidationOfAmountInput: boolean =
        localeValue !== null && localeValue !== undefined && localeValue !== '' && localeValue > 0
      this.setState(
        {
          amount: localeValue,
          amountInCurrency: tokenPrice * localeValue,
          isAmountInputValid: dummyValidationOfAmountInput
        },
        () => {
          if (this.state.isRecipientInputValid) {
            if (this.props.blockchain === EthereumDAO.BLOCKCHAIN_ETHEREUM) {
              this.requestGasEstimations(this.state.recipient, this.state.amount)
            } else {
              this.requestBcFeeEstimations()
            }
          }
        }
      )
    } else {
      this.setState({
        amount: value ? parseFloat(value.replace(',', '.').replace(' ', '')) : null,
        amountInCurrency: 0,
        isAmountInputValid: false
      })
    }
  }

  handleSelectToken = (): void => {
    this.props.navigator.push({
      screen: 'SelectToken',
      title: 'Select Token',
      passProps: {
        tokens: this.props.walletTokensAndBalance.tokens,
        onPressAction: data => {
          this.setState({
            selectedToken: {
              symbol: data.symbol,
              amount: data.amount
            },
            selectedDAO:
              tokenService.getDAO(this.props.tokensDuck.getBySymbol(data.symbol)) || null
          })
        }
      }
    })
  }

  // eslint-disable-next-line complexity
  handleFeeSliderChange = (value: number) => {
    if (this.state.gasFee !== null) {
      if (this.props.blockchain === EthereumDAO.BLOCKCHAIN_ETHEREUM) {
        const newGasFee =
          this.state.gasFee &&
          this.state.selectedDAO &&
          new Amount(
            this.state.selectedDAO.removeDecimals(this.state.gasFee.mul(this.state.feeMultiplier))
          ).toNumber()

        const tokenPrice =
          (this.props.prices &&
            this.state.selectedToken &&
            this.props.prices[this.state.selectedToken.symbol][this.props.selectedCurrency]) ||
          0 // TODO: handle wrong values correctly

        const newGasFeePrice = newGasFee ? newGasFee * tokenPrice : null

        this.setState({
          feeMultiplier: value,
          gasFeeAmount: newGasFee,
          gasFeeAmountInCurrency: newGasFeePrice
        })
      } else {
        const newGasFee =
          this.state.gasFeeAmount &&
          this.state.selectedDAO &&
          this.state.gasFeeAmount * this.state.feeMultiplier
        const tokenPrice =
          (this.props.prices &&
            this.state.selectedToken &&
            this.props.prices[this.state.selectedToken.symbol][this.props.selectedCurrency]) ||
          0 // TODO: handle wrong values correctly
        const newGasFeePrice = newGasFee ? newGasFee * tokenPrice : null
        this.setState({
          feeMultiplier: value,
          gasFeeAmount: newGasFee,
          gasFeeAmountInCurrency: newGasFeePrice
        })
      }
    } else {
      this.setState({
        feeMultiplier: value
      })
    }
  }

  requestBcFeeEstimations = () => {
    const params = {
      address: this.props.selectedWallet.address,
      recipient: this.state.recipient,
      amount: new BigNumber(this.state.amount),
      formFee: this.state.feeMultiplier,
      blockchain: this.props.blockchain
    }
    this.props.estimateBtcFee(params, (error, { fee }) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log('Error requiesting fee for BitCoin-based blockchain')
        return
      }
      const feeBtc = this.props.tokensDuck
        .getBySymbol(getPrimaryToken(this.props.selectedWallet.blockchain))
        .removeDecimals(fee)
      const tokenPrice =
        (this.props.prices &&
          this.state.selectedToken &&
          this.state.selectedToken.symbol &&
          this.props.prices[this.state.selectedToken.symbol][this.props.selectedCurrency]) ||
        0 // TODO: handle wrong values correctly
      const newBcFeePrice = feeBtc ? feeBtc.toNumber() * tokenPrice : null

      this.setState({
        gasFee: feeBtc,
        gasFeeAmount: feeBtc.toNumber(),
        gasFeeAmountInCurrency: newBcFeePrice
      })
    })
  }

  requestGasEstimations = (to, value) => {
    const weiValue = Web3Converter.toWei(new BigNumber(value))
    if (this.state.selectedToken) {
      this.state.selectedDAO &&
        // eslint-disable-next-line no-underscore-dangle
        this.state.selectedDAO._estimateGas &&
        // eslint-disable-next-line no-underscore-dangle
        this.state.selectedDAO
          ._estimateGas(to, weiValue)
          .then(({ gasFee }: { gasFee: BigNumber }) => {
            const newGasFee =
              this.state.selectedDAO &&
              new Amount(
                this.state.selectedDAO.removeDecimals(gasFee.mul(this.state.feeMultiplier))
              ).toNumber()
            const tokenPrice =
              (this.props.prices &&
                this.state.selectedToken &&
                this.state.selectedToken.symbol &&
                this.props.prices[this.state.selectedToken.symbol][this.props.selectedCurrency]) ||
              0 // TODO: handle wrong values correctly
            const newGasFeePrice = newGasFee ? newGasFee * tokenPrice : null

            this.setState({
              gasFee,
              gasFeeAmount: newGasFee,
              gasFeeAmountInCurrency: newGasFeePrice
            })
          })
          .catch(error => {
            if (error) {
              // eslint-disable-next-line no-console
              console.log('Error during fetching gasPrice. No info how to handle it.', error)
            }
          })
    }
  }

  render () {
    const { selectedWallet, walletTokensAndBalance, blockchain } = this.props

    const { selectedToken } = this.state

    // const selectedTokenSymbol: ?string = selectedToken && selectedToken.symbol || null

    return (
      <Send
        amount={this.state.amount}
        amountInCurrency={this.state.amountInCurrency}
        blockchain={blockchain}
        feeMultiplier={this.state.feeMultiplier}
        gasFeeAmount={this.state.gasFeeAmount}
        gasFeeAmountInCurrency={this.state.gasFeeAmountInCurrency}
        onChangeAmount={this.handleChangeAmount}
        onChangeRecipient={this.handleChangeRecipient}
        onFeeSliderChange={this.handleFeeSliderChange}
        onSelectToken={this.handleSelectToken}
        recipient={this.state.recipient}
        selectedCurrency={this.props.selectedCurrency}
        selectedToken={selectedToken}
        selectedWallet={selectedWallet}
        walletTokensAndBalance={walletTokensAndBalance}
      />
    )
  }
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(SendContainer)
