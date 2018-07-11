/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

// FOR DEVELOPERS
// Uncomment the following line and watch for network requests at "Network" tab of dev. tools
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest

// eslint-disable-next-line no-console
console.ignoredYellowBox = [
  'Warning: componentWillMount',
  'Warning: componentWillReceiveProps',
  'Warning: componentWillUpdate',
  'Can\'t restore local session',
]

import './src/app.js'
