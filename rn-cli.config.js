const path = require('path')
const fs = require('fs')

const extraCustomNodeModules = {
  "_stream_transform": require.resolve('readable-stream/transform'),
  "crypto": require.resolve('react-native-crypto'),
  "fs": require.resolve('react-native-level-fs'),
  "http": require.resolve('react-native-http'),
  "https": require.resolve('https-browserify'),
  "net": require.resolve('react-native-tcp'),
  "os": require.resolve('react-native-os'),
  "path": require.resolve('path-browserify'),
  "stream": require.resolve('stream-browserify'),
  "tls": require.resolve('./'),
  "transform-es3-member-expression-literals": require.resolve('babel-plugin-transform-es3-member-expression-literals'),
  "transform-es3-property-literals": require.resolve('babel-plugin-transform-es3-property-literals'),
  "vm": require.resolve('vm-browserify'),
  "zlib": require.resolve('browserify-zlib'),
  "uuid/v1": require.resolve('react-native-uuid')
}

// As the metro bundler does not support linking correctly, we add additional
// search path queries to all modules.
const extraNodeModulesGetter = {
  get: (target, name) => {
    if (extraCustomNodeModules.hasOwnProperty(name)) {
      return extraCustomNodeModules[name];
    } else {
      // if (name.includes('core')) {
      //   console.log('rn cli %s to %s', name, path.join(process.cwd(), `node_modules/${name}`))
      // }
      return path.join(process.cwd(), `node_modules/${name}`);
    }
  },
};

// Get blacklist factory
try {
  blacklist = require('metro-bundler/src/blacklist');
} catch (e) {
  blacklist = require('metro/src/blacklist');
}

module.exports = {
  extraNodeModules: new Proxy({}, extraNodeModulesGetter),
  getBlacklistRE: function () {
    //Add whatever you need to the blacklist for your project
    return blacklist([
      /node_modules\/crypto\/.*/
    ])
  },
  getProjectRoots () {
    return [
      __dirname,
      path.resolve(fs.realpathSync('node_modules/@chronobank/core')),
      path.resolve(fs.realpathSync('node_modules/@chronobank/login'))
    ]
  },
  getSourceExts: () => [ 'jsx' ],
}

