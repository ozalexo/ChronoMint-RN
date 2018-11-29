/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import RmqManager from './RmqManager'
import { NETWORK_SELECT } from '../../redux/constants'
import {
  BASE_URL,
  PASSWORD,
  RMQ_SUBSCRIBE,
  RMQ_UNSUBSCRIBE,
  USER,
} from './constants'

const createRmqMiddleware = () => {

  const connect = async (store, action, next) => {
    console.log('>>>>>>>>>>> RMQ MW: connect')
    return RmqManager.connect(BASE_URL, USER, PASSWORD)
      .then(() => {
        next(action)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }

  const subscribe = (channel, handler) => {
    return RmqManager.subscribe(channel, handler)
      .then((result) => {
        return Promise.resolve(result)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }

  const unsubscribe = (channel) => {
    return RmqManager.unsubscribe(channel)
      .then((result) => {
        return Promise.resolve(result)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
  
  const mutations = {
  
    [NETWORK_SELECT]: connect,
    [RMQ_SUBSCRIBE]: subscribe,
    [RMQ_UNSUBSCRIBE]: unsubscribe,
  
  }

  return (store) => (next) => (action) => {
    const { type } = action
    return (type in mutations)
      ? mutations[type](store, action, next)
      : next(action)
  }

}

export default createRmqMiddleware
