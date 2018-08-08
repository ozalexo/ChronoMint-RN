/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { type Dispatch } from 'redux'
import type {
  NavigationScreenProp,
  NavigationState
} from 'react-navigation'
import {
  getAddressByPrivateKey
} from '@chronobank/core/redux/persistAccount/utils'
import AccountProfileModel from '@chronobank/core/models/wallet/persistAccount/AccountProfileModel'
import { fetchPersonInfo } from '@chronobank/auth/thunks'
import authActions from '@chronobank/auth/actions'
import EnterPrivateKey from '../screens/EnterPrivateKey'

export type TEnterPrivateKeyContainerProps = {
  navigation: NavigationScreenProp<NavigationState>,
  fetchPersonInfo(addreses: string[]): Promise<*>,
  personInfoFetchSuccess(personInfo: any): void,
  personInfoFetchFail(error: Error): void
}

type TEnterPrivateKeyContainerState = {
  privateKey: string
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchPersonInfo: (addresses: string[]) => dispatch(fetchPersonInfo(addresses)),
    personInfoFetchSuccess: (personInfo) => dispatch(authActions.auth.personInfo.fetchSuccess(personInfo)),
    personInfoFetchFail: (error) => dispatch(authActions.auth.personInfo.fetchFail(error)),
  }
}

class EnterPrivateKeyContainer extends PureComponent<TEnterPrivateKeyContainerProps, TEnterPrivateKeyContainerState> {
  state = {
    privateKey: ''
  }

  handleChangePrivateKey = (privateKey: string): void => {
    this.setState({ privateKey })
  }

  handleDone = (): void => {
    const {
      privateKey
    } = this.state

    const address = getAddressByPrivateKey(privateKey)

    const onSuccess = (personInfo) => {
      const profile = personInfo[0]
      const accountProfile = profile && profile.userName
        ? new AccountProfileModel(profile)
        : null
      this.props.personInfoFetchSuccess(accountProfile)
      this.props.navigation.navigate('SetAccountPassword', {
        isCreatingNewWallet: false,
        title: 'Set Account Password',
        privateKey,
        accountProfile
      })
    }

    const onError = (error) => {
      if (error && (!error.code || error.code !== 'FETCHING_IN_PROGRESS')) {
        console.log('Error: failed to get profile info')
      }
      // TODO: need to handle it somehow. Right now we will just stay on this screen.
    }

    this.props.fetchPersonInfo([address], onSuccess)
      .then(onSuccess)
      .catch(onError)
  }

  render () {
    return (
      <EnterPrivateKey
        onChangePrivateKey={this.handleChangePrivateKey}
        onDone={this.handleDone}
      />
    )
  }
}

export default connect(null, mapDispatchToProps)(EnterPrivateKeyContainer)
