/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  View,
  Modal,
} from 'react-native'
import PropTypes from 'prop-types'
import ActionButton from '../../../../../components/ActionButton'
import PrimaryButton from '../../../../../components/PrimaryButton'
import Input from '../../../../../components/Input'
import styles from './PasswordEnterModalStyles'

const PasswordEnterModal = ({ visible, modalToggle, passwordChange, error, confirmPassword, passProps }) => {
  console.log("passProps im MODAL: ", passProps)
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={modalToggle}
    >
      <View style={styles.modal}>
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
            onChange={passwordChange}
            error={error}
          />
          <PrimaryButton
            label='Enter password'
            onPress={confirmPassword}
          />
        </View>
      </View>
    </Modal>
  )
}

PasswordEnterModal.propTypes = {
  visible: PropTypes.bool,
  modalToggle: PropTypes.func,
  passwordChange: PropTypes.func,
  error: PropTypes.string,
  confirmPassword: PropTypes.func,
  styles: PropTypes.shape({}),
}

export default PasswordEnterModal
