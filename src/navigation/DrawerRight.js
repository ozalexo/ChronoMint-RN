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
import DrawerLeft from './DrawerLeft'
import SelectLanguageContainer from '../containers/SelectLanguageContainer'
// #endregion

/**
 * Root of Login stack
 * Also this is right-side menu (Drawer)
*/
const DrawerRight = createDrawerNavigator(
  {
    DrawerLeft
  },
  // $FlowExpectedError getCustomActionCreators does not exist yet in .flow
  {
    drawerPosition: 'right',
    contentComponent: (props) => (
      <SelectLanguageContainer {...props} />
    ),
    getCustomActionCreators: (route, stateKey) => {
      return {
        toggleLanguageDrawer: () =>
          DrawerActions.toggleDrawer({ key: stateKey })
      }
    }
  }
)

export default DrawerRight
