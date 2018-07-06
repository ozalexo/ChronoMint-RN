module.exports = {
  "presets": [
    "@babel/env",
    "@babel/preset-react",
    "@babel/flow"
  ],
  "sourceMaps": true,
  "plugins": [
    "@babel/plugin-transform-flow-strip-types",
    ["@babel/plugin-transform-runtime", {
      "polyfill": false,
      "regenerator": true
    }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-proposal-class-properties",
    "functional-hmr",
    "transform-new-target",
    "transform-exponentiation-operator",
    ["babel-plugin-transform-builtin-extend", {
      "globals": ["Error", "Array"]
    }],
    ["transform-inline-environment-variables", {
      "include": [
        "NODE_ENV",
        "REDUX_LOGGER"
      ]
    }]
  ]
}
