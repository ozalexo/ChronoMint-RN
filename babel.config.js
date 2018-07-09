module.exports = {
  'presets': [
    '@babel/env',
    '@babel/preset-react',
    '@babel/flow'
  ],
  'sourceMaps': true,
  'plugins': [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-exponentiation-operator',
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-transform-new-target',
    '@babel/plugin-transform-react-jsx-source',
    'functional-hmr',
    [
      '@babel/plugin-transform-runtime',
      {
        'polyfill': false,
        'regenerator': true,
      }
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        'legacy': true
      }
    ],
    [
      'babel-plugin-transform-builtin-extend',
      {
        'globals': [
          'Error',
          'Array'
        ]
      }
    ],
    [
      'transform-inline-environment-variables',
      {
        'include': [
          'NODE_ENV',
          'REDUX_LOGGER'
        ]
      }
    ]
  ]
}
