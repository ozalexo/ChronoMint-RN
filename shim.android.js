/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// [AO] These imports breaking Android. See https://github.com/facebook/react-native/issues/15902#issuecomment-375352955
// import 'core-js/es6/symbol'
// import 'core-js/fn/symbol/iterator'

// For the package bitcore-mnemonic-react-native
// See https://github.com/WoeOm/bitcore-mnemonic-react-native#readme
import { asyncRandomBytes } from 'react-native-secure-randombytes'
window.randomBytes = asyncRandomBytes

// Needed so that 'stream-http' chooses the right default protocol.
global.location = {
  protocol: 'file:',
}

/* eslint-disable no-underscore-dangle */
if (typeof __dirname === 'undefined') global.__dirname = '/'
if (typeof __filename === 'undefined') global.__filename = ''
/* eslint-enable no-underscore-dangle */

/* eslint-disable global-require */
if (typeof process === 'undefined') {
  global.process = require('process')
} else {
  const bProcess = require('process')
  for (const p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p]
    }
  }
}
/* eslint-enable global-require */

process.browser = false
// eslint-disable-next-line global-require
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer

// Web3 installation with CRNA: see https://gist.github.com/dougbacelar/29e60920d8fa1982535247563eb63766
if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str, 'binary').toString('base64')
  }
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary')
  }
}

// Polyfill for the Error.captureStackTrace (this is NodeJS core's method)
if (typeof Error.captureStackTrace === 'undefined') {
  // eslint-disable-next-line global-require
  global.Error.captureStackTrace = require('capture-stack-trace')
}

// eslint-disable-next-line no-undef
const isDev = typeof __DEV__ === 'boolean' && __DEV__
const strIsDev = isDev ? 'development' : 'production'
Object.assign(process.env, { NODE_ENV: strIsDev })

if (typeof localStorage !== 'undefined') {
  localStorage.debug = isDev ? '*' : ''
}

// If using the crypto shim, uncomment the following line to ensure
// crypto is loaded first, so it can populate global.crypto
require('crypto')

/* eslint-disable no-underscore-dangle, no-inner-declarations, no-param-reassign */
if (
  typeof Object.setPrototypeOf === 'undefined' &&
  typeof Object.getOwnPropertyNames === 'function'
) {
  var _exclude = ['length', 'name', 'arguments', 'caller', 'prototype']

  function bindFunction (ctx, fn) {
    return function () {
      return fn.apply(this, arguments)
    }
  }

  function bindProperty (ctx, prop, parentDescriptor) {
    if (!parentDescriptor) {
      var defaultValue = ctx.__proto__[prop]
      parentDescriptor = {
        get: function () {
          return ctx['__' + prop] || defaultValue
        },
        set: function (val) {
          ctx['__' + prop] = val
        },
      }
    }
    Object.defineProperty(ctx, prop, {
      get: parentDescriptor.get ? parentDescriptor.get.bind(ctx) : undefined,
      set: parentDescriptor.set ? parentDescriptor.set.bind(ctx) : undefined,
      configurable: true,
    })
  }

  function iterateProps (subClass, superClass) {
    var props = Object.getOwnPropertyNames(superClass),
      proto

    subClass.__proto__ = superClass
    for (var i = 0, len = props.length; i < len; i++) {
      var prop = props[i]
      if (prop === '__proto__') {
        proto = superClass[prop]
      } else if (_exclude.indexOf(i) === -1) {
        var descriptor = Object.getOwnPropertyDescriptor(subClass, prop)
        if (!descriptor) {
          var superDescriptor = Object.getOwnPropertyDescriptor(superClass, prop)
          if (typeof superDescriptor.get !== 'function' && typeof superClass[prop] === 'function') {
            subClass[prop] = bindFunction(subClass, superClass[prop])
          } else if (typeof superDescriptor.get == 'function') {
            bindProperty(subClass, prop, superDescriptor)
          } else {
            bindProperty(subClass, prop)
          }
        }
      }
    }

    if (proto) {
      iterateProps(subClass, proto)
    }
  }

  Object.setPrototypeOf = iterateProps
}
/* eslint-enable no-underscore-dangle, no-inner-declarations, no-param-reassign */

if (!Uint8Array.prototype.fill) {
  Uint8Array.prototype.fill = function (value) {

    // Steps 1-2.
    if (this == null) {
      throw new TypeError('this is null or not defined')
    }

    var O = Object(this)

    // Steps 3-5.
    var len = O.length >>> 0

    // Steps 6-7.
    var start = arguments[1]
    var relativeStart = start >> 0

    // Step 8.
    var k = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) :
      Math.min(relativeStart, len)

    // Steps 9-10.
    var end = arguments[2]
    var relativeEnd = end === undefined ?
      len : end >> 0

    // Step 11.
    var final = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) :
      Math.min(relativeEnd, len)

    // Step 12.
    while (k < final) {
      O[k] = value
      k++
    }

    // Step 13.
    return O
  }
}