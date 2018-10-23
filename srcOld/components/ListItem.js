/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */
import React from 'react'
import { View, TouchableOpacity, Switch, Text, StyleSheet } from 'react-native'
import Icon from './Icon'
import colors from '../utils/colors'

type Props = {
  icon?: number,
  value?: string,
  hasArrow?: boolean,
  switchOptions?: Object,
  title?: string,
  isDark?: boolean,
  onPress?: () => void
}

export default class ListItem extends React.Component<Props, {}> {
  renderLeft = () => {
    const { icon } = this.props

    if (this.props.isChecked) {
      return <Icon source={require('../images/check.png')} />
    }
    if (icon && icon.prototype && icon.prototype.isReactComponent) {
      return icon
    }
    if (icon) {
      return <Icon source={icon} />
    }
  }

  renderRight = () => {
    const { value, hasArrow, switchOptions } = this.props

    if (value) {
      return <Text>{value}</Text>
    }
    if (hasArrow) {
      return (
        <Icon
          source={require('../images/chevron-right.png')}
          style={styles.arrow}
        />
      )
    }
    if (typeof switchOptions === 'object') {
      return <Switch {...switchOptions} />
    }
  }

  render () {
    const { title, onPress, isDark } = this.props

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.leftSection}>{this.renderLeft()}</View>
        <Text style={isDark ? styles.textDark : styles.text}>{title}</Text>
        <View style={styles.rightSection} >{this.renderRight()}</View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftSection: {
    width: 24,
    marginHorizontal: 8
  },
  rightSection: {
    marginHorizontal: 8
  },
  arrow: {
    marginRight: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  text: {
    color: colors.foreground,
    flex: 1,
    textAlign: 'left'
  },
  textDark: {
    color: colors.backgroundLight,
    flex: 1,
    textAlign: 'left'
  }
})
