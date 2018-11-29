/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import SockJS from 'sockjs-client'
import {Stomp} from '@stomp/stompjs'
console.log('\n\n\n\n\nSTOMP:', Stomp)

class RmqManager {
  constructor () {
    this.subscriptions = []
    this.ws = null
    this.client = null
    this.eventHandlers = {}
  }

  connect (baseUrl, user, password) {
    if (this.ws && this.client) {
      console.log('RMQ already connected')
      return Promise.resolve()
    }
    console.log('>>>>>>>>>>> RMQ M: connecting')
    return new Promise((resolve, reject) => {
      try {
        this.ws = this.ws || new SockJS(baseUrl)
        this.client = Stomp.over(this.ws, {
          heartbeat: false,
          debug: false,
        })
        console.log('>>>>>>>>>>> RMQ M: this.ws', this.ws)
        this.client.connect(
          user,
          password,
          () => {
            console.log('RMQ connected')
            return resolve()
          },
          (error) => {
            console.log('RMQ connection error:', error)
            return reject(error)
          },
        )
        console.log('>>>>>>>>>>> RMQ M: this.client', this.client)
      } catch (error) {
        reject(error)
      }
    })
  }
  
  // TODO: [AO] not sure that async..await required here
  async disconnect () {
    for (const channel of this.subscriptions) {
      await this.unsubscribe(channel)
    }
    this.ws.close()
    return Promise.resolve()
  }

  subscribe (channel, handler) {
    return new Promise((resolve, reject) => {
      if (!this.ws || !this.client) {
        return reject('Error: no connection to RabbitMQ host')
      }
      try {
        this.client.subscribe(channel, handler)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  // We may get all channels from Redux Store and subscribe to all og them
  subscribeAll () {
    // TODO
  }

  unsubscribe (channel) {
    // TODO
  }
}

export default new RmqManager()
