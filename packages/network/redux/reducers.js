/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import initialState from './initialState'
import * as ActionTypes from './constants'

const networkSelect = (state, action) => {
  return {
    ...state,
    selected: state.availableNetworks[action.networkIndex],
  }
}

const mutations = {
  [ActionTypes.NETWORK_SELECT]: networkSelect,
}

export default (state = initialState, { type, ...payload }) => {
  return (type in mutations)
    ? mutations[type](state, payload)
    : state
}
