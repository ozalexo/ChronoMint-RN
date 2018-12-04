/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React, { PureComponent } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native'
import PropTypes from 'prop-types'
import i18n from '../../../locales/translation'
import {
  send_ios,
  receive_ios,
} from '../../../images'
import TransactionsList from '../../../components/TransactionsList'
import WalletInfoContainer from './WalletInfo'
import styles from './WalletStyles'

const ActionButton = ({ title, image, onPress }) => (
  <TouchableOpacity
    style={styles.actionButton}
    onPress={onPress}
  >
    <Image
      source={image}
      style={styles.actionIcon}
    />
    <Text style={styles.actionTitle}>
      {title}
    </Text>
  </TouchableOpacity>
)
ActionButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
}

export default class Wallet extends PureComponent {

  static propTypes = {
    address: PropTypes.string,
    blockchain: PropTypes.string,
    selectedCurrency: PropTypes.string,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
    onReceive: PropTypes.func,
    onSend: PropTypes.func,
  }


  render () {
    const {
      onSend,
      onReceive,
      navigation,
      address,
      blockchain,
      selectedCurrency,
    } = this.props
    return (
      <View style={styles.screenView}>
        <ScrollView style={styles.mainSection}>
          <WalletInfoContainer
            address={address}
            blockchain={blockchain}
            selectedCurrency={selectedCurrency}
          />
          <TransactionsList
            navigation={navigation}
            mainWalletTransactionLoadingStatus={{ isFetched: true, isFetching: false, isInited: true }} //for Testing
          />
        </ScrollView>
        <View style={styles.actions}>
          <ActionButton
            title={i18n.t('Wallet.send')}
            image={send_ios}
            onPress={onSend}
          />
          <ActionButton
            title={i18n.t('Wallet.receive')}
            image={receive_ios}
            onPress={onReceive}
          />
        </View>
      </View>
    )

  }
}
