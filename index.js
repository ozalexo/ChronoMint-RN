/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import './shim'
import { AppRegistry, YellowBox} from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

// See https://stackoverflow.com/questions/53638667/unrecognized-websocket-connection-options-agent-permessagedeflate-pfx
// eslint-disable-next-line no-console
console.ignoredYellowBox = ['Remote debugger']
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
  'Setting a timer for a long period of time, i.e. multiple minutes,',
])

AppRegistry.registerComponent(appName, () => App)
