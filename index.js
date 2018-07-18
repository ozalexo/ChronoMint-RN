/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

// FOR DEVELOPERS
// Uncomment the following line and watch for network requests at "Network" tab of dev. tools
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest

/**
 * Disable some of Yellow warnings
 * TODO: this is deprecated syntax and must be replaced.
 */
// eslint-disable-next-line no-console
console.ignoredYellowBox = [
  'Warning: componentWillMount',
  'Warning: componentWillReceiveProps',
  'Warning: componentWillUpdate',
  'Can\'t restore local session',
]

// main entry point
import { AppRegistry } from 'react-native';
import App from './src/app';
AppRegistry.registerComponent('chronomintrn', () => App);
