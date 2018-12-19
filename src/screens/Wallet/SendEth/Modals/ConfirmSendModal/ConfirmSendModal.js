/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Modal,
} from 'react-native'
import PropTypes from 'prop-types'
import ActionButton from '../../../../../components/ActionButton'
import LabeledItem from '../../../../../components/LabeledItem'
import styles from './ConfirmSendModalStyles'

const ConfirmSendModal = ({
  visible,
  modalToggle,
  onConfirmSend,
  recipientAddress,
  currentToken,
  amountToSend,
  selectedCurrency,
  fee,
  balance,
}) =>
  (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={modalToggle}
    >
      <SafeAreaView style={styles.modal}>
        <View style={styles.actions}>
          <ActionButton
            title='Cancel'
            onPress={modalToggle}
          />
          <Text style={styles.screenLabel}>
            Confirm Send
          </Text>
          <ActionButton
            title='Confirm'
            onPress={onConfirmSend}
          />
        </View>
        <View style={styles.container}>
          <LabeledItem
            labelText='Send To'
            labelAlign='top'
          >
            <Text>
              {
                recipientAddress
              }
            </Text>
          </LabeledItem>
          <LabeledItem
            labelText={`${currentToken} ${amountToSend && amountToSend.token}`}
            labelType='currencyColored'
            labelAlign='top'
          >
            <Text style={styles.lightGreyText}>
              {
                `${selectedCurrency} ${amountToSend && amountToSend.currency && amountToSend.currency.toFixed(2)}`
              }
            </Text>
          </LabeledItem>
          <LabeledItem
            labelText='Fee'
            labelAlign='top'
          >
            <Text>
              {
                `${currentToken} ${fee && fee.token}`
              }
              <Text style={styles.lightGreyText}>
                {
                  ` (${selectedCurrency} ${fee && fee.currency && fee.currency.toFixed(2)})`
                }
              </Text>
            </Text>
          </LabeledItem>
          <LabeledItem
            labelText='Balance'
            labelAlign='top'
          >
            <Text>
              {
                `${currentToken}  ${balance && balance.token}`
              }
              <Text style={styles.lightGreyText}>
                {
                  ` (${selectedCurrency} ${balance && balance.currency && balance.currency.toFixed(2)})`
                }
              </Text>
            </Text>
          </LabeledItem>
        </View>
      </SafeAreaView>
    </Modal>
  )

ConfirmSendModal.propTypes = {
  visible: PropTypes.bool,
  recipientAddress: PropTypes.string,
  currentToken: PropTypes.string,
  amountToSend: PropTypes.shape({
    token: PropTypes.number,
    currency: PropTypes.number,
  }),
  selectedCurrency: PropTypes.string,
  fee: PropTypes.shape({
    token: PropTypes.number,
    currency: PropTypes.number,
  }),
  balance: PropTypes.shape({
    token: PropTypes.number,
    currency: PropTypes.number,
  }),
  modalToggle: PropTypes.func,
  onConfirmSend: PropTypes.func,
}

export default ConfirmSendModal
