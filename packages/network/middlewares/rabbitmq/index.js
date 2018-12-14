/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import RmqManager from './RmqManager'
// import { getRmqSubscriptions } from './selectors'
import {
  BASE_URL,
  MW_RMQ_CONNECT,
  MW_RMQ_DISCONNECT,
  MW_RMQ_SUBSCRIBE,
  MW_RMQ_UNSUBSCRIBE,
  PASSWORD,
  USER,
} from './constants'
import * as Actions from './actions'

const createRmqMiddleware = () => {

  const connect = async (store, action, next) => {
    const onConnect = () => {
      // const state = store.getState()
      // const rmqSubscriptions = getRmqSubscriptions(state)
      // // We need to resubscribe to all existing subscriptions in case of reconnect
      // if (rmqSubscriptions && Object.keys(rmqSubscriptions).length > 0) {
      //   RmqManager.resubscribeAll().then(() => {
      //     store.dispatch(mwRmqActions.mwRmqResubscribed())
      //   })
      // }
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
      if (this.client && this.client.active) {
        store.dispatch(Actions.rmqConnectFailure({
          error: {
            code: closeEvent.code,
            reason: closeEvent.reason,
          },
        }))
      }
    }

    const handlers = {
      onConnect,
      onStompError,
      onWebSocketClose,
    }
    return RmqManager.connect(BASE_URL, USER, PASSWORD, handlers)
      .then(() => {
        next(Actions.rmqConnectSuccess())
        return Promise.resolve()
      })
      .catch((error) => {
        next(Actions.rmqConnectFailure({ error }))
        return Promise.reject(error)
      })
  }

  const subscribe = (store, action, next) => {
    return RmqManager.subscribe(action.channel, action.handler)
      .then((result) => {
        next(Actions.rmqSubscribeSuccess({ channel: action.channel }))
        return Promise.resolve(result)
      })
      .catch((error) => {
        next(Actions.rmqSubscribeFailure({
          channel: action.channel,
          error,
        }))
        return Promise.reject(error)
      })
  }

  const unsubscribe = (store, action, next) => {
    return RmqManager.unsubscribe(action.channel)
      .then((result) => {
        next(Actions.rmqUnsubscribeSuccess({ channel: action.channel }))
        return Promise.resolve(result)
      })
      .catch((error) => {
        next(Actions.rmqUnsubscribeFailure({
          channel: action.channel,
          error,
        }))
        return Promise.reject(error)
      })
  }

  const disconnect = (store, action, next) => {
    return RmqManager.disconnect()
      .then((result) => {
        next(Actions.rmqDisconnectSuccess())
        return Promise.resolve(result)
      })
      .catch((error) => {
        next(Actions.rmqDisconnectFailure({ error }))
        return Promise.reject(error)
      })
  }
  
  const mutations = {
  
    [MW_RMQ_CONNECT]: connect,
    [MW_RMQ_DISCONNECT]: disconnect,
    [MW_RMQ_SUBSCRIBE]: subscribe,
    [MW_RMQ_UNSUBSCRIBE]: unsubscribe,
  }

  return (store) => (next) => (action) => {
    const { type } = action
    return (type in mutations)
      ? mutations[type](store, action, next)
      : next(action)
  }

}

export default createRmqMiddleware
