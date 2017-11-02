/* @flow */
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { ImageBackground } from 'react-native'
import { Logo, Text, FetchingIndicator } from '@components'
import styles from './styles'

type Props = {
  children?: React.ReactNode,
  title?: string,
  subtitle?: string
}

export default class LoginScreenLayout extends React.Component<Props> {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'afsdad'
      }
    ]
  }
  static propTypes = {
    children: PropTypes.object,
    title: PropTypes.string,
    subtitle: PropTypes.string
  }
  
  render () {
    const { title, subtitle } = this.props
    return (
      <ImageBackground source={require('@images/gradient.png')} style={styles.container}>
        <Logo style={styles.logo} />
        { title && <Text style={styles.title}>{title}</Text> }
        { subtitle && <Text style={styles.subtitle}>{subtitle}</Text> }
        <View style={styles.contentArea} >
          { this.props.children }
        </View>
        <FetchingIndicator style={styles.fetchingIndicator} />
      </ImageBackground>
    )
  }
}
