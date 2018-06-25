const extraNodeModules = {
  _stream_transform: require.resolve('readable-stream/transform'),
  child_process: require.resolve('./'),
  crypto: require.resolve('react-native-crypto'),
  fs: require.resolve('react-native-level-fs'),
  http: require.resolve('react-native-http'),
  https: require.resolve('https-browserify'),
  net: require.resolve('react-native-tcp'),
  os: require.resolve('react-native-os'),
  path: require.resolve('path-browserify'),
  stream: require.resolve('stream-browserify'),
  tls: require.resolve('./'),
  vm: require.resolve('vm-browserify'),
  zlib: require.resolve('browserify-zlib'),
}

module.exports = {
  extraNodeModules,
  getProjectRoots () {
    return [
      __dirname,
    ]
  },
  getSourceExts: () => [ 'jsx' ],
}
