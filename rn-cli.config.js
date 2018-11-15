/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

const path = require('path')

const extraCustomNodeModules = {
  // '_stream_transform': require.resolve('readable-stream/transform'),
  'crypto': require.resolve('react-native-crypto'),
  // 'fs': require.resolve('react-native-level-fs'),
  // 'http': require.resolve('react-native-http'),
  // 'https': require.resolve('https-browserify'),
  // 'net': require.resolve('react-native-tcp'),
  // 'os': require.resolve('react-native-os'),
  // 'path': require.resolve('path-browserify'),
  'stream': require.resolve('stream-browserify'),
  // 'tls': require.resolve('./'),
  // 'transform-es3-member-expression-literals': require.resolve('babel-plugin-transform-es3-member-expression-literals'),
  // 'transform-es3-property-literals': require.resolve('babel-plugin-transform-es3-property-literals'),
  'vm': require.resolve('vm-browserify'),
  // 'zlib': require.resolve('browserify-zlib'),
  // 'uuid/v1': require.resolve('react-native-uuid'),
}

// As the metro bundler does not support linking correctly, we add additional
// search path queries to all modules.
const extraNodeModulesGetter = {
  get: (target, name) => {
    if (extraCustomNodeModules.hasOwnProperty(name)) {
      return extraCustomNodeModules[name]
    } else {
      return path.join(process.cwd(), `node_modules/${name}`)
    }
  },
}

// Get blacklist factory
let blacklist
try {
  // >= 0.57
  blacklist = require('metro-config/src/defaults/blacklist')
} catch (e) {
  // <= 0.56
  blacklist = require('metro/src/blacklist')
}

module.exports = {
  resolver: {
    extraNodeModules: new Proxy({}, extraNodeModulesGetter),
  },
  getBlacklistRE () {
    // Add whatever you need to the blacklist for your project
    return blacklist([
      /node_modules\/crypto\/.*/,
      /node_modules\/stream\/.*/,
    ])
  },
  getProjectRoots () {
    return [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'packages/bitcoin/node_modules'),
      __dirname,
    ]
  },
}
