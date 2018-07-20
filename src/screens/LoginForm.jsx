/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
// TODO: Remove it if navigation methods is passing to router in other place
import { router } from '@chronobank/core-dependencies/router'
import { type TAccount } from '../containers/LoginFormContainer'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import Separator from '../components/Separator'
import TextButton from '../components/TextButton'
import AccountEntryModel from '@chronobank/core/models/wallet/persistAccount/AccountEntryModel'

const sw: typeof AccountEntryModel = {}

sw.profi

export type TLoginFormProps = {
  selectedWallet: typeof AccountEntryModel,
  onChangePassword: (password: string) => void,
  onLogin: () => Promise<void>,
  onUseWallet: () => void,
  navigator: any
}

export default class LoginForm extends PureComponent<TLoginFormProps, {}> {
  // This code pass navigator prop to router. Without it router can't
  // perform navigation actions.
  // TODO: Remove if navigation methods is passing to router in other place
  componentDidMount () {
    router.setNavigator(this.props.navigator)
  }

  render () {
    const {
      account,
      selectedWallet,
      onChangePassword,
      onLogin,
      onUseWallet,
    } = this.props

    selectedWallet.profu
    return (
      <View>
        <Separator style={styles.separator} />
          <View style={styles.item}>
            <Image
              source={selectedWallet?.image}
              style={styles.itemImage}
            />
            <Text style={styles.address}>
              {selectedWallet?.address}
            </Text>
            <Image
              source={require('../images/chevron-right.png')}
              style={styles.chevron}
            />
          </View>
        <Separator style={styles.separator} />
        <Input
          autoCorrect={false}
          onChangeText={onChangePassword}
          placeholder={I18n.t('SetAccountPassword.password')}
          secureTextEntry
          style={styles.input}
        />
        <PrimaryButton
          label={I18n.t('AccountPassword.login').toUpperCase()}
          onPress={onLogin}
        />
        <Text style={styles.or}>
          {I18n.t('or')}
        </Text>
        <TextButton
          label={I18n.t('AccountPassword.recoverUsingMnemonic')}
          onPress={onUseWallet}
        />
        <Text style={styles.copyright}>
          {I18n.t('copyright')}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  address: {
    color: '#A3A3CC',
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 20,
    tintColor: 'rgba(255, 255, 255, 0.25)',
  },
  copyright: {
    alignSelf: 'center',
    color: '#9997B2',
    fontSize: 12,
    marginVertical: 30,
    textAlign: 'center',
  },
  input: {
    margin: 20,
  },
  item: {
    flexDirection: 'row',
    margin: 20,
  },
  itemImage: {
    borderRadius: 20,
    height: 40,
    marginRight: 20,
    width: 40,
  },
  or: {
    alignSelf: 'center',
    color: '#A3A3CC',
    fontSize: 16,
  },
  separator: {
    backgroundColor: '#9997B2',
    marginHorizontal: 20,
  },
})

