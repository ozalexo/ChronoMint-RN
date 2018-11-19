/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { View, Text, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import i18n from '../../../locales/translation'
import PrimaryButton from '../../../components/PrimaryButton'
import styles from './GenerateMnemonicStyles'

const WarningItem = ({ warningIndex }) => (
  <View style={styles.warningItem}>
    <Text style={styles.warningNumber}>{warningIndex + 1}.</Text>
    <Text style={styles.warningItemContent}>
      <Text style={styles.warningItemTitle}>
        {i18n.t(['GenerateMnemonic', 'warnings', warningIndex.toString(), 'title'])}
      </Text>
      {' '}
      {i18n.t(['GenerateMnemonic', 'warnings', warningIndex.toString(), 'content'])}
    </Text>
  </View>
)

WarningItem.propTypes = {
  warningIndex: PropTypes.number,
}

export default class GenerateMnemonic extends PureComponent {
  renderWarningItem = (item, index) => (
    <WarningItem
      key={`warning${index}`}
      warningIndex={index}
    />
  )

  render () {
    const {
      mnemonic,
      onConfirm = () => { },
    } = this.props

    return (
      <ScrollView style={styles.screenView}>
        <Text style={styles.description}>
          {i18n.t('GenerateMnemonic.description')}
        </Text>
        <View style={styles.mnemonicContainer}>
          <Text style={styles.mnemonic}>
            {mnemonic}
          </Text>
        </View>
        <View style={styles.warningContainer}>
          <Text style={styles.warningTitle}>
            {i18n.t('GenerateMnemonic.warningTitle')}
          </Text>
          {new Array(2).fill(1).map(this.renderWarningItem)}
        </View>
        <PrimaryButton
          label={i18n.t('GenerateMnemonic.confirm')}
          style={styles.primaryButton}
          onPress={onConfirm}
          upperCase
        />
      </ScrollView>
    )
  }
}

GenerateMnemonic.propTypes = {
  mnemonic: PropTypes.string,
  onConfirm: PropTypes.func,
}
