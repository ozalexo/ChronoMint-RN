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
import styles from './ConfirmSendModalStyles'

const ConfirmSendModal = ({ visible, modalToggle, sendConfirm }) => (
  <Modal
    animationType="slide"
    visible={visible}
    onRequestClose={modalToggle}
  >
    <View style={styles.modal}>
      <View style={styles.actions}>
        <ActionButton
          title='Cancel'
          onPress={modalToggle}
        />
      </View>
      <View style={styles.confirmButtons}>
        <PrimaryButton
          label='Confirm Send'
          onPress={sendConfirm}
        />
      </View>
    </View>
  </Modal>
)

ConfirmSendModal.propTypes = {
  visible: PropTypes.bool,
  modalToggle: PropTypes.func,
  sendConfirm: PropTypes.func,
  styles: PropTypes.shape({}),
}

export default ConfirmSendModal
