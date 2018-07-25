/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import Core from '@chronobank/core/redux/ducks'
import * as network from '@chronobank/login/redux/network/'
import * as sensitive from './sensitive'

import { type TStateSensitive } from './sensitive/reducer'

export {
  network,
  sensitive,
  ...Core,
}

export type TState = {} | {
  sensitive: TStateSensitive
}
