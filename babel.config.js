module.exports = function (api) {
  api.cache(true)
  const presets = [
    'module:metro-react-native-babel-preset',
  ]
  const plugins = [
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-class-properties',
    ['babel-plugin-transform-builtin-extend', {
      globals: ['Error'], // ["Error", "Array"]
    }],
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-nullish-coalescing-operator',
    '@babel/plugin-transform-exponentiation-operator',
  ]

  return {
    presets,
    plugins,
    sourceMaps: true,
  }
}
