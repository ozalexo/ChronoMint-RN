/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  View,
  Modal,
  Alert,
} from 'react-native'
import PropTypes from 'prop-types'
import ActionButton from '../../../components/ActionButton'
import Input from '../../../components/Input'
import PrimaryButton from '../../../components/PrimaryButton'
import { connect } from 'react-redux'
import Send from './Send'


const mapStateToProps = () => {
  return {
  }
}
const mapDispatchToProps = () => {
  return {
  }
}

const PasswordEnterModal = ({ visible, modalToggle, passwordChange, error, confirmPassword, styles }) => (
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
PasswordEnterModal.propTypes = {
  visible: PropTypes.bool,
  modalToggle: PropTypes.func,
  passwordChange: PropTypes.func,
  error: PropTypes.string,
  confirmPassword: PropTypes.func,
  styles: PropTypes.shape({}),
}

const ConfirmSendModal = ({ visible, modalToggle, sendConfirm, styles }) => (
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

class SendContainer extends React.Component {

  state = {
    enterPasswordModal: false,
    confirmSendModal: false,
    error: null,
  }

  handleTogglePasswordModal = () => {
    this.setState({ enterPasswordModal: !this.state.enterPasswordModal })
  }

  handleCloseConfirmModal = () => {
    this.setState({ enterPasswordModal: false }, () => {
      this.setState({ confirmSendModal: false })
    })
  }

  handlePasswordConfirm = () => {
    this.setState({ confirmSendModal: !this.state.confirmSendModal })
  }

  handleSendConfirm = () => {
    Alert.alert('SEND CONFIRMED')
    this.handleCloseConfirmModal()
  }

  handlePasswordChange = (name, value) => {
    this.setState({ [name]: value })
  }


  render () {
    const {
      enterPasswordModal,
      confirmSendModal,
      error,
    } = this.state
    return (
      <Send
        onTogglePasswordModal={this.handleTogglePasswordModal}
        onCloseConfirmModal={this.handleCloseConfirmModal}
        onPasswordChange={this.handlePasswordChange}
        onPasswordConfirm={this.handlePasswordConfirm}
        onSendConfirm={this.handleSendConfirm}
        PasswordEnterModal={PasswordEnterModal}
        ConfirmSendModal={ConfirmSendModal}
        //state
        showPasswordModal={enterPasswordModal}
        showConfirmModal={confirmSendModal}
        error={error}
      />
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SendContainer)
