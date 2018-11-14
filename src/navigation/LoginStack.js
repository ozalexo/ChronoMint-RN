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
import ImportMethod from '../screens/ImportMethod'
import EnterPrivateKey from '../screens/EnterPrivateKey'
import Start from '../screens/Login/Start'
import WalletList from '../screens/Wallet/WalletList'
import HeaderLanguageSelect from '../screens/Login/Start/components/HeaderLanguageSelect'
import HeaderNetworkSelect from '../screens/Login/Start/components/HeaderNetworkSelect'

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

      return { transform: [ { translateX } ] }
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
        headerStyle: {
          height: 44,
        },
      }),
      screen: Start,
    },
    'ImportMethod': {
      navigationOptions: ({ navigation }) => ({
        title: 'Add an existing account',
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} tintColor='white' />,
      }),
      screen: ImportMethod,
    },
    'EnterPrivateKey': {
      navigationOptions: ({ navigation }) => ({
        title: 'Enter Private Key',
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} tintColor='white' />,
      }),
      screen: EnterPrivateKey,
    },
    'WalletList': {
      navigationOptions: ({ navigation }) => ({
        title: 'WalletList',
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} tintColor='white' />
      }),
      screen: WalletList,
    },
  },
  {
    initialRouteName: 'Start',
    headerLayoutPreset: 'center',
    navigationOptions: () => ({
      headerForceInset: { top: 'never' },
      headerTransparent: true,
      headerBackTitle: null,
      headerTintColor: 'white',
    }),
    cardStyle: {
      backgroundColor: 'transparent',
    },
    transitionConfig,
    transparentCard: true,
  }
)

export default LoginStack
