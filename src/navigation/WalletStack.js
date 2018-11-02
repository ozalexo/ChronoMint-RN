/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  createStackNavigator,
} from 'react-navigation'

import WalletList from '../screens/Wallet/WalletList'

const WalletStack = createStackNavigator(
  {
    WalletList,
  },
  {
    initialRouteName: 'WalletsList',
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

export default WalletStack
