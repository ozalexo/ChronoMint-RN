/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import {
  indicator_2fa,
  indicator_advanced,
  indicator_deposit,
  indicator_receiving_0,
  indicator_receiving_25,
  indicator_receiving_50,
  indicator_receiving_75,
  indicator_receiving_100,
  indicator_sending_0,
  indicator_sending_25,
  indicator_sending_50,
  indicator_sending_75,
  indicator_sending_100,
  indicator_shared_wallet,
  indicator_time_locked,
} from '../../images'

export const indicators = {
  '2fa': indicator_2fa,
  advanced: indicator_advanced,
  deposit: indicator_deposit,
  receiving0: indicator_receiving_0,
  receiving25: indicator_receiving_25,
  receiving50: indicator_receiving_50,
  receiving75: indicator_receiving_75,
  receiving100: indicator_receiving_100,
  sending0: indicator_sending_0,
  sending25: indicator_sending_25,
  sending50: indicator_sending_50,
  sending75: indicator_sending_75,
  sending100: indicator_sending_100,
  shared: indicator_shared_wallet,
  timeLocked: indicator_time_locked,
}

export const PIN_LENGTH = 4

export const MNEMONIC_LENGTH = 12

export const SESSION_DESTROY = 'session/DESTROY'
