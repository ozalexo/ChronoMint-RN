/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { BLOCKCHAIN_ETHEREUM } from '@chronobank/ethereum/constants'
import { BLOCKCHAIN_BITCOIN } from '@chronobank/bitcoin/constants'
// import i18n from '../../../locales/translation'
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
import styles from './SendEthStyles'


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
  selectedToken: PropTypes.shape({}),
}

export default class SendEth extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      keyboardAvoidingViewKey: 'keyboardAvoidingViewKey',
    }
  }

  componentDidMount () {
    // using keyboardWillHide is better but it does not work for android
    this.keyboardHideListener = Keyboard.addListener(
      Platform.OS === 'android'
        ? 'keyboardDidHide'
        : 'keyboardWillHide',
      this.keyboardHideListener.bind(this)
    )
  }

  componentWillUnmount () {
    this.keyboardHideListener.remove()
  }

  keyboardHideListener () {
    this.setState({
      keyboardAvoidingViewKey: 'keyboardAvoidingViewKey' + new Date().getTime()
    })
  }

  render () {
    const {
      onTogglePasswordModal,
      onCloseConfirmModal,
      onPasswordConfirm,
      onSendConfirm,
      PasswordEnterModal,
      ConfirmSendModal,
      showPasswordModal,
      showConfirmModal,
      error,
      //
      amountInCurrency,
      blockchain,
      price,
      // currentTokenBalance,
      feeMultiplier,
      gasLimit,
      gasLimitInCurrency,
      onChangeAmount = () => { },
      onChangeRecipient = () => { },
      onFeeSliderChange = () => { },
      onSelectToken,
      selectedCurrency,
      selectedToken,
      selectedWallet,
      passProps,
      //txDraft
      onTxDraftCreate,
      onTxDraftRemove,
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

    let { keyboardAvoidingViewKey } = this.state

    return (
      <KeyboardAvoidingView
        key={keyboardAvoidingViewKey}
        behavior='height'
      >
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
            {
              (blockchain === BLOCKCHAIN_ETHEREUM)
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
              calculatedFeeValue={gasLimit}
              calculatedFeeValueInSelectedCurrency={gasLimitInCurrency}
              maximumValue={1.9}
              minimumValue={0.1}
              value={feeMultiplier}
              step={0.1}
              handleValueChange={onFeeSliderChange}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

SendEth.propTypes = {
  fee: PropTypes.number,
  feeInCurrency: PropTypes.number,
  onTogglePasswordModal: PropTypes.func,
  onCloseConfirmModal: PropTypes.func,
  onPasswordConfirm: PropTypes.func,
  onSendConfirm: PropTypes.func,
  PasswordEnterModal: PropTypes.func,
  ConfirmSendModal: PropTypes.func,
  showPasswordModal: PropTypes.bool,
  showConfirmModal: PropTypes.bool,
  error: PropTypes.string,
}
