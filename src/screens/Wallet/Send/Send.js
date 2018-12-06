/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import PrimaryButton from '../../../components/PrimaryButton'
import styles from './SendStyles'

export default class Send extends PureComponent {

  render () {
    const {
      onTogglePasswordModal,
      onCloseConfirmModal,
      onPasswordChange,
      onPasswordConfirm,
      onSendConfirm,
      PasswordEnterModal,
      ConfirmSendModal,
      showPasswordModal,
      showConfirmModal,
      error,
    } = this.props
    return (
      <View style={styles.screenView}>
        {showPasswordModal && <PasswordEnterModal
          visible={showPasswordModal}
          modalToggle={onTogglePasswordModal}
          passwordChange={onPasswordChange}
          error={error}
          confirmPassword={onPasswordConfirm}
        />
        }
        {showConfirmModal && <ConfirmSendModal
          visible={showConfirmModal}
          modalToggle={onCloseConfirmModal}
          sendConfirm={onSendConfirm}
        />
        }
        <PrimaryButton
          label='Go to password entrance'
          onPress={onTogglePasswordModal}
        />
      </View>
    )
  }
}

Send.propTypes = {
  onTogglePasswordModal: PropTypes.func,
  onCloseConfirmModal: PropTypes.func,
  onPasswordChange: PropTypes.func,
  onPasswordConfirm: PropTypes.func,
  onSendConfirm: PropTypes.func,
  PasswordEnterModal: PropTypes.func,
  ConfirmSendModal: PropTypes.func,
  showPasswordModal: PropTypes.bool,
  showConfirmModal: PropTypes.bool,
  error: PropTypes.string,
}
