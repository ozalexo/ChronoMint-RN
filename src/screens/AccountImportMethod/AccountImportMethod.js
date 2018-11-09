/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import textConstants from '../../locales/en'
import PropTypes from 'prop-types'
import TextButton from '../../components/TextButton'
import styles from './AccountImportMethodStyles'

export default class SelectAccountImportMethod extends PureComponent {
  renderMethod = (accountImportMethod) => (
    <Method
      key={accountImportMethod.id}
      {...accountImportMethod}
      onPress={this.props.onSelectAccountImportMethod(accountImportMethod)}
    />
  )

  render() {
    const {
      accountImportMethods,
      onCreateWallet,
    } = this.props

    return (
      <View>
        <View style={styles.buttons}>
          {accountImportMethods.map(this.renderMethod)}
        </View>

        <Text style={styles.or}>
          {textConstants.or}
        </Text>
        <TextButton
          label='Create new wallet'
          onPress={onCreateWallet}
        />
      </View>
    )
  }
}

SelectAccountImportMethod.propTypes = {
  accountImportMethods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      screen: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  onCreateWallet: PropTypes.func,
  onSelectAccountImportMethod: PropTypes.func,
}

class Method extends PureComponent {
  render() {
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

Method.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
}
