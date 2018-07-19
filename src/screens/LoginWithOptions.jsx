/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import I18n from 'react-native-i18n'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import TextButton from '../components/TextButton'

type TLoginWithOptionsProps = {
  accountImportMethods: Array<TMethodProps>,
  navigateToMnemonicImportMethod: () => void,
  initImportMethodsPage: () => void,
  onCreateWallet: () => void
}

type TMethodProps = {
  image: any,
  label: string,
  onPress: () => void,
}

export default class LoginWithOptions extends PureComponent<TLoginWithOptionsProps, {}> {
  componentDidMount() {
    this.props.initImportMethodsPage()
  }

  render () {
    const {
      accountImportMethods,
      onCreateWallet,
      navigateToMnemonicImportMethod
    } = this.props

    return (
      <View>
        <View style={styles.buttons}>
          <Method
            label={I18n.t('LoginWithOptions.mnemonic')}
            image={require('../images/private-key.png')}
            onPress={navigateToMnemonicImportMethod}
          />
        </View>

        <Text style={styles.or}>
          {I18n.t('or')}
        </Text>
        <TextButton
          label='Create new wallet'
          onPress={onCreateWallet}
        />
      </View>
    )
  }
}

class Method extends PureComponent<TMethodProps> {
  render () {
    const {
      image,
      label,
      onPress,
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
    marginVertical: 30,
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#614DBA',
    borderRadius: 3,
    height: 105,
    justifyContent: 'center',
    margin: 5,
    width: 105,
  },
  itemImage: {
    height: 48,
    width: 48,
  },
  itemLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  or: {
    alignSelf: 'center',
    color: '#A3A3CC',
    fontSize: 16,
  },
})
