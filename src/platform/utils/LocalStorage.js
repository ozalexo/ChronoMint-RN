/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
/* eslint-disable no-underscore-dangle */
import { AsyncStorage } from 'react-native'
import {
  LOCAL_ID,
  LOCAL_PROVIDER_ID
} from '@chronobank/login/network/settings'
import logger from '../../utils/logger'

class Storage {
  /**
   * Fetches key and passes the result to callback, along with an Error if there is any.
   * @param {string} key
   * @param {callback} callback
   */
  getItem = (key, callback) => {
    return AsyncStorage.getItem(key, callback)
  }

  /**
   * Sets value for key and calls callback on completion, along with an Error if there is any.
   * @param {string} key
   * @param {string} value
   * @param {callback} callback
   */
  setItem = (key, value, callback) => {
    return AsyncStorage.setItem(key, value, callback)
  }

  /**
   * @param {string} key
   * @param {Function} callback
   */
  removeItem = (key, callback) => {
    return AsyncStorage.removeItem(key, callback)
  }
}

const storage = new Storage()

const hasLocalStorage = typeof AsyncStorage !== 'undefined'

const TEST_RPC_ACCOUNT = 'testRPCAccount'
const LOCALE = 'locale'
const LAST_URL = 'lastURL'

const ERROR_NO_TOKEN = 'LocalStorage token not found'

// Simulating private properties
let _account, _provider, _network, _token, _localAccount, _locale, _memoryWithToken

/**
 * Get stored property from local storage
 * @param {string} key Stored property key
 */
const _getFromLS = async (key) => {
  try {
    if (hasLocalStorage) {
      const itemJson = await storage.getItem(key)

      return JSON.parse(itemJson)
    }
  } catch (e) {
    logger.warn(`LocalStorage: parse error`, e)
  }
}

/**
 * Set property to local storage
 * @param {string} key
 * @param {Object} data
 */
const _setToLS = (key, data) => {
  if (hasLocalStorage) {
    return storage.setItem(key, JSON.stringify(data))
  }
}

/**
 *
 * @param {string} key
 */
const _removeFromLS = (key) => {
  if (hasLocalStorage) {
    return storage.removeItem(key)
  }
}

/**
 * @param {string} key
 */
const _get = (key) => {
  if (!_token) {
    logger.warn('get', ERROR_NO_TOKEN)

    return
  }

  return _memoryWithToken[key]
}

const _set = (key, value) => {
  if (!_token) {
    logger.warn('set', ERROR_NO_TOKEN)

    return
  }

  _memoryWithToken[key] = value

  _setToLS(_token, _memoryWithToken)
}

class LocalStorage {
  createSession (account, provider, network) {
    if (_token) {
      logger.warn('Session already created', this.token)

      return
    }

    _account = account
    _provider = provider
    _network = network
    _token = `${_account}-${_provider}-${_network}`
    _localAccount = null
    _locale = this.getLocale()
    if (provider === LOCAL_PROVIDER_ID && network === LOCAL_ID) {
      LocalStorage.setLocalAccount(account)
    }
    _memoryWithToken = _getFromLS(_token) || {}
  }

  static isSession () {
    return !!_token
  }

  static getToken () {
    return _token
  }

  static getNetwork () {
    return _network
  }

  static getProvider () {
    return _provider
  }

  static destroySession () {
    _account = null
    _provider = null
    _network = null
    _token = null
    _memoryWithToken = {}
    _localAccount = null

    _removeFromLS(TEST_RPC_ACCOUNT)

    logger.info('LocalStorage: session destroyed')
  }

  static setLocalAccount (account) {
    _localAccount = account

    _setToLS(TEST_RPC_ACCOUNT, account)
  }

  getLocalAccount = () => {
    return _localAccount || _getFromLS(TEST_RPC_ACCOUNT)
  }

  // TODO @dkchv: remove this! Use state.get('session').account instead
  // TODO @bshevchenko: I've removed @deprecated to hide confusing IDE inspections, we should provide complete and...
  // TODO @bshevchenko: ...proper solution for all cases before marking this method as deprecated.
  static getAccount () {
    if (!_token) {
      logger.warn('getAccount', ERROR_NO_TOKEN)

      return
    }

    return _account
  }

  /**
   * Set locale directly
   * @param {string} locale
   */
  static setLocale (locale) {
    _locale = locale
    _setToLS(LOCALE, locale)
  }

  getLocale = async () => {
    return _locale || await _getFromLS(LOCALE) || 'en'
  }

  /**
   * @param {string} url
   */
  static setLastURL (url) {
    return _set(LAST_URL, url)
  }

  static getLastURL () {
    return _get(LAST_URL)
  }
}

export default new LocalStorage()
