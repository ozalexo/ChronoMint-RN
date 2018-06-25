/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

//#region imports

import React, { PureComponent } from 'react'
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import { type Navigator as TNavigator } from 'react-native-navigation'
import MainWalletModel from '@chronobank/core/models/wallet/MainWalletModel'
import {
  TabView,
} from 'react-native-tab-view'
import Separator from '../components/Separator'
import styles from '../screens/styles/WalletStyles'

//#endregion

//#region types

export type TMainWalletModel = typeof MainWalletModel

export type TPrices = {
  [token: string]: {
    [currency: string]: number
  }
}

export type TActionButtonProps = {
  title: string,
  image: any,
  onPress?: () => void,
}

export type TTab = 'transactions' | 'tokens' | 'owners' | 'templates'

export type TWalletProps = {
  blockchain: string,
  navigationState: any,
  navigator: TNavigator,
  renderScene: any,
  onIndexChange(index: number): void,
  onReceive(): void,
  onSend(): void,
}

//#endregion

const ActionButton = ({ title, image, onPress }: TActionButtonProps) => (
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

export default class Wallet extends PureComponent<TWalletProps, {}> {

  _renderLabel = ({ position, navigationState }) => ({ route, index, jump }) => {
    const inputRange = navigationState.routes.map((x, i) => i)

    // tab text color
    const color = position.interpolate({
      inputRange,
      outputRange: inputRange.map( (i) =>
        i === index
          ? '#4D35AE'
          : '#FFFFFF'
      ),
    })

    // tab background color
    const backgroundColor = position.interpolate({
      inputRange,
      outputRange: inputRange.map( (i) =>
        i === index
          ? '#FFFFFF'
          : '#4e3d99'
      ),
    })

    return (
      <Animated.View
        style={{ backgroundColor }}
        key={route.key}
      >
        <TouchableWithoutFeedback
          onPress={jump}
        >
          <Animated.Text style={[styles.tabItem, { color }]}>
            {
              route.title
            }
          </Animated.Text>
        </TouchableWithoutFeedback>
      </Animated.View>
    )
  }

  _renderTabBar = (props) => {

    // If we have only one tab, then do not display TabBar
    if (!props.navigationState.routes || props.navigationState.routes.length < 2) {
      return null
    }

    return (
      <View style={styles.tabsContainer}>
        {
          props.navigationState
            .routes
            .map((route, index, array) => {
              const jump = () => props.jumpTo(route.key)
              return [
                this._renderLabel(props)({ route, index, jump }),
                (index !== array.length - 1)
                  ? <Separator style={styles.separator} key={'s_'+route.key} />
                  : null,
              ]
            })
        }
      </View>
    )
  }

  render () {
    const {
      onIndexChange,
      renderScene,
      onSend,
      onReceive,
      navigationState,
    } = this.props
    return (
      <View style={styles.screenView}>
        <TabView
          navigationState={navigationState}
          renderScene={renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={onIndexChange}
          initialLayout={{
            height: 0,
            width: Dimensions.get('window').width,
          }}
          useNativeDriver
        />
        <View style={styles.actions}>
          <ActionButton
            title={I18n.t('Wallet.send')}
            image={require('../images/send-ios.png')}
            onPress={onSend}
          />
          <ActionButton
            title={I18n.t('Wallet.receive')}
            image={require('../images/receive-ios.png')}
            onPress={onReceive}
          />
        </View>
      </View>
    )

  }
}
