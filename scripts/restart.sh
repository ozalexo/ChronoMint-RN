#!/usr/bin/env bash
# Clear watchman watches
watchman watch-del-all

# Remove metro bundler's cache and temporary files
rm -rf /tmp/metro-bundler-cache-*
rm -rf /tmp/haste-map-react-native-packager-*

# Reset Metro Bundler cache and start bundler
yarn start --reset-cache
