
/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */
import { createSelector } from 'reselect'
import { DUCK_SESSION } from './constants'


export const getCurrentWallet = createSelector(
  (state) => state[DUCK_SESSION],
  (session) => {
    const { currentWallet } = session
    return currentWallet
  },
)
