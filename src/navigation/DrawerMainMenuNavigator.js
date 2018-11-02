/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  createDrawerNavigator,
  DrawerActions,
} from 'react-navigation'
import WalletStack from './WalletStack'
import DrawerMainMenuContainer from '../containers/DrawerMainMenuContainer'

const DrawerMainMenuNavigator = createDrawerNavigator(
  {
    WalletStack,
  },
  {
    contentComponent: (props) => (
      <DrawerMainMenuContainer {...props} />
    ),
    getCustomActionCreators: (route, stateKey) => {
      return {
        toggleMainMenuDrawer: () =>
          DrawerActions.toggleDrawer({ key: stateKey }),
      }
    },
    navigationOptions: {
      headerTransparent: true,
    },
  }
)

export default DrawerMainMenuNavigator
