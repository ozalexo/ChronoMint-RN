/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import ConfirmSendModal from './Modals/ConfirmSendModal'
import PasswordEnterModal from './Modals/PasswordEnterModal'
import Send from './Send'


const mapStateToProps = () => {
  return {
  }
}
const mapDispatchToProps = () => {
  return {
  }
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
