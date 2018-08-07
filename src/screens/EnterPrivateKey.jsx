/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import LoginLayout from '../components/LoginLayout'

export type TEnterPrivateKeyProps = {
  onChangePrivateKey: (privateKey: string) => void,
  onDone: () => void,
}

export default class EnterPrivateKey extends PureComponent<TEnterPrivateKeyProps, {}> {
  render () {
    const {
      onChangePrivateKey,
      onDone
    } = this.props

    return (
      <LoginLayout>
        <Input
          label='Private key'
          onChangeText={onChangePrivateKey}
        />
        <PrimaryButton
          label='Add account'
          onPress={onDone}
        />
      </LoginLayout>
    )
  }
}
