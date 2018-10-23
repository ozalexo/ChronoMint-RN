/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import I18n from 'react-native-i18n'
import PrimaryButton from '../components/PrimaryButton'
import Separator from '../components/Separator'
import TextButton from '../components/TextButton'

type TWalletBackupProps = {
  onDone: () => void,
  onLater: () => Promise<void>,
  onSwitchUsePinProtection: (value: boolean) => void,
  usePinProtection?: boolean,
}

class WalletBackup extends React.Component<TWalletBackupProps, {}> {
  render () {
    const { 
      onDone,
      onLater,
      onSwitchUsePinProtection,
      usePinProtection,
    } = this.props

    const strings = {
      title: I18n.t('WalletBackup.title'),
      subtitle: I18n.t('WalletBackup.subtitle'),
      usePinProtection: I18n.t('WalletBackup.usePinProtection'),
      backupWallet: I18n.t('WalletBackup.backupWallet').toUpperCase(),
      or: I18n.t('WalletBackup.or'),
      backupLater: I18n.t('WalletBackup.later'),
    }

    return (
      <View>
        <Text style={styles.title}>
          { strings.title }
        </Text>
        <Text style={styles.subtitle}>
          { strings.subtitle }
        </Text>
        <Separator style={styles.separator} />
        <View style={styles.switchRow}>
          <Text style={styles.switchRowLabel}>
            {strings.usePinProtection}
          </Text>
          <Switch
            tintColor='#6EE289'
            thumbTintColor='#6EE289'
            value={usePinProtection}
            onValueChange={onSwitchUsePinProtection}
          />
        </View>
        <Separator style={styles.separator} />
        <PrimaryButton
          label={strings.backupWallet}
          onPress={onDone}
        />
        <Text style={styles.or}>
          {strings.or}
        </Text>
        <TextButton
          label={strings.backupLater}
          onPress={onLater}
        />
      </View>
    )
  }
}

export default WalletBackup

const styles = StyleSheet.create({
  or: {
    alignSelf: 'center',
    color: '#A3A3CC',
    fontSize: 16,
  },
  separator: {
    backgroundColor: '#424066',
  },
  subtitle: {
    color: '#A3A3CC',
    fontSize: 16,
    marginBottom: 30,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    margin: 20,
  },
  switchRowLabel: {
    color: '#6EE289',
    flex: 1,
    fontSize: 16,
    fontWeight: '900',
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: '900',
    margin: 20,
    textAlign: 'center',
  },
})
