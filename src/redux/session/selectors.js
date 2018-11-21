
/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */
import { createSelector } from 'reselect'
import { DUCK_SESSION } from './constants'

const getDuckSession = (state) =>
  state[DUCK_SESSION]

export const getCurrentWallet = createSelector(
  getDuckSession,
  (session) => {
    const { currentWallet } = session
    return currentWallet
  },
)
