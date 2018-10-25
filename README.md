# Mobile app for ChronoBank

## Run project

```
yarnb
yarn start
```

* iOS device:
    ```
    react-native run-ios
    ```
* Android device:
    ```
    react-native run-android
    ```

Or you may start app by using your IDE (XCode or Android Studio).

## Run StoryBook

You'll need three terminals:
1. Start bundler:
    ```
    yarn start
    ```
2. Start storybook:
    ```
    yarn run storybook
    ```
3. Run app (see above)

## Developer notes

1. Android emulator/device required additional configuration:
    * Run app in debug mode (read screen with error will appear).
    * Open developer menu and select "Dev Settings"
    * Find "Debugging/Debug server host & port for device" in the list of options
    * Enter your host IP and bundler's port. For example: "192.168.1.1:8081" (no http prefix required)
