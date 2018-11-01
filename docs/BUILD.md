# Project build history

<!--ts-->
* [MacOS](#macos)
    * [Requirements](#requirements)
    * [Initial steps (install and project init)](#initial-steps-install-and-project-init)
    * [Test build](#test-build)
        * [iOS test build](#ios-test-build)
        * [Android test build](#android-test-build)
        * [Launch App in XCode](#launch-app-in-xcode)
        * [Launch App in Android Studio and solve some issues](#launch-app-in-android-studio-and-solve-some-issues)
    * [Install and configure <a href="https://babeljs.io/" rel="nofollow">Babel 7.x</a>](#install-and-configure-babel-7x)
    * [Intergating <a href="https://github.com/storybooks/storybook">StoryBook</a>](#intergating-storybook)
    * [Solved/Not solved issues](#solvednot-solved-issues)
* [Information to check periodically](#information-to-check-periodically)
<!--te-->

## MacOS

### Requirements

| Software                                                | Minimal version |
| ------------------------------------------------------- | ---------------:|
| [XCode](https://developer.apple.com/xcode/)             | 10.0            |
| [Android Studio](https://developer.android.com/studio/) | 3.2.1           |
| [Node.JS](https://nodejs.org/)                          | v10.12.0        |
| [Yarn](https://yarnpkg.com)                             | 1.10.1          |
| [React Native](https://facebook.github.io/react-native) | 0.57.4          |

NPM global packages

* To be able to use command `react-native run-ios` with real device NPM package `ios-deploy` must be installed globally
    ```
    yarn global add ios-deploy
    ```


Recommended software:
* [iTerm2](https://www.iterm2.com/) (better than default Terminal)
* [GitKraken](https://www.gitkraken.com/) (sometimes it is useful)
* [VSCode](https://code.visualstudio.com) (text editor)
* [WebStorm](https://www.jetbrains.com/webstorm/) (IDE) Not free, by the way. 

### Initial steps (install and project init)

1. Install [Homebrew](https://brew.sh/ "Homebrew's Homepage")
    ```bash
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```
2. Install [Node.JS](https://nodejs.org/) and [watchman](https://facebook.github.io/watchman/)
    ```bash
    brew install node watchman
    ```
3. Install [Yarn](https://yarnpkg.com)
    ```bash
    brew install yarn --without-node
    ```
4. Configure PATH env. variable for Yarn. Append the following line to the `~/.bash_profile`
    ```bash
    echo 'export PATH="$HOME/.config/yarn/global/node_modules/.bin:$PATH"' >> ~/.bash_profile
    source ~/.bash_profile # to reflect changes immediately
    ```
5. Install [react-native-cli](https://www.npmjs.com/package/react-native-cli)
    ```bash
    yarn global add react-native-cli
    ```
6. Create new project
    ```bash
    react-native init ChronoMint
    ```
7. "Solve" one of [known issues](https://github.com/react-native-community/react-native-releases/blob/master/CHANGELOG.md#known-issues) (using XCode 10 and `react-native init`)
    ```bash
    ROOT_PWD=$(pwd)
    cd ./node_modules/react-native
    ./scripts/ios-install-third-party.sh
    cd ./third-party/glog-0.3.5/
    ../../scripts/ios-configure-glog.sh
    cd $ROOT_PWD
    ```
    Note: this operation is automated by postinstall command in package.json and ./scripts/postinstall.sh

### Test build

#### iOS test build
1. Open iOS simulator (usually they may be lauched via XCode)
2. Open new terminal and run metro bundler
    ```bash
    cd ./ChronoMint
    yarn start
    ```
3. Open another terminal and run
    ```bash
    react-native run-ios
    ```
4. Build may be succeeded but will not launch at very first time with the following error:
    ```
    ** BUILD SUCCEEDED **

    An error was encountered processing the command (domain=IXUserPresentableErrorDomain, code=1):
    This app could not be installed at this time.
    Failed to load Info.plist from bundle at path
    ```
    In this case just run `react-native run-ios` once again

#### Android test build
1. Open Android simulator (usually they may be lauched via Amdroid Studio)
2. Open new terminal and run metro bundler
    ```bash
    cd ./ChronoMint
    yarn start
    ```
3. Open another new terminal and run
    ```bash
    react-native run-android
    ```
4. Android app should be lanched with no issues (or I missed something)

#### Launch App in XCode

1. Open project in XCode by path `path/to/ChronoMint/ios`
2. Select 'Project navigator', tab 'General', target 'ChronoMint' and set appropriate 'Team' in 'Signing' partition ('Automatically manage signing' checkbox must be checked)
    ![screenshot 2018-10-26 at 00 25 50](https://user-images.githubusercontent.com/661889/47531384-26b76200-d8b6-11e8-9a82-778283d54980.png)
3. Select target 'ChronoMintTests' and set the same 'Team' ('Automatically manage signing' checkbox must be checked)
4. Replace 'Bundle identifier' to `io.chronobank.chronomintapp`
    ![screenshot 2018-10-26 at 00 22 37](https://user-images.githubusercontent.com/661889/47531174-7cd7d580-d8b5-11e8-893f-be7677bf3f1d.png)
5. Select device (simulator should be available) and run App

#### Launch App in Android Studio and solve some issues

1. Open project in Android Studio by path `path/to/ChronoMint/android`
2. Android Studio will suggest to upgrade Android Gradle Plugin. Press `Upgrade`
![screenshot 2018-10-26 at 00 39 10](https://user-images.githubusercontent.com/661889/47531927-937f2c00-d8b7-11e8-91fe-526537bc7084.png)
3. During syncing project Studio will request to upgrade Build Tools. Press `Upgrade Build Tools version`
![screenshot 2018-10-26 at 00 41 40](https://user-images.githubusercontent.com/661889/47532026-ee188800-d8b7-11e8-9dcb-f24498469046.png)
4. Run App and select device (simulator should be available)

### Install and configure [Babel 7.x](https://babeljs.io/)
1. Install the following packages (list of packages based on previous experience and attempts to build project in different conditions)
    ```bash
    yarn add -D @babel/core @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/plugin-proposal-export-default-from @babel/plugin-proposal-export-namespace-from @babel/plugin-proposal-object-rest-spread @babel/plugin-proposal-optional-chaining @babel/plugin-proposal-throw-expressions @babel/plugin-syntax-class-properties @babel/plugin-syntax-nullish-coalescing-operator @babel/plugin-transform-computed-properties @babel/plugin-transform-destructuring @babel/plugin-transform-exponentiation-operator @babel/plugin-transform-new-target @babel/plugin-transform-react-constant-elements @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react @babel/register babel-eslint babel-plugin-functional-hmr
    ```
2. Rename Babel's config file from `.babelrc` to `babel.config.js`. Babel 7 has new relationship with config files, see https://babeljs.io/docs/en/configuration
3. Put the following content into `babel.config.js`
    ```javascript
    module.exports = function (api) {
        api.cache(true)
        const presets = ['module:metro-react-native-babel-preset']
        const plugins = [
            '@babel/plugin-transform-flow-strip-types',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-regenerator',
            '@babel/plugin-transform-async-to-generator',
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-syntax-nullish-coalescing-operator',
            '@babel/plugin-transform-exponentiation-operator'
        ]

        return {
            presets,
            plugins,
            sourceMaps: true
        }
    }
    ```

### Intergating [StoryBook](https://github.com/storybooks/storybook)

See [STORYBOOK.md](./STORYBOOK.md)

### SplashScreen

* https://medium.com/handlebar-labs/how-to-add-a-splash-screen-to-a-react-native-app-ios-and-android-30a3cec835ae
* https://github.com/crazycodeboy/react-native-splash-screen
* For Android we need to modify third-party react-native-* packages according to [](https://developer.android.com/studio/build/dependencies?utm_source=android-studio#dependency_configurations)
* Please find details [here](./PATCHPACKAGE.md)


### Solved/Not solved issues
- [x] iOS: [XCode 10 and third-party dependencies](https://github.com/react-native-community/react-native-releases/blob/master/CHANGELOG.md#known-issues)
- [x] iOS: "Failed to load Info.plist from bundle at path" during install on a device/simulator (after very first build)  
    Solution: run `react-native run-ios` again
- [x] StoryBook launch issue
    ```
    ERROR in ./storybook/addons.js
    Module build failed: Error: Couldn't find preset "module:metro-react-native-babel-preset"
    ```
    Solution: correct Babel's plugins and configuration
- [x] Can't find variable require
    ![screenshot 2018-10-26 at 01 45 37](https://user-images.githubusercontent.com/661889/47534744-35574680-d8c1-11e8-8b72-6c83b23654d9.png)
    Solved by reconfigure Babel and add `--reset-cache` option to Storybook's launch command.  
    Also see https://github.com/facebook/react-native/issues/21048
- [x] XCode build error
    ![screenshot 2018-10-26 at 02 13 38](https://user-images.githubusercontent.com/661889/47535632-08a52e00-d8c5-11e8-8f18-fea7ecab5087.png)
    Solved with:
    * File -> Project Settings... -> Advanced
    * Switch 'Build location' to 'Custom'
    * Replace paths to 'build/*'  
    ![screenshot 2018-10-26 at 02 28 37](https://user-images.githubusercontent.com/661889/47536037-de547000-d8c6-11e8-86c2-421bfa389f3f.png)
    * Cleanup build folder via XCode and rebuild/reinstall project

- [ ] Provisioning profile for bundle identifier `io.chronobank.chronomintapp.dev` is expired

## Android device additional info

May require additional configuration on real device:
* Run app in debug mode (read screen with error will appear).
* Open developer menu and select "Dev Settings"
* Find "Debugging/Debug server host & port for device" in the list of options
* Enter your host IP and bundler's port. For example: "192.168.1.1:8081" (no http prefix required)

## Information to check periodically

* [React Native's changelog](https://github.com/react-native-community/react-native-releases/blob/master/CHANGELOG.md)
* [Yarn's stable version](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
