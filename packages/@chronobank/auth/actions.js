/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

// import * as AuthActionTypes from './constants'
import { createActions } from 'redux-actions'

const authActions = createActions({
  AUTH: {
    PRIVATE_KEY: {
      SET: (privateKey) => ({ privateKey }),
      RESET: undefined // undefined means just dispatch({type: AUTH/PRIVATE_KEY/RESET}) with no payload
    },
    USER_PROFILE: {
      FETCH_REQUEST: undefined,
      FETCH_SUCCESS: (data) => ({
        status: {
          isFetching: false,
          isFetchingError: false,
          error: null
        },
        data
      }),
      FETCH_FAIL: (error) => ({
        status: {
          isFetching: false,
          isFetchingError: true,
          error
        }
      })
    },
    PERSON_INFO: {
      FETCH_REQUEST: undefined,
      FETCH_SUCCESS: (data) => ({
        status: {
          isFetching: false,
          isFetchingError: false,
          error: null
        },
        data
      }),
      FETCH_FAIL: (error) => ({
        status: {
          isFetching: false,
          isFetchingError: true,
          error
        }
      })
    }
  }
})

export default authActions
