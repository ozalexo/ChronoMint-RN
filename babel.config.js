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

// Old config kept to have a list of plugins and settings for possible further

// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   env: {
//     test: {
//       presets: [['@babel/env', { modules: false }], '@babel/preset-react'],
//       plugins: [
//         '@babel/plugin-syntax-dynamic-import',
//         '@babel/plugin-transform-modules-commonjs'
//       ]
//     }
//   },
//   sourceMaps: true,
//   plugins: [
//     '@babel/plugin-proposal-optional-chaining',
//     '@babel/plugin-syntax-nullish-coalescing-operator',
//     '@babel/plugin-transform-flow-strip-types',
//     [
//       '@babel/plugin-transform-runtime',
//       {
//         helpers: false,
//         regenerator: true
//       }
//     ],
//     ['@babel/plugin-proposal-decorators', { legacy: true }],
//     ['@babel/plugin-proposal-class-properties', { loose: false }],
//     'functional-hmr',
//     '@babel/plugin-transform-new-target',
//     '@babel/plugin-transform-exponentiation-operator'
//   ]
// };
