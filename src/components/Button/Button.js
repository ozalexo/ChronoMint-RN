/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import Icon from '../Icon'
import PropTypes from 'prop-types'
import styles from './ButtonStyles'

const LeftSection = (props) => {
  const { icon, iconPosition } = props

  if (!icon) {
    return null
  }

  if (iconPosition && iconPosition !== 'left') {
    return null
  }

  return (
    <View style={styles.leftSection}>
      <Icon source={icon} />
    </View>
  )
}

LeftSection.propTypes = {
  icon: PropTypes.number,
  iconPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
}

const Label = (props) => {
  const { label, isDark } = props

  if (!label) {
    return null
  }

  return (
    <Text style={isDark ? styles.labelDark : styles.label}>
      {label}
    </Text>
  )
}
Label.propTypes = {
  label: PropTypes.string,
  isDark: PropTypes.bool
}

export default class Button extends React.Component {
  handlePress = (event) => {
    const { isDisabled, onPress } = this.props

    if (isDisabled) {
      return
    }

    onPress && onPress(event)
  }

  render () {
    const { style, icon, iconPosition, label, isDark, isDisabled } = this.props

    return (
      <TouchableOpacity
        style={[
          styles.container,
          (isDisabled && styles.containerDisabled),
          style
        ]}
        activeOpacity={isDisabled ? 1 : 0.2}
        onPress={this.handlePress}
      >
        <LeftSection icon={icon} iconPosition={iconPosition} />
        <Label label={label} isDark={isDark} />
      </TouchableOpacity>
    )
  }
}

Button.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.number,
  isDark: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handlePress: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  iconPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
}
