/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { Client } from '@stomp/stompjs'

class RmqManager {
  constructor () {
    this.client = null
    this.subscriptions = []
  }

  connect (baseUrl, user, password, handlers) {
    /* See
     * https://stomp-js.github.io/api-docs/latest/classes/Client.html#active
     * https://stomp-js.github.io/api-docs/latest/classes/Client.html#connected
     */
    if (this.client && this.client.active) {
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      const stompConfig = {
        brokerURL: baseUrl,
        connectHeaders: {
          login: user,
          passcode: password,
        },
        // Incoming HeartBeats must be disabled, unsupported on server
        heartbeatIncoming: 0,
        /* Outgoing HeartBeats must be enabled,
         * otherwise WebSocket will be closed with code 1001 "Going Away"
         * Default reconnect delay is 5000 (5 seconds),
         * that is why heartbeatOutgoing equal to 4000 (4 seconds)
         * But you may configure it right here, e.g. "reconnectDelay: 10000"
         */
        heartbeatOutgoing: 4000,
        ...handlers,
        // onConnect handler overriden, because we need to return Promise here
        onConnect: () => {
          handlers.onConnect()
          return resolve()
        },
      }
  
      // eslint-disable-next-line no-undef
      if (__DEV__) {
        stompConfig.debug = (str) => {
          // eslint-disable-next-line no-console
          console.log('STOMP DEBUG:', str)
        }
      }

      try {
        this.client = new Client()
        this.client.configure(stompConfig)
        this.client.activate()
        return resolve()
      } catch (error) {
        return reject(error)
      }
    })
  }

  disconnect () {
    try {
      this.unsubscribeAll()
      if (this.client) {
        this.client.deactivate()
        this.client = null
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  subscribe (channel, handler) {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        return reject('RmqManager subscribe error: no connection to RabbitMQ host')
      }
      if (this.client && !this.client.connected) {
        return reject('RmqManager subscribe error: no connection to RabbitMQ host')
      }
      try {
        const subscription = this.client.subscribe(channel, handler)
        this.subscriptions[channel] = subscription
        return resolve()
      } catch (error) {
        return reject(error)
      }
    })
  }

  unsubscribe (channel) {
    return new Promise((resolve, reject) => {
      try {
        const subscription = this.subscriptions[channel]
        subscription && subscription.unsubscribe()
        delete this.subscriptions[channel]
        return resolve()
      } catch (error) {
        return reject(error)
      }
    })
  }

  async unsubscribeAll () {
    for (const subscription of this.subscriptions) {
      await subscription.unsubscribe()
    }
  }

  async resubscribeAll () {
    const subscriptionsList = Object.assign({}, this.subscriptions)
    this.subscriptions = {}
    for (const subscription of Object.entries(subscriptionsList)) {
      await this.subscribe(subscription[0], subscription[1])
    }
    return Promise.resolve()
  }

}

export default new RmqManager()
