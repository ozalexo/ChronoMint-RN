#!/usr/bin/env bash
# Clear watchman watches
echo "Watchman cleanup:"
watchman watch-del-all

# Remove metro bundler's cache and temporary files
echo "Metro bundler cleanup:"
rm -rf /tmp/metro-bundler-cache-*
rm -rf /tmp/haste-map-react-native-packager-*

# Reset Metro Bundler cache and start bundler
echo "Start bundler (reset cache):"
yarn start --reset-cache
