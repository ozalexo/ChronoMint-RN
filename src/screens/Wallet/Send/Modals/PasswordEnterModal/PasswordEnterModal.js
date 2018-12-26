/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  SafeAreaView,
  View,
  Modal,
} from 'react-native'
import PropTypes from 'prop-types'
import ActionButton from '../../../../../components/ActionButton'
import PrimaryButton from '../../../../../components/PrimaryButton'
import TextButton from '../../../../../components/TextButton'
import Input from '../../../../../components/Input'

import styles from './PasswordEnterModalStyles'

const PasswordEnterModal = ({
  visible,
  modalToggle,
  onConfirmPassword,
  onPasswordChange,
  error,
  biometryType,
  onScan,
}) => (
  <Modal
    animationType='slide'
    visible={visible}
    onRequestClose={modalToggle}
  >
    <SafeAreaView style={styles.modal}>
      <View style={styles.actions}>
        <ActionButton
          title='Go back'
          onPress={modalToggle}
        />
      </View>
      <View>
        <Input
          label='Enter password'
          name='password'
          onChange={onPasswordChange}
          error={error}
          secureTextEntry
        />
        <PrimaryButton
          label='Enter password'
          onPress={onConfirmPassword}
        />
        {
          biometryType &&
          <TextButton
            texStyle={styles.authButton}
            label={`${biometryType} Auth`}
            onPress={onScan}
          />
        }
      </View>
    </SafeAreaView>
  </Modal>
)

PasswordEnterModal.propTypes = {
  visible: PropTypes.bool,
  modalToggle: PropTypes.func,
  onScan: PropTypes.func,
  onPasswordChange: PropTypes.func,
  onConfirmPassword: PropTypes.func,
  error: PropTypes.string,
  biometryType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  styles: PropTypes.shape({}),
  passProps: PropTypes.shape({}),
}

export default PasswordEnterModal
