# Patching NPM packages after installation

Let's, for example, work with react-native-splash-screen@3.1.1
At the moment 26 Oct'18, it has [open issue 311](https://github.com/crazycodeboy/react-native-splash-screen/issues/311):
> Configuration 'compile' is obsolete and has been replaced with 'implementation' and 'api'

How to upgrade Gradle files: https://developer.android.com/studio/build/dependencies?utm_source=android-studio#dependency_configurations

## Preparations

1. Install [patch-package](https://github.com/ds300/patch-package#readme)
    ```bash
    yarn add -D patch-package postinstall-postinstall
    ```
2. Add the following line into 'scripts' section of the `package.json` file
    ```json
    "postinstall": "patch-package"
    ```
3. Project ready to create patches

## Make patch for `react-native-splash-screen` package

### Fix `react-native-splash-screen` build.gradle

1. Android Studio erros
    ![screenshot 2018-10-26 at 14 28 14](https://user-images.githubusercontent.com/661889/47563752-7e43e500-d92b-11e8-9bf9-6624b588e615.png)
    Double-click on each error will open appropriate file
2. Modify `node_modules/react-native-splash-screen/android/build.gradle`  
    Replace
    ```
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:26.1.0'
    compile "com.facebook.react:react-native:+" // From node_modules
    ```
    to  
    ```
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:26.1.0'
    implementation "com.facebook.react:react-native:+" // From node_modules
    ```
3. In Android Studio press `Sync Project with Gradle Files` button
    ![screenshot 2018-10-26 at 14 09 23](https://user-images.githubusercontent.com/661889/47564054-61f47800-d92c-11e8-96c0-fadc1d80bd75.png)
4. May get the following error
    ![screenshot 2018-10-26 at 14 36 53](https://user-images.githubusercontent.com/661889/47564174-c6afd280-d92c-11e8-8fc4-f0aa53bbeaa7.png)
5. Remove the line `buildToolsVersion "26.0.3"` as recommended
6. Press `Sync Project with Gradle Files` again and (probably) Android Studio will say:
    > Gradle sync failed: Already disposed: Module: 'react-native-splash-screen~1' (704 ms) 

    `Build -> Clean Project` will not help
7. Googling and get the answer: https://stackoverflow.com/a/50430517
    So, just delete the file `./android/.idea/modules.xml` and resync project.  
    Now it should be OK.

### Create patch for `react-native-splash-screen`

1. Run the command
    ```bash
    yarn patch-package react-native-splash-screen
    ```
2. Expected output
    ```
    ☑ Creating temporary folder
    ☑ Building clean node_modules with yarn
    ☑ Diffing your files with clean files
    ✔ Created file patches/react-native-splash-screen+3.1.1.patch
    ```
3. Now on each reinstall of node_modules the package react-native-splash-screen will be patched automatically.

    _Note:_ In case of react-native-splash-screen` version upgrade patch-package will warn you about it. 
