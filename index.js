/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { YellowBox } from 'react-native'
// FOR DEVELOPERS
// Uncomment the following line and watch for network requests at "Network" tab of dev. tools
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest

YellowBox.ignoreWarnings([
  'Can\'t restore local session',
  'Module RNOS',
  '_resolver',
  'ContractsManager',
  'DEPRECATED',
])

import './src/app.js'
