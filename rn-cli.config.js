const path = require('path')
const fs = require('fs')

const extraCustomNodeModules = {
  "crypto": require.resolve('react-native-crypto'),
  "stream": require.resolve('stream-browserify'),
  "tls": require.resolve('./'),
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

module.exports = {
  extraNodeModules: new Proxy({}, extraNodeModulesGetter),
  getProjectRoots () {
    return [
      __dirname,
      path.resolve(fs.realpathSync('node_modules/@chronobank/bitcoin'))
    ]
  },
  getSourceExts: () => [ 'jsx' ],
}
