/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { type Dispatch } from 'redux'
import { connect } from 'react-redux'
import { getTokens } from '@chronobank/core/redux/tokens/selectors'
import { mainTransfer } from '@chronobank/core/redux/mainWallet/actions'
import Amount from '@chronobank/core/models/Amount'
import { BigNumber } from 'bignumber.js'
import TokenModel from '@chronobank/core/models/tokens/TokenModel'
import ConfirmSend from '../screens/ConfirmSend'

export type TConfirmSendContainerProps = {
  tokensDuck: any, // TODO: to make a flow type for this
  navigator: any,
  recipientAddress: string,
  selectedCurrency: string,
  currentToken: string,
  feeMultiplier: number,
  amountToSend: {
    currency: number,
    token: number,
  },
  fee: {
    currency: number,
    token: number,
  },
  balance: {
    currency: number,
    token: number,
  },
  mainTransfer: (
    token: TokenModel,
    amount: Amount,
    recipient: string,
    feeMultiplier: number,
  ) => void,
}

class ConfirmSendContainer extends PureComponent<TConfirmSendContainerProps, {}> {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Cancel',
        id: 'cancel'
      }
    ],
    rightButtons: [
      {
        title: 'Confirm',
        id: 'confirm'
      }

    ]
  }

  constructor (props: TConfirmSendContainerProps) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
  }

  handleNavigatorEvent = ({ type, id }: { type: string, id: string }) => {
    if (type === 'NavBarButtonPress') {
      switch (id) {
        case 'cancel': {
          // Go back to previous screen
          this.props.navigator.pop()
          break
        }
        // Close confirm screen, reset Send screen, go to Wallet screren (TODO: select transactions tab)
        case 'confirm': {
          this.sendTransaction() // FIXME: need to catch and handle sending errors. Impossible at the moment.
          this.props.navigator.resetTo({
            screen: 'Wallet'
          })
          break
        }
      }
    }
  }

  sendTransaction = () => {
    const token: TokenModel = this.props.tokensDuck.item(this.props.currentToken)
    // const toSendBigNumber: BigNumber = new BigNumber(this.props.amountToSend.token)
    const bnWithDecimals: BigNumber = token.addDecimals(this.props.amountToSend.token)
    const amountToSend = new Amount(bnWithDecimals, this.props.currentToken)
    const recipient: string = this.props.recipientAddress
    const feeMultiplier = this.props.feeMultiplier
    this.props.mainTransfer(token, amountToSend, recipient, feeMultiplier)
  }

  render () {
    return (
      <ConfirmSend
        amountToSend={this.props.amountToSend}
        balance={this.props.balance}
        currentToken={this.props.currentToken}
        fee={this.props.fee}
        recipientAddress={this.props.recipientAddress}
        selectedCurrency={this.props.selectedCurrency}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  tokensDuck: getTokens(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    mainTransfer: (
      token,
      amount,
      recipient,
      feeMultiplier: number
    ) => dispatch(mainTransfer(token, amount, recipient, feeMultiplier))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSendContainer)
