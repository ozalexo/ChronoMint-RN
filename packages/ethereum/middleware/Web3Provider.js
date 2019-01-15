/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { errors } from 'web3-core-helpers'
import { parseResponse } from './utils'

const W3PErrorCodes = {
  'W3PE001': 'W3PE001: ',
  'W3PE002': '',
  'W3PE003': '',
  'W3PE004': '',
}

export default class Web3Provider {
  constructor (url) {
    this.connection = null
    this.url = url
    this.responseCallbacks = {}
    this.notificationCallbacks = []
    this.pingInterval = null
    this.WStimeout = null
  }

  connect = (timeoutMs = 1500, numberOfRetries = 10) => {
    // console.log('W3P connect: 1st line')
    this.connection = null
    let hasReturned = false

    const promise = new Promise((resolve, reject) => {
      // console.log('W3P connect: promise inside')
      const rejectInternal = (/*reason*/) => {
        // console.log('W3P connect: rejectInternal', reason)
        if (numberOfRetries <= 0) {
          // return reject(`Can't establish WS connection to ${this.url}`)
        } else {
          if (!hasReturned) {
            hasReturned = true
            // eslint-disable-next-line no-param-reassign
            --numberOfRetries
            // console.log('Connect attempt %s', numberOfRetries)
            this.connect(timeoutMs, numberOfRetries)
              .then(resolve, reject)
          }
        }
      }

      // setTimeout(() => {
      //   if(!hasReturned) {
      //     rejectInternal('ws timeout')
      //   }
      // }, numberOfRetries ? timeoutMs * numberOfRetries : timeoutMs)

      if (!this.connection || (this.connection.readyState !== WebSocket.OPEN && this.connection.readyState !== WebSocket.CONNECTING)) {
        if (this.connection) {
          this.connection.close()
        }
        this.connection = new WebSocket(this.url)
        // console.log('WS Connection created!', this.url)
        // console.log('this.connection', this.connection)
        this.connection.onopen = () => {
          if (hasReturned) {
            this.connection.close()
          } else {
            this.pingInterval = setInterval(this.ping, 10000)
            return resolve(this)
          }
        }
        this.connection.onclose = () => {
          this.pingInterval && clearInterval(this.pingInterval)
          setTimeout(() => { rejectInternal() }, timeoutMs)
        }
        this.connection.onerror = () => {
          setTimeout(() => { rejectInternal() }, timeoutMs)
        }
        this.connection.onmessage = (event) => {
          clearTimeout(this.WStimeout)
          console.log('onmessage event.data', event, event.data)
          const data = typeof event.data === 'string'
            ? event.data
            : ''

          parseResponse(data).forEach(this.envokeCallbacks)
        }
      } else {
        return resolve(this)
      }

    })

    return promise
      .then(() => {
        // console.log('W3P connect: promise then')
        hasReturned = true
      })
      .catch(() => {
        // console.log('W3P connect: promise catch')
        hasReturned = true
      })
  }

  envokeCallbacks = (result) => {
    try {
      console.log('envokeCallbacks', result)
      let id = null
      if (Array.isArray(result)) {
        result.forEach((load) => {
          console.log('envokeCallbacks load', load)
          console.log('envokeCallbacks responseCallbacks', this.responseCallbacks)
          if (this.responseCallbacks[load.id]) {
            id = load.id
          } else {
            id = result.id
          }
        })
      } else {
        console.log('envokeCallbacks else id result', result)
        id = result && result.id
      }

      if (
        !id &&
        result &&
        result.method &&
        result.method.indexOf('_subscription') !== -1
      ) {
        console.log('envokeCallbacks _subscription found', result)
        this.notificationCallbacks.forEach((callback) => {
          if (typeof callback === 'function') {
            callback(result)
          }
        })
      } else {
        console.log('envokeCallbacks _subscription not found, this.responseCallbacks', this.responseCallbacks)
        console.log('envokeCallbacks _subscription not found, result', result)
        if (this.responseCallbacks[id]) {
          try {
            this.responseCallbacks[id](null, result)
          } catch (error) {
            // eslint-disable-next-line
            console.log('Error in callback', error)
          }
          delete this.responseCallbacks[id]
        }
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log('Error in envokeCallbacks', error)
    }
  }

  get connected () {
    return this.connection && this.connection.readyState === WebSocket.OPEN
  }

  timeout = () => {
    for (var key in this.responseCallbacks) {
      if (this.responseCallbacks.hasOwnProperty(key)) {
        this.responseCallbacks[key](errors.InvalidConnection('on WS'))
        delete this.responseCallbacks[key]
      }
    }
  }

  addResponseCallback = (payload, callback) => {
    const id = payload.id || payload[0].id
    const method = payload.method || payload[0].method
    this.responseCallbacks[id] = callback
    this.responseCallbacks[id].method = method
  }

  send = (payload, callback) => {
    if (!this.connection) {
      callback(new Error('300: connection not open'))
      return
    }
    if (this.connection.readyState === WebSocket.CONNECTING) {
      setTimeout(() => {
        this.send(payload, callback)
      }, 10)
      return
    }

    if (this.connection.readyState !== WebSocket.OPEN) {
      if (typeof this.connection.onerror === 'function') {
        this.connection.onerror(new Error('200: connection not open'))
      } else {
        // eslint-disable-next-line no-console
        console.error('no error callback')
      }
      callback(new Error('100: connection not open'))
      return
    }

    this.connection.send(JSON.stringify(payload))
    this.addResponseCallback(payload, callback)
  }

  on = (type, callback) => {
    if (typeof callback !== 'function')
      throw new Error('The second parameter callback must be a function.')

    switch (type) {
    case 'data':
      this.notificationCallbacks.push(callback)
      break

    case 'connect':
      this.connection.onopen = callback
      break

    case 'end':
      this.connection.onclose = (e) => {
        this.pingInterval && clearInterval(this.pingInterval)
        callback(e)
      }
      break

    case 'error':
      this.connection.onerror = callback
      break
    }
    return this
  }

  ping = () => {
    if (!this.connection || this.connection.readyState !== WebSocket.OPEN) {
      return
    }
    this.send({
      id: 10000,
      jsonrpc: "2.0",
      method: "net_version",
      params: [],
    }, () => {})  // send ping to server
    this.WStimeout = setTimeout(() => {  // if it doesn't respond within a second
      if (this.connection && this.connection.readyState === WebSocket.OPEN) {  // and if the connection is still open
        this.connection.onclose(new Error('Ping timed out'))  // close the connection
      }
    }, 4000)
  }

  removeListener = (type, callback) => {
    switch (type) {
    case 'data':
      this.notificationCallbacks.forEach(function (cb, index) {
        if (cb === callback) {
          this.notificationCallbacks.splice(index, 1)
        }
      })
      break
    }
  }

  removeAllListeners = (type) => {
    switch (type) {
    case 'data':
      this.notificationCallbacks = []
      break
    case 'connect':
      if (this.connection) {
        this.connection.onopen = null
      }
      break
    case 'end':
      if (this.connection) {
        this.connection.onclose = null
      }
      break
    case 'error':
      if (this.connection) {
        this.connection.onerror = null
      }
      break
    default:
      break
    }
  }

  disconnect = () => {
    return new Promise((resolve) => {
      this.timeout()
      this.removeAllListeners('data')
      this.removeAllListeners('connect')
      this.removeAllListeners('end')
      this.removeAllListeners('error')
      this.responseCallbacks = {}
      this.notificationCallbacks = []
      if (this.connection) {
        this.connection.close()
        this.connection = null
      }
      return resolve()
    })
  }

}
