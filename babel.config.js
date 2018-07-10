module.exports = {
  'presets': [
    '@babel/env',
    '@babel/react',
    '@babel/flow'
  ],
  'sourceMaps': true,
  'plugins': [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-syntax-export-default-from',
    '@babel/plugin-syntax-export-namespace-from',
    '@babel/plugin-transform-exponentiation-operator',
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-transform-new-target',
    '@babel/plugin-transform-react-jsx-source',
    '@babel/plugin-transform-runtime',
    'functional-hmr',
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
