#!/usr/bin/env bash

# Stop cached listeners
watchman watch-del-all

# Remove metro bundler's cache and temporary files
rm -rf /tmp/metro-bundler-cache-*
rm -rf /tmp/haste-map-react-native-packager-*

# Remove installed modules
rm -rf ./node_modules

# Remove yarn meta files (optional)
# rm -f ./yarn*

# Install only fresh packages
yarn cache clean
yarn
