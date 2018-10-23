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
import { type TAccount } from '../containers/AccountPasswordContainer'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import Separator from '../components/Separator'
import TextButton from '../components/TextButton'

export type TAccountPasswordProps = {
  account: TAccount,
  onChangePassword: (password: string) => void,
  onLogin: () => Promise<void>,
  onUseWallet: () => void,
}

type TAccountItemProps = TAccount

export default class AccountPassword extends PureComponent<TAccountPasswordProps, {}> {
  render () {
    const {
      account,
      onChangePassword,
      onLogin,
      onUseWallet,
    } = this.props
    
    return (
      <View>
        <Separator style={styles.separator} />
        <AccountItem {...account} />
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

class AccountItem extends PureComponent<TAccountItemProps, {}> {
  render () {
    const { image, address } = this.props

    return (
      <View style={styles.item}>
        <Image
          source={image}
          style={styles.itemImage}
        />
        <Text style={styles.address}>
          {address}
        </Text>
        <Image
          source={require('../images/chevron-right.png')}
          style={styles.chevron}
        />
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

