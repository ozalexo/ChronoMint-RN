/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

// import * as auth from './constants'
import { handleActions } from 'redux-actions'
import actions from './actions'

export type TAuthState = {
  privateKey: ?string,
  personInfo: {
    data: any,
    status: {
      isFetching: boolean,
      isFetchingError: boolean,
      error: any
    }
  },
  userProfile: {
    data: any,
    status: {
      isFetching: boolean,
      isFetchingError: boolean,
      error: any
    }
  }
}

const initialState = {
  privateKey: null,
  personInfo: {
    data: null,
    status: {
      isFetching: false,
      isFetchingError: false,
      error: null
    }
  },
  userProfile: {
    data: null,
    status: {
      isFetching: false,
      isFetchingError: false,
      error: null
    }
  }
}

export default handleActions({

  [actions.auth.privateKey.set]: (state, action) => ({
    ...state,
    privateKey: action.payload.privateKey
  }),

  [actions.auth.privateKey.reset]: (state, action) => ({
    ...state,
    privateKey: null
  }),

  [actions.auth.userProfile.fetchRequest]: (state, action) => ({
    ...state,
    userProfile: {
      status: {
        isFetching: true,
        isFetchingError: false,
        error: null
      }
    }
  }),

  [actions.auth.userProfile.fetchSuccess]: (state, action) => ({
    ...state,
    userProfile: {
      status: {
        isFetching: false,
        isFetchingError: false,
        error: null
      },
      data: action.payload.data
    },
  }),

  [actions.auth.userProfile.fetchFail]: (state, action) => ({
    ...state,
    userProfile: {
      status: {
        isFetching: false,
        isFetchingError: true,
        error: action.payload.serror
      }
    }
  }),

  [actions.auth.personInfo.fetchRequest]: (state, action) => ({
    ...state,
    personInfo: {
      status: {
        isFetching: true,
        isFetchingError: false,
        error: null
      }
    }
  }),

  [actions.auth.personInfo.fetchSuccess]: (state, action) => ({
    ...state,
    personInfo: {
      status: {
        isFetching: false,
        isFetchingError: false,
        error: null
      },
      data: action.payload.data
    },
  }),

  [actions.auth.personInfo.fetchFail]: (state, action) => ({
    ...state,
    personInfo: {
      status: {
        isFetching: false,
        isFetchingError: true,
        error: action.payload.serror
      }
    }
  }),
}, initialState)
