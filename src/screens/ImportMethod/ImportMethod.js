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
import styles from './ImportMethodStyles'



const Method = ({image, label, onPress}) => {
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

Method.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
}

export default class ImportMethod extends PureComponent {
  renderMethod = (ImportMethod) => (
    <Method
      key={ImportMethod.id}
      {...ImportMethod}
      onPress={this.props.onSelectImportMethod(ImportMethod)}
    />
  )

  render() {
    const {
      ImportMethods,
      onCreateWallet,
    } = this.props

    return (
      <View>
        <View style={styles.buttons}>
          {ImportMethods.map(this.renderMethod)}
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

ImportMethod.propTypes = {
  ImportMethods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      screen: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  onCreateWallet: PropTypes.func,
  onSelectImportMethod: PropTypes.func,
}
