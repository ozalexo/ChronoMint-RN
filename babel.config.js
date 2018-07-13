module.exports = {
  presets: [
    "@babel/env",
    "@babel/preset-react",
    "@babel/flow"
  ],
  env: {
    test: {
      presets: [
        [
          "@babel/env",
          { modules: false }
        ],
        "@babel/preset-react",
        "@babel/flow"
      ],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-transform-modules-commonjs"
      ],
    },
  },
  babelrcRoots: "packages/**",
  sourceMaps: true,
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: "@babel/runtime",
      },
    ],
    "@babel/plugin-transform-flow-strip-types",
    [
      "@babel/plugin-proposal-decorators",
      { legacy: true }
    ],
    "@babel/plugin-proposal-class-properties",
    "functional-hmr",
    "transform-new-target",
    "transform-exponentiation-operator",
    "@babel/plugin-syntax-nullish-coalescing-operator",
    [
      "babel-plugin-transform-builtin-extend",
      {
        globals: ["Error", "Array"]
      }
    ],
    [
      "transform-inline-environment-variables",
      {
        include: ["NODE_ENV", "REDUX_LOGGER"]
      }
    ],
  ],
}
