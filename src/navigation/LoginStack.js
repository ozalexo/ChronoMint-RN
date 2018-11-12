/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  createStackNavigator,
} from 'react-navigation'
import Start from '../screens/Login/Start'
import HeaderLanguageSelect from '../screens/Login/Start/components/HeaderLanguageSelect'
import HeaderNetworkSelect from '../screens/Login/Start/components/HeaderNetworkSelect'

const LoginStack = createStackNavigator(
  {
    'Start': {
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderNetworkSelect toggleDrawer={navigation.toggleNetworkDrawer} />,
        headerRight: <HeaderLanguageSelect toggleDrawer={navigation.toggleLanguageDrawer} />,
        headerLeftContainerStyle: { paddingLeft: 20 },
        headerRightContainerStyle: { paddingRight: 20 },
        headerForceInset: { top: 'never' },
        headerStyle: {
          height: 44,
        },
      }),
      screen: Start,
    },
  },
  {
    initialRouteName: 'Start',
    navigationOptions: () => ({
      headerTransparent: true,
      headerBackTitle: null,
      headerTintColor: 'white',
    }),
    cardStyle: {
      backgroundColor: 'transparent',
    },
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: 'transparent',
      },
    }),
    transparentCard: true,
  }
)

export default LoginStack
