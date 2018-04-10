/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
// import { change } from 'redux-form/immutable'
import contractsManagerDAO from 'dao/ContractsManagerDAO'
import type AbstractFetchingModel from 'models/AbstractFetchingModel'
import type CBEModel from 'models/CBEModel'
import type CBENoticeModel from 'models/notices/CBENoticeModel'
import { notify } from 'redux/notifier/actions'

export const CBE_LIST = 'settings/CBE_LIST'
export const CBE_FORM = 'settings/CBE_FORM'
export const CBE_SET = 'settings/CBE_SET'
export const CBE_LOADING = 'settings/CBE_LOADING'
export const CBE_REMOVE = 'settings/CBE_REMOVE'

export const setCBE = (cbe: CBEModel) => ({ type: CBE_SET, cbe })
export const removeCBE = (cbe: CBEModel) => ({ type: CBE_REMOVE, cbe })

export const listCBE = () => async (dispatch) => {
  const dao = await contractsManagerDAO.getUserManagerDAO()
  const list = await dao.getCBEList()
  dispatch({ type: CBE_LIST, list })
}

export const formCBELoadName = (account, formName) => async (dispatch) => {
  dispatch({ type: CBE_LOADING, isLoading: true })
  const dao = await contractsManagerDAO.getUserManagerDAO()
  const profile = await dao.getMemberProfile(account)
  dispatch({ type: CBE_LOADING, isLoading: false })
  // dispatch(change(formName, 'name', profile.name()))
}

export const addCBE = (cbe: CBEModel | AbstractFetchingModel) => async (dispatch) => {
  dispatch(setCBE(cbe.isFetching(true)))
  const dao = await contractsManagerDAO.getUserManagerDAO()
  try {
    await dao.addCBE(cbe)
  } catch (e) {
    dispatch(removeCBE(cbe))
  }
}

export const revokeCBE = (cbe: CBEModel | AbstractFetchingModel) => async (dispatch) => {
  dispatch(setCBE(cbe.isFetching(true)))
  const dao = await contractsManagerDAO.getUserManagerDAO()
  try {
    await dao.revokeCBE(cbe)
  } catch (e) {
    dispatch(setCBE(cbe))
  }
}

export const watchCBE = (notice: CBENoticeModel) => (dispatch) => {
  dispatch(notify(notice))
  dispatch(notice.isRevoked() ? removeCBE(notice.cbe()) : setCBE(notice.cbe()))
}

export const watchInitCBE = () => async (dispatch) => {
  const dao = await contractsManagerDAO.getUserManagerDAO()
  return dao.watchCBE((notice) => dispatch(watchCBE(notice)))
}
