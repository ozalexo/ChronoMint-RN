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
  TouchableOpacity,
  View
} from 'react-native'
import I18n from 'react-native-i18n'
import TextButton from '../components/TextButton'
import LoginLayout from '../components/LoginLayout'

export type TAccountImportMethod = {
  id: string,
  image: any,
  label: string,
  screen: string,
  title: string
}

type TAccountImportMethodProps = {
  accountImportMethods: TAccountImportMethod[],
  onCreateWallet: () => void,
  onSelectAccountImportMethod: (accountImportMethod: TAccountImportMethod) => () => void,
}

type TMethodProps = TAccountImportMethod & {
  onPress: () => void,
}

export default class SelectAccountImportMethod extends PureComponent<TAccountImportMethodProps, {}> {
  renderMethod = (accountImportMethod: TAccountImportMethod) => (
    <Method
      key={accountImportMethod.id}
      {...accountImportMethod}
      onPress={this.props.onSelectAccountImportMethod(accountImportMethod)}
    />
  )

  render () {
    const {
      accountImportMethods,
      onCreateWallet
    } = this.props

    return (
      <LoginLayout>
        <View style={styles.buttons}>
          {accountImportMethods.map(this.renderMethod)}
        </View>

        <Text style={styles.or}>
          {I18n.t('or')}
        </Text>
        <TextButton
          label='Create new wallet'
          onPress={onCreateWallet}
        />
      </LoginLayout>
    )
  }
}

class Method extends PureComponent<TMethodProps> {
  render () {
    const {
      image,
      label,
      onPress
    } = this.props

    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.item}
      >
        <Image
          source={image}
          style={styles.itemImage}
        />
        <Text style={styles.itemLabel}>
          {
            label
          }
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#614DBA',
    borderRadius: 3,
    height: 105,
    justifyContent: 'center',
    margin: 5,
    width: 105
  },
  itemImage: {
    height: 48,
    width: 48
  },
  itemLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700'
  },
  or: {
    alignSelf: 'center',
    color: '#A3A3CC',
    fontSize: 16
  }
})
