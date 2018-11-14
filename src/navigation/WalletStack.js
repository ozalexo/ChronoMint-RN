/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  Animated,
  Easing,
} from 'react-native'
import {
  createStackNavigator,
} from 'react-navigation'

import WalletList from '../screens/Wallet/WalletList'

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
    transitionConfig,
    transparentCard: true,
  }
)

export default WalletStack
