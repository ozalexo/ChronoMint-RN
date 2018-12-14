/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import SockJS from 'sockjs-client'
import webstomp from 'webstomp-client'

class RmqManager {
  constructor () {
    this.ws = null
    this.client = null
    this.subscriptions = []
    this.resolved = false
  }

  connect (baseUrl, user, password, handlers) {
    this.disconnect()
    return new Promise((resolve, reject) => {
      try {
        this.ws =  new SockJS(baseUrl)
      } catch (error) {
        return reject(error.message)
      }

      this.client = webstomp.over(this.ws, {
        heartbeat: false,
        debug: false,
      })

      this.client.connect(
        user,
        password,
        () => {
          handlers.onConnect()
          this.resolved = true
          this.resubscribeAll()
            .then(() => {
              return resolve()
            })
        },
        (error) => {
          if (!this.resolved) {
            return reject(error.message)
          } else {
            this.connect(baseUrl, user, password, handlers)
          }
        },
      )
    })
  }

  disconnect () {
    return new Promise((resolve, reject) => {
      try {
        this.unsubscribeAll()
          .then(() => {
            if (this.client && this.client.close) {
              this.client.close()
              this.client = null
            }
            this.webstomp && this.webstomp.disconnect && this.webstomp.disconnect(() => {
              this.webstomp = null
              return resolve()
            })
          })
      } catch (error) {
        return reject(error)
      }
    })
  }

  subscribe (channel, handler) {
    return new Promise((resolve, reject) => {
      if (!this.client) {
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
