/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import RmqManager from './RmqManager'
import { getSubscriptions } from './selectors'
import {
  BASE_URL,
  PASSWORD,
  USER,
  RMQ_CONNECT,
  RMQ_DISCONNECT,
} from './constants'
import * as mwRmqActions from './actions'
import * as rmqActions from '../../redux/actions'

const createRmqMiddleware = () => {

  const connect = async (store, action, next) => {
    const onConnect = () => {
      const state = store.getState()
      const rmqSubscriptions = getSubscriptions(state)
      // We need to resubscribe to all existing subscriptions in case of reconnect
      if (rmqSubscriptions && Object.keys(rmqSubscriptions).length > 0) {
        RmqManager.resubscribeAll().then(() => {
          store.dispatch(mwRmqActions.mwRmqResubscribed())
        })
      }
    }

    const onStompError = (frame) => {
      // Will be invoked in case of error encountered at Broker
      // Bad login/passcode typically will cause an error
      // Complaint brokers will set `message` header with a brief message. Body may contain details.
      // Compliant brokers will terminate the connection after any error
      /* eslint-disable no-console */
      console.log('Broker reported error: ' + frame.headers['message'])
      console.log('Additional details: ' + frame.body)
      /* eslint-enable no-console */
    }

    const onWebSocketClose = (closeEvent) => {
      // See WebSocketEvent codes here:
      // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
      // console.log(Object.getOwnPropertySymbols(closeEvent))
      console.log(closeEvent.code, closeEvent.reason)
      store.dispatch(mwRmqActions.mwRmqDisconnect({
        code: closeEvent.code,
        reason: closeEvent.reason,
      }))
    }

    const handlers = {
      onConnect,
      onStompError,
      onWebSocketClose,
      // We do not need it (yet?). Let's keep it commented here.
      // onDisconnect: (r) => {
      //   console.log('\n\n\n\n>>>>>>>>>>> RMQ M: onDisconnect r:', r)
      // },
    }

    return RmqManager.connect(BASE_URL, USER, PASSWORD, handlers)
      .then(() => {
        next(mwRmqActions.mwRmqConnect({
          isConnected: true,
          error: null,
        }))
        // next(action)
        return Promise.resolve()
      })
      .catch((error) => {
        next(mwRmqActions.mwRmqConnect({
          isConnected: false,
          error: error,
        }))
        // next(action)
        return Promise.reject(error)
      })
  }

  // const subscribe = (store, action, next) => {
  //   return RmqManager.subscribe(action.channel, action.handler)
  //     .then((result) => {
  //       next(action)
  //       return Promise.resolve(result)
  //     })
  //     .catch((error) => {
  //       return Promise.reject(error)
  //     })
  // }

  // const unsubscribe = (store, action, next) => {
  //   return RmqManager.unsubscribe(action.channel)
  //     .then((result) => {
  //       next({
  //         ...action,
  //         channel: action.channel,
  //       })
  //       return Promise.resolve(result)
  //     })
  //     .catch((error) => {
  //       next({
  //         ...action,
  //         channel: action.channel,
  //         error: action.error,
  //       })
  //       return Promise.reject(error)
  //     })
  // }

  const disconnect = (store, action, next) => {
    return RmqManager.disconnect()
      .then((result) => {
        next(rmqActions.rmqDisconnect())
        return Promise.resolve(result)
      })
      .catch((error) => {
        next(rmqActions.rmqDisconnect()) // will mark as disconnected in any way.
        return Promise.reject(error) // TODO: maybe better to resolve here too
      })
  }
  
  const mutations = {
  
    [RMQ_CONNECT]: connect,
    [RMQ_DISCONNECT]: disconnect,
    // [RMQ_SUBSCRIBE]: subscribe,
    // [RMQ_UNSUBSCRIBE]: unsubscribe,
  }

  return (store) => (next) => (action) => {
    const { type } = action
    return (type in mutations)
      ? mutations[type](store, action, next)
      : next(action)
  }

}

export default createRmqMiddleware
