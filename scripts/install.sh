#!/usr/bin/env bash

# Abort on error
set -e

# Stop cached listeners
echo $'[Watchman] Clean caches...'
watchman watch-del-all
echo ' '

# Remove metro bundler's cache and temporary files
echo $'[Metro] Removing bundler cache and temporary files...\n'
rm -rf /tmp/metro-bundler-cache-*
rm -rf /tmp/haste-map-react-native-packager-*

# Remove packages/**/node_modules
echo $'[node_modules] Removing packages/**/node_modules...'
find ./packages -maxdepth 1 -name "node_modules" -type d -delete

# Remove installed modules
echo $'[node_modules] Removing node_modules folder...\n'
rm -rf ./node_modules

# Remove yarn meta files (optional)
for arg in "$@"
do
    if [ "$arg" == "--upgrade" ] || [ "$arg" == "-u" ]
    then
        echo $'[Yarn upgrade] Removing all package-lock.json, yarn.lock and yarn-error.log files...'
        find ./packages -maxdepth 1 -name "package-lock.json" -name "yarn.lock" -name "yarn-error.log" -type f -delete
        rm -f package-lock.json yarn.lock yarn-error.log
    fi
done

# Install only fresh packages
echo $'[Yarn] Clean cache and install packages...'
yarn cache clean
yarn
