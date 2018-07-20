/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

import React, { PureComponent, Component } from 'react'

import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import I18n from 'react-native-i18n'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import TextButton from '../components/TextButton'
import styles from './styles/SetAccountPasswordStyles'

export type TSetAccountPasswordProps = {
  isCreatingNewWallet?: boolean,
  onChangePassword: (password: string) => void,
  onChangePasswordConfirmation: (passwordConfirmation: string) => void,
  onDone: () => void,
  onSelectLanguage: () => void,
  onSelectNetwork: () => void,
  onUseWallet: () => void,
  navigation: any
}

type THeaderProps = {
  onSelectLanguage: () => void,
  onSelectNetwork: () => void,
}

// class LeftNB extends PureComponent<{}> {
//   render () {
//     return (
//       <TouchableOpacity
//         onPress={() => {}}
//         style={styles.topBarButton}
//       >
//         <Image
//           source={require('../images/ios-gear-outline.png')}
//           style={styles.topBarButtonImage}
//         />
//         <Text style={styles.topBarButtonLabel}>
//           {'Production'}
//         </Text>
//       </TouchableOpacity>
//     )
//   }
// }

// class RightNB extends PureComponent<{}> {
//   render () {
//     return (
//       <TouchableOpacity
//         onPress={() => {}}
//         style={styles.topBarButton}
//       >
//         <Text style={styles.topBarButtonLabel}>
//           {'EN-US'}
//         </Text>
//       </TouchableOpacity>
//     )
//   }
// }

// class LeftNB extends PureComponent<{}> {
//   render () {
//     return (
//       <Text>{'LEFT'}</Text>
//     )
//   }
// }

// class RightNB extends PureComponent<{}> {
//   render () {
//     return (
//       <Text>{'RIGHT'}</Text>
//     )
//   }
// }

export class HL extends PureComponent<{}> {
  render () {
    return (
      <TouchableOpacity
        onPress={() => { console.log('>>> TAP PROD 1') }}
        style={styles.topBarButton}
      >
        <Image
          source={require('../images/ios-gear-outline.png')}
          style={styles.topBarButtonImage}
        />
        <Text style={[styles.topBarButtonLabel, {color: 'yellow'}]}>
          Production
        </Text>
      </TouchableOpacity>
    )
  }
}

export default class SetAccountPassword extends Component<TSetAccountPasswordProps, {}> {
    static navigationOptions = {
      title: 'Screen4',
      headerTransparent: true
    }
  // static navigationOptions = {
  //   // console.log('SetAccountPassword!!!!!!!!!!!!!GETTING: ', navigation, navigationOptions)
  //   // return {
  //     // ...navigationOp÷tions,
  //     headerLeft: <HL />,
  //     headerTitle: <Text style={{color: 'red'}}>TEdtHeader</Text>,
  //     headerTransparent: true
  //   // }
  // }

  render () {
    const {
      isCreatingNewWallet,
      onChangePassword,
      onChangePasswordConfirmation,
      onDone,
      onSelectLanguage,
      onSelectNetwork,
      onUseWallet
    } = this.props

    return (
      <View>
        <StatusBar barStyle='light-content' />
        { false && (
          <Header
            onSelectLanguage={onSelectLanguage}
            onSelectNetwork={onSelectNetwork}
          />
        ) }
        <Input
          autoCorrect={false}
          onChangeText={onChangePassword}
          placeholder={I18n.t('SetAccountPassword.password')}
          secureTextEntry
          style={styles.input}
        />
        <Input
          autoCorrect={false}
          onChangeText={onChangePasswordConfirmation}
          placeholder={I18n.t('SetAccountPassword.confirmPassword')}
          secureTextEntry
          style={styles.input}
        />
        { isCreatingNewWallet ? (
          <View>
            <PrimaryButton
              label={I18n.t('SetAccountPassword.createWallet').toUpperCase()}
              onPress={onDone}
            />
            <Text style={styles.or}>
              {I18n.t('SetAccountPassword.or')}
            </Text>
            <TextButton
              label={I18n.t('SetAccountPassword.useExistingWallet')}
              onPress={onUseWallet}
            />
          </View>
        ) : (
          <PrimaryButton
            label='Set password'
            onPress={onDone}
          />
        ) }
        <Text style={styles.copyright}>
          {I18n.t('SetAccountPassword.copyright')}
        </Text>
      </View>
    )
  }
}

class Header extends PureComponent<THeaderProps, {}> {
  render () {
    const {
      onSelectLanguage,
      onSelectNetwork
    } = this.props

    return (
      <View>
        <View style={styles.topBarActions}>
          <TouchableOpacity
            onPress={() => { console.log('>>> TAP PROD'); onSelectNetwork() }}
            style={styles.topBarButton}
          >
            <Image
              source={require('../images/ios-gear-outline.png')}
              style={styles.topBarButtonImage}
            />
            <Text style={styles.topBarButtonLabel}>
              Production
            </Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
          <TouchableOpacity
            onPress={() => { console.log('>>> TAP LANG'); onSelectLanguage() }}
            style={styles.topBarButton}
          >
            <Text style={styles.topBarButtonLabel}>
              EN-US
            </Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../images/ChronoWalletIcon.png')}
          style={styles.logo}
        />
        <Image
          source={require('../images/ChronoWalletText.png')}
          style={styles.logoText}
        />
      </View>
    )
  }
}
