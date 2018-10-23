/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import I18n from 'react-native-i18n'
import PrimaryButton from '../components/PrimaryButton'

export type TGenerateMnemonicProps = {
  mnemonic: string,
  onConfirm: () => void,
}

type TWarningItemProps = {
  warningIndex: number,
}

export default class GenerateMnemonic extends PureComponent<TGenerateMnemonicProps, {}> {
  renderWarningItem = (item: any, index: number) => (
    <WarningItem
      key={`warning${index}`}
      warningIndex={index}
    />
  )

  render () {
    const {
      mnemonic,
      onConfirm,
    } = this.props

    return (
      <View>
        <Text style={styles.description}>
          {I18n.t('GenerateMnemonic.description')}
        </Text>
        <View style={styles.mnemonicContainer}>
          <Text style={styles.mnemonic}>
            {mnemonic}
          </Text>
        </View>
        <View style={styles.warningContainer}>
          <Text style={styles.warningTitle}>
            {I18n.t('GenerateMnemonic.warningTitle')}
          </Text>
          {new Array(2).fill(1).map(this.renderWarningItem)}
        </View>
        <PrimaryButton
          label={I18n.t('GenerateMnemonic.confirm').toUpperCase()}
          style={styles.primaryButton}
          onPress={onConfirm}
        />
      </View>
    )
  }
}

class WarningItem extends PureComponent <TWarningItemProps, {}> {
  render () {
    const { warningIndex } = this.props

    return (
      <View style={styles.warningItem}>
        <Text style={styles.warningNumber}>{warningIndex + 1}.</Text>
        <Text style={styles.warningItemContent}>
          <Text style={styles.warningItemTitle}>
            {I18n.t(['GenerateMnemonic', 'warnings', warningIndex.toString(), 'title'])}
          </Text>
          &nbsp;
          {I18n.t(['GenerateMnemonic', 'warnings', warningIndex.toString(), 'content'])}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  description: {
    color: '#A3A3CC',
    fontSize: 16,
    margin: 20,
  },
  mnemonic: {
    borderRadius: 3,
    color: '#FFB54E',
    fontSize: 16,
    fontWeight: '900',
  },
  mnemonicContainer: {
    backgroundColor: '#302D59',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  primaryButton: {
    marginHorizontal: 30,
  },
  warningContainer: {
    backgroundColor: '#302D59',
    borderRadius: 3,
    borderTopColor: '#FFB54E',
    borderTopWidth: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingBottom: 30,
  },
  warningItem: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  warningItemContent: {
    color: '#A3A3CC',
    flex: 1,
    fontSize: 16,
  },
  warningItemTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },
  warningNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    marginRight: 5,
  },
  warningTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 10,
    marginHorizontal: 20,
    marginTop: 30,
  },
})
