module.exports = {
    "parser": "babel-eslint",
    "extends": [
      "standard",
      "prettier",
      "prettier/react",
      "plugin:react/recommended",
      "plugin:import/errors",
      "plugin:import/warnings"
    ],
    "settings": {
      "react": {
        "createClass": "createReactClass",
        "pragma": "React",
        "version": "16.4.1",
      },
      "propWrapperFunctions": [ "forbidExtraProps" ]
    },
    "plugins": [
      "prettier",
      "react",
      "import"
    ],
    "rules": {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
    }
  }
