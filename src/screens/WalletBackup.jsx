/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React from 'react'
import {
  Switch,
  Text,
  View
} from 'react-native'
import I18n from 'react-native-i18n'
import styles from './styles/WalletBackupStyles'
import PrimaryButton from '../components/PrimaryButton'
import Separator from '../components/Separator'
import TextButton from '../components/TextButton'
import LoginLayout from '../components/LoginLayout'

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
      usePinProtection
    } = this.props

    const strings = {
      backupLater: I18n.t('WalletBackup.later'),
      backupWallet: I18n.t('WalletBackup.backupWallet').toUpperCase(),
      or: I18n.t('WalletBackup.or'),
      subtitle: I18n.t('WalletBackup.subtitle'),
      title: I18n.t('WalletBackup.title'),
      usePinProtection: I18n.t('WalletBackup.usePinProtection')
    }

    return (
      <LoginLayout>
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
      </LoginLayout>
    )
  }
}

export default WalletBackup
