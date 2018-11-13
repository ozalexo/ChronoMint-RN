/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Input from '../../components/Input'
import PrimaryButton from '../../components/PrimaryButton'
import styles from './EnterPrivateKeyStyles'

export default class EnterPrivateKey extends PureComponent {

  render() {
    const {
      onChangePrivateKey,
      onDone,
      error,
    } = this.props

    return (
      <View style={styles.screenView}>
        <Input
          label='Private key'
          onChangeText={onChangePrivateKey}
          error={error}
        />
        <PrimaryButton
          label='Add account'
          onPress={onDone}
        />
      </View>
    )
  }
}

EnterPrivateKey.propTypes = {
  onChangePrivateKey: PropTypes.func,
  onDone: PropTypes.func,
}
