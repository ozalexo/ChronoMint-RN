/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import webstomp from 'webstomp-client'

class RmqManager {
  constructor () {
    this.ws = null
    this.client = null
    this.subscriptions = []
    this.resolved = false
  }

  connect (baseUrl, user, password, handlers) {
    this.client && this.ws && this.disconnect()
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(baseUrl)
      } catch (error) {
        return reject(error.message)
      }

      this.client = webstomp.over(this.ws, {
        heartbeat: false,
        debug: false,
        binary: true,
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
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.warn(error)
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
            if (this.ws && this.ws.close) {
              this.ws.close()
              this.ws = null
            }
            this.client && this.client.disconnect && this.client.disconnect(() => {
              this.client = null
              return resolve()
            })
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.warn(error)
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
    const subscriptionsList = Object.assign({}, this.subscriptions)
    for (const subscription of Object.entries(subscriptionsList)) {
      await this.unsubscribe(subscription)
    }
    return Promise.resolve()
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
