/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
/* eslint-disable import/prefer-default-export */
export const indicators = {
  '2fa': require('../images/indicator-2fa.png'),
  advanced: require('../images/indicator-advanced.png'),
  deposit: require('../images/indicator-deposit.png'),
  receiving0: require('../images/indicator-receiving-0.png'),
  receiving25: require('../images/indicator-receiving-25.png'),
  receiving50: require('../images/indicator-receiving-50.png'),
  receiving75: require('../images/indicator-receiving-75.png'),
  receiving100: require('../images/indicator-receiving-100.png'),
  sending0: require('../images/indicator-sending-0.png'),
  sending25: require('../images/indicator-sending-25.png'),
  sending50: require('../images/indicator-sending-50.png'),
  sending75: require('../images/indicator-sending-75.png'),
  sending100: require('../images/indicator-sending-100.png'),
  shared: require('../images/indicator-shared-wallet.png'),
  timeLocked: require('../images/indicator-time-locked.png')
}

export const PIN_LENGTH = 4

export const MNEMONIC_LENGTH = 12

export const SESSION_DESTROY = 'session/DESTROY'
