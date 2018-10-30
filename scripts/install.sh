#!/usr/bin/env bash

# Abort on error
set -e

# Stop cached listeners
echo $'Watchman: clean caches...'
watchman watch-del-all
echo ' '

# Remove metro bundler's cache and temporary files
echo $'Metro: remove bundler cache and temporary files...\n'
rm -rf /tmp/metro-bundler-cache-*
rm -rf /tmp/haste-map-react-native-packager-*

# Remove installed modules
echo $'Remove all node_modules folders...\n'
rm -rf ./node_modules

# Remove yarn meta files (optional)
for arg in "$@"
do
    if [ "$arg" == "--upgrade" ] || [ "$arg" == "-u" ]
    then
        echo $'Yarn: removing package-lock.json and yarn.lock ...\n'
        rm -f package-lock.json yarn.lock
    fi
done

# Install only fresh packages
echo $'Yarn: clean cache and install packages...'
yarn cache clean
yarn
