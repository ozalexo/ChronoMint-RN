/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

// #region imports
import React from 'react'
import {
  createDrawerNavigator,
  DrawerActions
} from 'react-navigation'
import LoginStack from './LoginStack'
import DrawerContainer from '../containers/DrawerContainer'
// #endregion

/**
 * Root Login stack (this is entry point for cold app start)
 * Also this is left-side menu (Drawer)
*/
const DrawerLeft = createDrawerNavigator(
  {
    LoginStack
  },
  // $FlowExpectedError getCustomActionCreators does not exist yet in .flow
  {
    drawerPosition: 'left',
    contentComponent: (props) => (
      <DrawerContainer {...props} />
    ),
    getCustomActionCreators: (route, stateKey) => {
      return {
        toggleMainMenuDrawer: () =>
          DrawerActions.toggleDrawer({ key: stateKey })
      }
    }
  }
)

export default DrawerLeft
