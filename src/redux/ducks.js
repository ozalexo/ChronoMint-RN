/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import { default as Core } from '@chronobank/core/redux/ducks'
import * as network from '@chronobank/login/redux/network/'
import * as sensitive from './sensitive'

import { type TStateSensitive } from './sensitive/reducer'

export default {
  network,
  sensitive,
  ...Core
}

export type TState = {} | {
  sensitive: TStateSensitive
}
