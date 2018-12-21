/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import { NavigationEvents } from 'react-navigation'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'
import { BLOCKCHAIN_BITCOIN } from '@chronobank/bitcoin/constants'
import FeeSliderFormik from '../../../components/FeeSliderFormik'
import Input from '../../../components/Input'
import Separator from '../../../components/Separator'
import TokenSelector from '../../../components/TokenSelector'
import {
  coin_bitcoin,
  coin_ethereum,
  coin_time_small,
} from '../../../images'
import ConfirmSendModal from './Modals/ConfirmSendModal'
import PasswordEnterModal from './Modals/PasswordEnterModal'
import styles from './SendEthStyles'

export default class SendEth extends PureComponent {
  static propTypes = {
    /* Parameters */
    error: PropTypes.string,
    fee: PropTypes.number,
    feeInCurrency: PropTypes.number,
    showConfirmModal: PropTypes.bool,
    showPasswordModal: PropTypes.bool,
    /* Methods */
    handleChange: PropTypes.func,
    onChangeAmount: PropTypes.func,
    onChangeRecipient: PropTypes.func,
    onCloseConfirmModal: PropTypes.func,
    onFeeSliderChange: PropTypes.func,
    onPasswordConfirm: PropTypes.func,
    onSendConfirm: PropTypes.func,
    onTogglePasswordModal: PropTypes.func,
    setFieldValue: PropTypes.func,
  }

  render () {
    const {
      /* Formik's props */
      // dirty,
      // errors,
      // handleBlur,
      // handleChange,
      // handleReset,
      // handleSubmit,
      // isSubmitting,
      // setFieldTouched,
      // setFieldValue,
      // touched,
      // values,

      /* SendEth props */
      amountInCurrency,
      blockchain,
      error,
      // fee,
      // feeInCurrency,
      feeMultiplier,
      onCloseConfirmModal,
      onPasswordConfirm,
      onSelectToken,
      onSendConfirm,
      onTogglePasswordModal,
      onTxDraftCreate,
      onTxDraftRemove,
      passProps,
      price,
      selectedCurrency,
      selectedToken,
      selectedWallet,
      showConfirmModal,
      showPasswordModal,
      onChangeAmount = () => { },
      onChangeRecipient = () => { },
      onFeeSliderChange = () => { },
    } = this.props

    const currentTokenBalance = selectedWallet.tokens ?
      selectedWallet.tokens[Object.keys(selectedWallet.tokens)[0]].amount :
      null


    const strings = {
      amountInput: `Amount, ${selectedToken && selectedToken.symbol || ''}`,
      walletValue: selectedToken && [selectedToken.symbol, selectedToken.amount].join(' '),
      walletTitle: `My ${blockchain} Wallet`,
      walletBalance: `${selectedCurrency} ${currentTokenBalance && price && (price*currentTokenBalance).toFixed(2)}`,
      sendBalance: `${selectedCurrency} ${amountInCurrency.toFixed(2)}`,
      advancedFee: 'Advanced Fee',
      scanQr: 'Scan QR code',
    }

    const cryptoImages = {
      [BLOCKCHAIN_ETHEREUM]: coin_ethereum,
      [BLOCKCHAIN_BITCOIN]: coin_bitcoin,
    }

    return (
      <ScrollView style={styles.scrollView}>
        <NavigationEvents
          onDidFocus={onTxDraftCreate}
          onWillBlur={onTxDraftRemove}
        />
        {
          showPasswordModal && <PasswordEnterModal
            passProps={passProps}
            visible={showPasswordModal}
            modalToggle={onTogglePasswordModal}
            error={error}
            confirmPassword={onPasswordConfirm}
          />
        }
        {
          showConfirmModal && <ConfirmSendModal
            visible={showConfirmModal}
            modalToggle={onCloseConfirmModal}
            sendConfirm={onSendConfirm}
            onTxDraftRemove={onTxDraftRemove}
          />
        }
        <View style={styles.formHeader}>
          <Text style={styles.walletTitle}>
            {
              strings.walletTitle
            }
          </Text>
          <Text style={styles.walletAddress}>
            {
              selectedWallet.address
            }
          </Text>
          <View>
            <Separator style={styles.separatorDark} />
            <TokenSelector
              selectedToken={selectedToken}
              onPress={onSelectToken}
            />
          </View>
          <Separator style={styles.separatorDark} />
          <Text style={styles.walletValue}>
            {
              strings.walletValue
            }
          </Text>
          <Text style={styles.walletBalance}>
            {
              strings.walletBalance
            }
          </Text>
        </View>
        <View style={styles.formBody}>
          <Image
            source={cryptoImages[blockchain] || coin_time_small}
            style={styles.tokenImage}
          />
          <Input
            placeholder='Recipient Address'
            onChange={onChangeRecipient}
          />
          <Input
            placeholder={strings.amountInput}
            keyboardType='numeric'
            onChange={onChangeAmount}
          />
          <Text style={styles.sendBalance}>
            {
              strings.sendBalance
            }
          </Text>
          <FeeSliderFormik
            maximumValue={1.9}
            minimumValue={0.1}
            value={feeMultiplier}
            step={0.1}
            handleFeeMultiplierChange={onFeeSliderChange}
          />
        </View>
      </ScrollView>
    )
  }
}
