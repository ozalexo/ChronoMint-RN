/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import * as ActionsTypes from './constants'
import initialState from './initialState'

const mutations = {

  [ActionsTypes.ETHEREUM_CREATE_WALLET]: (state, { address }) => {
    let list = Object.assign({}, state.list)
    list = { ...list, address }
    return {
      ...state,
      list,
    }
  },
}

export default (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}
