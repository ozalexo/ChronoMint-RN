/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import Download2FAApp from '../screens/Download2FAApp'

class Download2FAAppContainer extends PureComponent<{}, {}> {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Cancel',
        id: 'cancel'
      }
    ],
    rightButtons: [
      {
        title: 'Proceed',
        id: 'proceed'
      }
    ]
  }

  render () {
    return (<Download2FAApp />)
  }
}

export default Download2FAAppContainer
