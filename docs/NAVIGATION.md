# App navigation

Navigation has been implemented via (React Navigation v2)[https://reactnavigation.org]

## Structure of App

Whole App divided to 'Wallet' and 'Login' parts.
Drawers must be ontop of all other screens.

* Login: Network selector drawer (left menu), Language selector drawer (right menu), screens 'before login'
    ```
    DrawerLanguage
      DrawerNetwork
        LoginStack
          LoginScreen1
          LoginScreen2
    ```
* Wallet: Main menu drawer (left menu), screens 'after login'
    ```
    DrawerMainMenu
      WalletStack
        WalletScreen1
        WalletScreen2
    ```
* RootNavigator: switch between Login and Wallet stacks

## File structure
* src/containers/Drawer* - containers of all drawers
* src/components/Drawer* - drawers itself
* src/navigation - all stacks and drawers (here we will add new screens)
* src/screens/Login/Start - very first screen of the App. Also contains unique buttons for header: Network and Language select. These buttons are not used anywhere else, that's why they are located here.

## Issues
* Need to fix distance between header and screen in Android
* Drawers are overlap device's status bar. Need to fix it.
