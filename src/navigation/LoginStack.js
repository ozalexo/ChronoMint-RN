/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  Animated,
  Easing,
} from 'react-native'
import {
  createStackNavigator,
  HeaderBackButton,
} from 'react-navigation'
import i18n from '../locales/translation'
import EnterPrivateKey from '../screens/Login/EnterPrivateKey'
import GenerateMnemonic from '../screens/Login/GenerateMnemonic'
import ConfirmMnemonic from '../screens/Login/ConfirmMnemonic'
import HeaderLanguageSelect from '../screens/Login/Start/components/HeaderLanguageSelect'
import HeaderNetworkSelect from '../screens/Login/Start/components/HeaderNetworkSelect'
import ImportMethod from '../screens/Login/ImportMethod'
import Start from '../screens/Login/Start'
import WalletList from '../screens/Wallet/WalletList'
import { headerHeight } from '../common/constants/screens'

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [{ translateX }] }
    },
    containerStyle: {
      backgroundColor: 'transparent',
    },
  }
}

const LoginStack = createStackNavigator(
  {
    'Start': {
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderNetworkSelect toggleDrawer={navigation.toggleNetworkDrawer} />,
        headerRight: <HeaderLanguageSelect toggleDrawer={navigation.toggleLanguageDrawer} />,
        headerLeftContainerStyle: { paddingLeft: 20 },
        headerRightContainerStyle: { paddingRight: 20 },
        //each screen heigth may be set manually
        // headerStyle: { 
        //   height: 44,
        // },
      }),
      screen: Start,
    },
    'ImportMethod': {
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('ScreensTitles.ImportMethod'),
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} tintColor='white' />,
      }),
      screen: ImportMethod,
    },
    'GenerateMnemonic': {
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('ScreensTitles.GenerateMnemonic'),
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} tintColor='white' />,
      }),
      screen: GenerateMnemonic,
    },
    'ConfirmMnemonic': {
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('ScreensTitles.ConfirmMnemonic'),
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} tintColor='white' />,
      }),
      screen: ConfirmMnemonic,
    },
    'EnterPrivateKey': {
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('ScreensTitles.EnterPrivateKey'),
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} tintColor='white' />,
      }),
      screen: EnterPrivateKey,
    },
    'WalletList': {
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('ScreensTitles.WalletList'),
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} tintColor='white' />,
      }),
      screen: WalletList,
    },
  },
  {
    initialRouteName: 'Start',
    headerLayoutPreset: 'left',
    navigationOptions: () => ({
      headerForceInset: { top: 'never' },
      headerTransparent: true,
      headerBackTitle: null,
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'normal',
        fontSize: 17,
      },
      headerStyle: {
        height: headerHeight,
      },
      gestureEnadled: false,
    }),
    cardStyle: {
      backgroundColor: 'transparent',
    },
    transitionConfig,
    transparentCard: true,
  }
)

export default LoginStack
