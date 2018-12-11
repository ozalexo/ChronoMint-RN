/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import { DUCK_ETHEREUM } from '@chronobank/ethereum/redux/constants'
import { DUCK_BITCOIN } from '@chronobank/bitcoin/redux/constants'
import i18n from '../../../locales/translation'
import PrimaryButton from '../../../components/PrimaryButton'
import FeeSlider from '../../../components/FeeSlider'
import Input from '../../../components/Input'
import Separator from '../../../components/Separator'
import { NavigationEvents } from 'react-navigation'
import {
  chevron_right,
  coin_bitcoin,
  coin_ethereum,
  coin_time_small,
} from '../../../images'
import styles from './SendStyles'


const TokenSelector = ({ onPress = () => { }, selectedToken }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.tokenSelector}>
      {
        selectedToken && selectedToken.symbol &&
        <Text style={styles.tokenSelectorLabel}>
          {
            selectedToken.symbol
          }
        </Text>
      }
      <Image source={chevron_right} />
    </View>
  </TouchableOpacity>
)

TokenSelector.propTypes = {
  onPress: PropTypes.func,
  selectedToken: PropTypes.string,
}

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
      //
      amount,
      amountInCurrency,
      blockchain,
      // currentTokenBalance,
      feeMultiplier,
      gasFeeAmount,
      gasFeeAmountInCurrency,
      onChangeAmount = () => { },
      onChangeRecipient = () => { },
      onFeeSliderChange = () => { },
      onSelectToken,
      recipient,
      selectedCurrency,
      selectedToken,
      selectedWallet,
      passProps,
      //txDraft
      onTxDraftCreate,
      onTxDraftRemove,
    } = this.props

    const currentTokenBalance = selectedWallet.tokens ?
      selectedWallet.tokens[Object.keys(selectedWallet.tokens)[0]].balance :
      null

    const strings = {
      amountInput: `Amount, ${selectedToken.symbol || ''}`,
      walletValue: selectedToken && [selectedToken.symbol, selectedToken.amount].join(' '),
      walletTitle: `My ${blockchain} Wallet`,
      walletBalance: `${selectedCurrency} ${currentTokenBalance && currentTokenBalance.toFixed(2)}`,
      sendBalance: `${selectedCurrency} ${amountInCurrency.toFixed(2)}`,
      advancedFee: 'Advanced Fee',
      scanQr: 'Scan QR code',
    }

    const cryptoImages = {
      [DUCK_ETHEREUM]: coin_ethereum,
      [DUCK_BITCOIN]: coin_bitcoin,
    }
    
    return (
      <ScrollView style={styles.scrollView}>
        <NavigationEvents
          onDidFocus={onTxDraftCreate}
          onWillBlur={onTxDraftRemove}
        />
        {showPasswordModal && <PasswordEnterModal
          passProps={passProps}
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
          {
            (blockchain === DUCK_ETHEREUM)
              ? (
                <View>
                  <Separator style={styles.separatorDark} />
                  <TokenSelector
                    selectedToken={selectedToken}
                    onPress={onSelectToken}
                  />
                </View>
              ) : null
          }
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
            name='recipient'
          />
          <Input
            placeholder={strings.amountInput}
            keyboardType='numeric'
            onChange={onChangeAmount}
            name='amount'
          />
          <Text style={styles.sendBalance}>
            {
              strings.sendBalance
            }
          </Text>
          <FeeSlider
            tokenSymbol={selectedToken.symbol}
            selectedCurrency={selectedCurrency}
            calculatedFeeValue={gasFeeAmount}
            calculatedFeeValueInSelectedCurrency={gasFeeAmountInCurrency}
            maximumValue={1.9}
            minimumValue={0.1}
            value={feeMultiplier}
            step={0.1}
            handleValueChange={onFeeSliderChange}
          />
        </View>
        <PrimaryButton
          label='Go to password entrance'
          onPress={onTogglePasswordModal}
          style={styles.openModalButton}
        />
      </ScrollView>
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
