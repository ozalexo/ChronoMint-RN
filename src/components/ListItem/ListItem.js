/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import { View, TouchableOpacity, Switch, Text } from 'react-native'
import Icon from '../Icon'
import PropTypes from 'prop-types'
import styles from './ListItemStyles'
import { check, chevron_right } from '../../images'

class ListItem extends React.Component {
  renderLeft = () => {
    const { icon } = this.props

    if (this.props.isChecked) {
      return <Icon source={check} />
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
          source={chevron_right}
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

ListItem.propTypes = {
  icon: PropTypes.number,
  value: PropTypes.string,
  hasArrow: PropTypes.bool,
  title: PropTypes.string,
  isDark: PropTypes.bool,
  onPress: PropTypes.func,
}

export default ListItem
