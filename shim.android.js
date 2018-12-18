/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

// [AO] These imports breaking Android. See https://github.com/facebook/react-native/issues/15902#issuecomment-375352955
// import 'core-js/es6/symbol'
// import 'core-js/fn/symbol/iterator'

import '@babel/polyfill'

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
// if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer

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

// if (!Uint8Array.prototype.fill) {
//   Uint8Array.prototype.fill = function (value) {

//     // Steps 1-2.
//     if (this == null) {
//       throw new TypeError('this is null or not defined')
//     }

//     var O = Object(this)

//     // Steps 3-5.
//     var len = O.length >>> 0

//     // Steps 6-7.
//     var start = arguments[1]
//     var relativeStart = start >> 0

//     // Step 8.
//     var k = relativeStart < 0 ?
//       Math.max(len + relativeStart, 0) :
//       Math.min(relativeStart, len)

//     // Steps 9-10.
//     var end = arguments[2]
//     var relativeEnd = end === undefined ?
//       len : end >> 0

//     // Step 11.
//     var final = relativeEnd < 0 ?
//       Math.max(len + relativeEnd, 0) :
//       Math.min(relativeEnd, len)

//     // Step 12.
//     while (k < final) {
//       O[k] = value
//       k++
//     }

//     // Step 13.
//     return O
//   }
// }

// Got it from https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder#Polyfill
if (typeof TextEncoder === "undefined") {
  // eslint-disable-next-line no-global-assign
  TextEncoder = function TextEncoder () {}
  TextEncoder.prototype.encode = function encode (str) {
    "use strict"
    var Len = str.length,
      resPos = -1
    // The Uint8Array's length must be at least 3x the length of the string because an invalid UTF-16
    //  takes up the equivelent space of 3 UTF-8 characters to encode it properly. However, Array's
    //  have an auto expanding length and 1.5x should be just the right balance for most uses.
    var resArr =
      typeof Uint8Array === "undefined"
        ? new Array(Len * 1.5)
        : new Uint8Array(Len * 3)
    for (var point = 0, nextcode = 0, i = 0; i !== Len; ) {
      (point = str.charCodeAt(i)), (i += 1)
      if (point >= 0xd800 && point <= 0xdbff) {
        if (i === Len) {
          resArr[(resPos += 1)] = 0xef /*0b11101111*/
          resArr[(resPos += 1)] = 0xbf /*0b10111111*/
          resArr[(resPos += 1)] = 0xbd /*0b10111101*/
          break
        }
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        nextcode = str.charCodeAt(i)
        if (nextcode >= 0xdc00 && nextcode <= 0xdfff) {
          point = (point - 0xd800) * 0x400 + nextcode - 0xdc00 + 0x10000
          i += 1
          if (point > 0xffff) {
            resArr[(resPos += 1)] = (0x1e /*0b11110*/ << 3) | (point >>> 18)
            resArr[(resPos += 1)] =
              (0x2 /*0b10*/ << 6) | ((point >>> 12) & 0x3f) /*0b00111111*/
            resArr[(resPos += 1)] =
              (0x2 /*0b10*/ << 6) | ((point >>> 6) & 0x3f) /*0b00111111*/
            resArr[(resPos += 1)] =
              (0x2 /*0b10*/ << 6) | (point & 0x3f) /*0b00111111*/
            continue
          }
        } else {
          resArr[(resPos += 1)] = 0xef /*0b11101111*/
          resArr[(resPos += 1)] = 0xbf /*0b10111111*/
          resArr[(resPos += 1)] = 0xbd /*0b10111101*/
          continue
        }
      }
      if (point <= 0x007f) {
        resArr[(resPos += 1)] = (0x0 /*0b0*/ << 7) | point
      } else if (point <= 0x07ff) {
        resArr[(resPos += 1)] = (0x6 /*0b110*/ << 5) | (point >>> 6)
        resArr[(resPos += 1)] =
          (0x2 /*0b10*/ << 6) | (point & 0x3f) /*0b00111111*/
      } else {
        resArr[(resPos += 1)] = (0xe /*0b1110*/ << 4) | (point >>> 12)
        resArr[(resPos += 1)] =
          (0x2 /*0b10*/ << 6) | ((point >>> 6) & 0x3f) /*0b00111111*/
        resArr[(resPos += 1)] =
          (0x2 /*0b10*/ << 6) | (point & 0x3f) /*0b00111111*/
      }
    }
    if (typeof Uint8Array !== "undefined")
      return resArr.subarray(0, resPos + 1)
    // else // IE 6-9
    resArr.length = resPos + 1 // trim off extra weight
    return resArr
  }
  TextEncoder.prototype.toString = function () {
    return "[object TextEncoder]"
  }
  try {
    // Object.defineProperty only works on DOM prototypes in IE8
    Object.defineProperty(TextEncoder.prototype, "encoding", {
      get: function () {
        if (TextEncoder.prototype.isPrototypeOf(this)) return "utf-8"
        else throw TypeError("Illegal invocation")
      },
    })
  } catch (e) {
    /*IE6-8 fallback*/ TextEncoder.prototype.encoding = "utf-8"
  }
  if (typeof Symbol !== "undefined")
    TextEncoder.prototype[Symbol.toStringTag] = "TextEncoder"
}
