# [StoryBook](https://github.com/storybooks/storybook)

## Integration (already done in this project)

1. Add new development dependency:
    ```bash
    yarn add -D @storybook/cli@4.0.0 @storybook/addon-info@4.0.0 
    ```
2. Initialize [StoryBook](https://github.com/storybooks/storybook)
    ```bash
    ./node_modules/.bin/sb init -f -p babel
    ```

## Launch

1. You will need two terminals
    * Terminal 1:
        ```bash
        yarn run storybook
        ```
    * Terminal 2 (or just lauch the App via XCode/Android Studio):
        ```bash
        react-native run-ios
        ```
        or/and
        ```bash
        react-native run-android
        ```
2. Open http://localhost:7007 or http://%PC_IP_ADDRESS%:7007 (in case if real device using). Should looks like this
    ![screenshot 2018-10-26 at 02 23 28](https://user-images.githubusercontent.com/661889/47535871-2626c780-d8c6-11e8-8082-04cbcc917068.png)

## Navigation

1. Launch StoryBook and open the following URL in browser: http://localhost:7007
2. Select a story in browser and it will be displayed on emulator or real device

## Solved issues

1. StoryBook build errors
2. StoryBook migration to v4.0.0
3. StoryBook: run with real device

## Useful links
* https://github.com/storybooks/storybook/blob/master/MIGRATION.md
* https://medium.com/@agent_hunt/storybook-setup-for-desiloed-development-with-react-native-ios-android-web-85b6d64fb1b4
* https://github.com/storybooks/storybook/blob/master/addons/info/README.md
* https://medium.com/storybookjs/announcing-storybook-3-4-db4d1341dedd
* https://github.com/storybooks/storybook/tree/master/addons/options
* https://medium.com/sears-israel/story-hierarchy-in-storybook-3-2-7506b5a6ceb9
* https://storybook.js.org/basics/guide-react-native/
* https://storybook.js.org/basics/slow-start-guide/
