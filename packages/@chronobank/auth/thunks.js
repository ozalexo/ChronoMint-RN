/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import axios from 'axios'
import { NavigationActions } from 'react-navigation'
import type { TAuthState } from './reducers'
import authActions from './actions'

const PROFILE_BACKEND_REST_URL = 'https://backend.profile.tp.ntr1x.com/'
const GET_SIGNATURE_REST = `/api/v1/security/signin/signature`
const GET_PERSONS_REST = `/api/v1/security/persons/query`

export const fetchPersonInfo = (addresses: string[] = []) => (dispatch, getState): Promise<*> => {
  const state = getState()
  const authState: TAuthState = state.get('auth')

  if (!authState.personInfo.status.isFetching) {
    dispatch(authActions.auth.personInfo.fetchRequest())
    return axios
      .create({ baseURL: PROFILE_BACKEND_REST_URL })
      .post(
        GET_PERSONS_REST,
        addresses
      )
  } else {
    return Promise.resolve('Person Info is fetching already.')
  }
}

export const fetchUserProfile = () => (dispatch, getState): void => {

  let state = getState()
  let authState: TAuthState = state.auth

  if (!authState.userProfile.status.isFetching) {
    dispatch(authActions.auth.userProfile.fetchRequest())
    axios
      .create({ baseURL: PROFILE_BACKEND_REST_URL })
      .post(
        GET_SIGNATURE_REST,
        { 'purpose': 'exchange' },
        {
          headers: {
            Authorization: `Bearer ${authorization}`
          }
        }
      )
      .then(res => res.data)
      .then((profile) => {
        dispatch(authActions.auth.userProfile.fetchSuccess(profile))
      })
      .catch((error) => {
        dispatch(authActions.auth.userProfile.fetchFail(error))
      })

  }

}
