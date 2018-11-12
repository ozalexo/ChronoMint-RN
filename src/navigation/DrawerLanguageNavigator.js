/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import {
  createDrawerNavigator,
  DrawerActions,
} from 'react-navigation'
import DrawerNetworkNavigator from './DrawerNetworkNavigator'
import DrawerLanguageContainer from '../containers/DrawerLanguageContainer'

const DrawerLanguageNavigator = createDrawerNavigator(
  {
    DrawerNetworkNavigator,
  },
  {
    drawerPosition: 'right',
    contentComponent: (props) => (
      <DrawerLanguageContainer {...props} />
    ),
    getCustomActionCreators: (route, stateKey) => {
      return {
        toggleLanguageDrawer: () =>
          DrawerActions.toggleDrawer({ key: stateKey }),
      }
    },
    navigationOptions: {
      headerTransparent: true,
      headerForceInset: {
        top: 'never',
      },
      headerStyle: {
        marginTop: 0,
      },
    },
  },
)

export default DrawerLanguageNavigator
